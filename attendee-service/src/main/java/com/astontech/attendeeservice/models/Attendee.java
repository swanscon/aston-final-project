package com.astontech.attendeeservice.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attendee")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer eventId;
    private String firstName;
    private String lastName;
    private String status;
}
