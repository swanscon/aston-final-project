package com.astontech.userservice.controllers;

import com.astontech.userservice.dto.JwtAuthenticationResponse;
import com.astontech.userservice.dto.UserRequest;
import com.astontech.userservice.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(authenticationService.signup(userRequest), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(authenticationService.login(userRequest), HttpStatus.OK);
    }
}
