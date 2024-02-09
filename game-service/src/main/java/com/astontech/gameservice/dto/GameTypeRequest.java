package com.astontech.gameservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GameTypeRequest {
    Integer id;
    String name;
}
