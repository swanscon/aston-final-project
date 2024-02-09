package com.astontech.gameservice.repositories;

import com.astontech.gameservice.models.GameType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameTypeRepository extends JpaRepository<GameType, Integer> {

    GameType findByName(String gameTypeName);
}
