package com.astontech.gameservice.repositories;

import com.astontech.gameservice.models.Game;
import com.astontech.gameservice.models.GameType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {

    List<Game> findByGameType(GameType gameType);
}
