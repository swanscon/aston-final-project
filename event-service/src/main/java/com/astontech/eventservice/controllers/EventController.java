package com.astontech.eventservice.controllers;

import com.astontech.eventservice.dto.EventAttendeeResponse;
import com.astontech.eventservice.dto.EventRequest;
import com.astontech.eventservice.dto.EventResponse;
import com.astontech.eventservice.models.Event;
import com.astontech.eventservice.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@RequestBody EventRequest eventRequest) {
        EventResponse eventResponse = eventService.createEvent(eventRequest);
        return new ResponseEntity<>(eventResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Integer id) {
        return new ResponseEntity<>(eventService.getEventById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
    public ResponseEntity<String> updateEvent(@PathVariable Integer id, @RequestBody EventRequest eventRequest) {
        eventService.updateEvent(id, eventRequest);
        return new ResponseEntity<>("Event updated successfully.", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
    public ResponseEntity<String> deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
        return new ResponseEntity<>("Event deleted successfully.", HttpStatus.OK);
    }

}
