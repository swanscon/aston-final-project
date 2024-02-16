package com.astontech.eventservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.time.LocalTime;


@Entity
@Table(name = "event")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer gameId;
    private String name;
    private Date eventDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;
}
