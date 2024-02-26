package com.astontech.userservice.controllers;

import com.astontech.userservice.dto.JwtAuthenticationResponse;
import com.astontech.userservice.dto.UserRequest;
import com.astontech.userservice.services.AuthenticationService;
import com.astontech.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(authenticationService.signup(userRequest), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(authenticationService.login(userRequest), HttpStatus.OK);
    }
}
