package com.astontech.gameservice.services;

import com.astontech.gameservice.dto.GameRequest;
import com.astontech.gameservice.dto.GameResponse;
import com.astontech.gameservice.exceptions.GameTypeNotFoundException;
import com.astontech.gameservice.models.Game;
import com.astontech.gameservice.models.GameType;
import com.astontech.gameservice.repositories.GameRepository;
import com.astontech.gameservice.repositories.GameTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameTypeService gameTypeService;
    private final GameRepository gameRepository;
    private final GameTypeRepository gameTypeRepository;

    //region CREATE
    public void createGame(GameRequest gameRequest) {
        Game game = mapToGame(gameRequest);
        gameRepository.save(game);
        log.info("Game added: [" + game.getId() + "] - " + game.getName());
    }
    //endregion

    //region READ
    public List<GameResponse> getAllGames() {
        List<Game> gameList = gameRepository.findAll();
        return getGameResponses(gameList);
    }

    public GameResponse getGameById(Integer id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No game found with id: " + id));
        return mapToGameResponse(game);
    }

    public List<GameResponse> getAllGamesByGameTypeName(String gameTypeName) {
        GameType gameType = gameTypeRepository.findByName(gameTypeName);
        List<Game> filteredGameList = gameRepository.findByGameType(gameType);
        return getGameResponses(filteredGameList);
    }

    private List<GameResponse> getGameResponses(List<Game> filteredGameList) {
        if(filteredGameList.isEmpty()) {
            throw new GameTypeNotFoundException("No games found");
        }

        List<GameResponse> filteredGameResponseList = new ArrayList<>();
        for(Game game : filteredGameList) {
            GameResponse gameResponse = mapToGameResponse(game);
            filteredGameResponseList.add(gameResponse);
            log.info("Game: ["+ gameResponse.getId() +"] "+ gameResponse.getName() + ", "
                    + gameResponse.getImage() + ", " + gameResponse.getDescription() + ". Game Type: "
                    + gameResponse.getGameType().getName());
        }
        return filteredGameResponseList;
    }
    //endregion

    //region UPDATE
    public void updateGame(Integer gameId, GameRequest gameRequest) {
        Game gameToUpdate = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Game not found with ID: [" + gameId + "]"));
        gameToUpdate.setName(gameRequest.getName());
        gameToUpdate.setImage(gameRequest.getImage());
        gameToUpdate.setDescription(gameRequest.getDescription());
        gameToUpdate.setGameType(gameTypeRepository.findById(gameRequest.getGameTypeRequest().getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Game Type not found with ID: [" + gameRequest.getGameTypeRequest().getId() + "]")));
        gameRepository.save(gameToUpdate);
        log.info("Game updated: [" + gameToUpdate.getId() + "]");
    }
    //endregion

    //region DELETE
    public void deleteGame(Integer gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with ID: [" + gameId + "]"));
        gameRepository.delete(game);
        log.info("Game deleted: ["+ gameId +"]");
    }
    //endregion

    //region CUSTOM METHODS
    private Game mapToGame(GameRequest gameRequest) {
        return Game.builder()
                .name(gameRequest.getName())
                .image(gameRequest.getImage())
                .description(gameRequest.getDescription())
                .gameType(gameTypeRepository.findById(gameRequest.getGameTypeRequest().getId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Game Type not found with ID: ["+ gameRequest.getGameTypeRequest().getId() +"]")))
                .build();
    }

    private GameResponse mapToGameResponse(Game game) {
        return GameResponse.builder()
                .id(game.getId())
                .name(game.getName())
                .image(game.getImage())
                .description(game.getDescription())
                .gameType(gameTypeService.mapToGameTypeResponse(game.getGameType()))
                .build();
    }
    //endregion
}
