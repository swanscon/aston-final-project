package com.astontech.userservice.controllers;

import com.astontech.userservice.dto.UserEventRequest;
import com.astontech.userservice.dto.UserEventResponse;
import com.astontech.userservice.services.UserEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user/event")
public class UserEventController {

    private final UserEventService userEventService;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createUserEvent(@RequestBody UserEventRequest userEventRequest) {
        userEventService.createUserEvent(userEventRequest);
        return new ResponseEntity<>("User Event created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<UserEventResponse>> getEventIdsByUserId(@PathVariable Integer userId) {
        return new ResponseEntity<>(userEventService.getEventIdsByUserId(userId), HttpStatus.OK);
    }

    @DeleteMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> deleteUserEvent(@RequestBody UserEventRequest userEventRequest) {
        userEventService.deleteUserEvent(userEventRequest);
        return new ResponseEntity<>("User Event deleted successfully", HttpStatus.OK);
    }
}
