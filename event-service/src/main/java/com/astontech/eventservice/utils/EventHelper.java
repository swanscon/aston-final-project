package com.astontech.eventservice.utils;

import com.astontech.eventservice.dto.EventAttendeeResponse;
import com.astontech.eventservice.dto.EventRequest;
import com.astontech.eventservice.dto.EventResponse;
import com.astontech.eventservice.models.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventHelper {

    public Event mapToEvent(EventRequest eventRequest) {
        return Event.builder()
                .gameId(eventRequest.getGameId())
                .name(eventRequest.getName())
                .eventDate(eventRequest.getEventDate())
                .duration(eventRequest.getDuration())
                .description(eventRequest.getDescription())
                .build();
    }

    public String eventToString(Event event) {
        return "ID [" + event.getId() + "] - NAME [" + event.getName() + "] - DATE ["
                + event.getEventDate() + "] - DURATION [" + event.getDuration() + "] --- ["
                + event.getDescription() + "]";
    }

    public EventResponse mapToEventResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .gameId(event.getGameId())
                .name(event.getName())
                .eventDate(event.getEventDate())
                .duration(event.getDuration())
                .description(event.getDescription())
                .build();
    }

    public EventAttendeeResponse mapToEventAttendeeResponse(Event event) {
        return EventAttendeeResponse.builder()
                .id(event.getId())
                .gameId(event.getGameId())
                .name(event.getName())
                .eventDate(event.getEventDate())
                .duration(event.getDuration())
                .description(event.getDescription())
                .build();
    }
}
