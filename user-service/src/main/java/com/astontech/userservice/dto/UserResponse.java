package com.astontech.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserResponse {
    private Integer id;
    private String username;
    private Boolean admin;
    private List<Integer> eventList;
}
