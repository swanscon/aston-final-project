package com.astontech.userservice.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NewUserRequest {
    private String username;
    private String password;
}
