package com.astontech.gameservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GameResponse {
    private Integer id;
    private String name;
    private String image;
    private String description;
    private GameTypeResponse gameType;
}
