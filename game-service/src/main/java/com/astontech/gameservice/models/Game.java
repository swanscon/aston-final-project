package com.astontech.gameservice.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "game")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String image;
    private String description;
    @ManyToOne(cascade = CascadeType.DETACH)
    private GameType gameType;

}
