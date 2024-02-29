package com.astontech.gameservice.controllers;

import com.astontech.gameservice.dto.GameTypeRequest;
import com.astontech.gameservice.dto.GameTypeResponse;
import com.astontech.gameservice.services.GameTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game/type")
public class GameTypeController {

    private final GameTypeService gameTypeService;

    @PostMapping
    public ResponseEntity<String> createGameType(@RequestBody GameTypeRequest gameTypeRequest) {
        gameTypeService.createGameType(gameTypeRequest);
        return new ResponseEntity<>("Game Type created successfully", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GameTypeResponse>> getAllGameTypes() {
        return new ResponseEntity<>(gameTypeService.getAllGameTypes(), HttpStatus.OK);
    }

    @GetMapping("/{gameTypeId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
    public ResponseEntity<GameTypeResponse> getGameTypeById(@PathVariable Integer gameTypeId) {
        return new ResponseEntity<>(gameTypeService.getGameTypeById(gameTypeId), HttpStatus.OK);
    }

    @PutMapping("/{gameTypeId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
    public ResponseEntity<String> updateGameType(@PathVariable Integer gameTypeId, @RequestBody GameTypeRequest gameTypeRequest) {
        gameTypeService.updateGameType(gameTypeId, gameTypeRequest);
        return new ResponseEntity<>("Game Type updated successfully", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{gameTypeId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
    public ResponseEntity<String> deleteGameType(@PathVariable Integer gameTypeId) {
        gameTypeService.deleteGameType(gameTypeId);
        return new ResponseEntity<>("Game Type deleted successfully", HttpStatus.OK);
    }
}
