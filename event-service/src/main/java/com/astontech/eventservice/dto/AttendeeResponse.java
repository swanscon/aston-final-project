package com.astontech.eventservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AttendeeResponse {
    private Integer id;
    private Integer eventId;
    private String firstName;
    private String lastName;
    private String status;
}
