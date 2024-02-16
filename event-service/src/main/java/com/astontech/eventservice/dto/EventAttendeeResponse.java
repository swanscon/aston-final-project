package com.astontech.eventservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EventAttendeeResponse {
    private Integer id;
    private Integer gameId;
    private String name;
    private Date eventDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;
    private List<AttendeeResponse> attendees;
}
