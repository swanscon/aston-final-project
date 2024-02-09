package com.astontech.gameservice.controllers;

import com.astontech.gameservice.dto.GameRequest;
import com.astontech.gameservice.dto.GameResponse;
import com.astontech.gameservice.services.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/game")
public class GameController {

    private final GameService gameService;

    @PostMapping
    public ResponseEntity<String> createGame(@RequestBody GameRequest gameRequest) {
        gameService.createGame(gameRequest);
        return new ResponseEntity<>("Game created successfully", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GameResponse>> getAllGames() {
        return new ResponseEntity<>(gameService.getAllGames(), HttpStatus.OK);
    }

    @GetMapping("/type/{gameTypeName}")
    public ResponseEntity<List<GameResponse>> getGamesByGameType(@PathVariable String gameTypeName) {
        return new ResponseEntity<>(gameService.getAllGamesByGameTypeName(gameTypeName), HttpStatus.OK);
    }

    @PutMapping("/{gameId}")
    public ResponseEntity<String> updateGame(@PathVariable Integer gameId, @RequestBody GameRequest gameRequest) {
        gameService.updateGame(gameId, gameRequest);
        return new ResponseEntity<>("Game updated successfully", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<String> deleteGame(@PathVariable Integer gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity<>("Game deleted successfully", HttpStatus.OK);
    }

}
