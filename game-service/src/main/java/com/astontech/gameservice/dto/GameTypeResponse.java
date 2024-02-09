package com.astontech.gameservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GameTypeResponse {
    Integer id;
    String name;
}
