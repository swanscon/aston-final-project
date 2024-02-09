package com.astontech.eventservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EventRequest {
    private Integer gameId;
    private String name;
    private Date eventDate;
    private String duration;
    private String description;
}
