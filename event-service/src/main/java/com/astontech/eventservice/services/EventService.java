package com.astontech.eventservice.services;

import com.astontech.eventservice.dto.AttendeeResponse;
import com.astontech.eventservice.dto.EventAttendeeResponse;
import com.astontech.eventservice.dto.EventRequest;
import com.astontech.eventservice.dto.EventResponse;
import com.astontech.eventservice.models.Event;
import com.astontech.eventservice.repositories.EventRepository;
import com.astontech.eventservice.utils.EventHelper;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final EventHelper eventHelper;
    private final WebClient.Builder webClientBuilder;

    //region CREATE
    public EventResponse createEvent(EventRequest eventRequest) {
        Event event = eventHelper.mapToEvent(eventRequest);
        Event savedEvent = eventRepository.save(event);
        log.info("Event [" + event.getId() + "] saved successfully");
        return eventHelper.mapToEventResponse(savedEvent);
    }
    //endregion

    //region READ
    public List<EventResponse> getAllEvents() {
        List<Event> eventList = eventRepository.findAll();
        List<EventResponse> eventResponseList = new ArrayList<>();
        if(!eventList.isEmpty()) {
            for(Event event : eventList) {
                eventResponseList.add(eventHelper.mapToEventResponse(event));
                log.info(eventHelper.eventToString(event));
            }
        } else {
            log.info("There are currently no Event records");
        }
        return eventResponseList;
    }

    public EventResponse getEventById(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("No event found with id: " + eventId));
        return eventHelper.mapToEventResponse(event);
    }

    @CircuitBreaker(name = "attendees", fallbackMethod = "fallbackAttendees")
    private Mono<List<AttendeeResponse>> retrieveAttendeesForEvent(Integer eventId) {
        return webClientBuilder.build()
                .get()
                .uri("http://attendee-service/api/attendee/event/{eventId}", eventId)
                .retrieve()
                .bodyToFlux(AttendeeResponse.class)
                .collectList();
    }
    //endregion

    //region UPDATE
    public void updateEvent(Integer eventId, EventRequest eventRequest) {
        Event eventToUpdate = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found."));
        eventToUpdate.setGameId(eventRequest.getGameId());
        eventToUpdate.setName(eventRequest.getName());
        eventToUpdate.setEventDate(eventRequest.getEventDate());
        eventToUpdate.setStartTime(eventRequest.getStartTime());
        eventToUpdate.setEndTime(eventRequest.getEndTime());
        eventToUpdate.setDescription(eventRequest.getDescription());
        eventRepository.save(eventToUpdate);
        log.info("Event [" + eventToUpdate.getId() + "] updated successfully");
    }
    //endregion

    //region DELETE
    public void deleteEvent(Integer eventId) {
        Event eventToDelete = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found."));
        eventRepository.delete(eventToDelete);
        log.info("Event [" + eventToDelete.getId() + "] deleted successfully");
    }
    //endregion

    private Mono<List<AttendeeResponse>> fallbackAttendees(Integer eventId, Throwable t) {
        log.error("Error retrieving attendees for event Id [" + eventId + "] : " + t.getMessage());
        return Mono.just(new ArrayList<>());
    }
}
