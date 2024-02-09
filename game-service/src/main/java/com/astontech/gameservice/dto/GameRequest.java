package com.astontech.gameservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GameRequest {
    private String name;
    private String image;
    private String description;
    private GameTypeRequest gameTypeRequest;
}
