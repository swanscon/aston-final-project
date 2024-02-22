package com.astontech.userservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    @Builder.Default
    private Boolean admin = false;
    @ElementCollection
    @Builder.Default
    private List<Integer> eventList = new ArrayList<>();
}
