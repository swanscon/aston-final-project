package com.astontech.attendeeservice.controllers;

import com.astontech.attendeeservice.dto.AttendeeRequest;
import com.astontech.attendeeservice.dto.AttendeeResponse;
import com.astontech.attendeeservice.services.AttendeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendee")
public class AttendeeController {

    private final AttendeeService attendeeService;

    @PostMapping
    public ResponseEntity<String> createAttendee(@RequestBody AttendeeRequest attendeeRequest) {
        attendeeService.createAttendee(attendeeRequest);
        return new ResponseEntity<>("Attendee created successfully.", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AttendeeResponse>> getAllAttendees() {
        return new ResponseEntity<>(attendeeService.getAllAttendees(), HttpStatus.OK);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<AttendeeResponse>> getAllAttendeesByEventId(@PathVariable Integer eventId) {
        return new ResponseEntity<>(attendeeService.getAllAttendeesByEventId(eventId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendeeResponse> getAttendeeById(@PathVariable Integer id) {
        return new ResponseEntity<>(attendeeService.getAttendeeById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateAttendee(@PathVariable Integer id, @RequestBody AttendeeRequest attendeeRequest) {
        attendeeService.updateAttendee(id, attendeeRequest);
        return new ResponseEntity<>("Attendee updated successfully.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}/{status}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateAttendeeStatus(@PathVariable Integer id, @PathVariable String status) {
        attendeeService.updateAttendeeStatus(id, status);
        return new ResponseEntity<>("Attendee status updated successfully.", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> deleteAttendee(@PathVariable Integer id) {
        attendeeService.deleteAttendee(id);
        return new ResponseEntity<>("Attendee deleted successfully.", HttpStatus.OK);
    }
}