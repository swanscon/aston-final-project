package com.astontech.userservice.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/test")
public class TestController {

    @GetMapping("/guest")
    public String guestEndPoint() {
        return "Everyone can see this";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String userEndPoint() {
        return "Only USERS can see this";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminEndPoint() {
        return "Only ADMINS can see this";
    }
}
