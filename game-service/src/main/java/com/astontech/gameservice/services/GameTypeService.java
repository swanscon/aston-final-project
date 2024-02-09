package com.astontech.gameservice.services;

import com.astontech.gameservice.dto.GameTypeRequest;
import com.astontech.gameservice.dto.GameTypeResponse;
import com.astontech.gameservice.exceptions.ForeignKeyRestraintException;
import com.astontech.gameservice.models.GameType;
import com.astontech.gameservice.repositories.GameTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameTypeService {

    private final GameTypeRepository gameTypeRepository;

    //region CREATE
    public void createGameType(GameTypeRequest gameTypeRequest) {
        GameType gameType = mapToGameType(gameTypeRequest);
        gameTypeRepository.save(gameType);
        log.info("GameType added: [" + gameType.getId() + "] - " + gameType.getName());
    }
    //endregion

    //region READ
    public List<GameTypeResponse> getAllGameTypes() {
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        List<GameTypeResponse> gameTypeResponseList = new ArrayList<>();
        if(!gameTypeList.isEmpty()) {
            for(GameType gameType: gameTypeList) {
                GameTypeResponse gameTypeResponse = mapToGameTypeResponse(gameType);
                gameTypeResponseList.add(gameTypeResponse);
                log.info("Game Type: ["+ gameTypeResponse.getId() +"] " +gameTypeResponse.getName());
            }
        } else {
            log.info("No game types found");
        }
        return gameTypeResponseList;
    }
    //endregion

    //region UPDATE
    public void updateGameType(Integer gameTypeId, GameTypeRequest gameTypeRequest) {
        GameType gameType = gameTypeRepository.findById(gameTypeId)
                .orElseThrow(() -> new EntityNotFoundException("No Game Type found"));
        gameType.setName(gameTypeRequest.getName());
        gameTypeRepository.save(gameType);
        log.info("Game Type updated: [" + gameTypeId + "]");

    }
    //endregion

    //region DELETE
    public void deleteGameType(Integer gameTypeId) {
        GameType gameType = gameTypeRepository.findById(gameTypeId)
                .orElseThrow(() -> new EntityNotFoundException("GameType not found with ID: [" + gameTypeId + "]"));
        try {
            gameTypeRepository.delete(gameType);
        } catch (DataIntegrityViolationException e) {
            throw new ForeignKeyRestraintException("This GameType cannot be deleted because it is referenced by a Game entity.");
        }
        log.info("GameType deleted: [" + gameTypeId + "]");
    }
    //endregion

    //region CUSTOM METHODS
    public GameType mapToGameType(GameTypeRequest gameTypeRequest) {
        return GameType.builder()
                .name(gameTypeRequest.getName())
                .build();
    }

    public GameTypeResponse mapToGameTypeResponse(GameType gameType) {
        return GameTypeResponse.builder()
                .id(gameType.getId())
                .name(gameType.getName())
                .build();
    }
    //endregion
}
