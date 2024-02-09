package com.astontech.gameservice.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "game_type")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GameType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
}
