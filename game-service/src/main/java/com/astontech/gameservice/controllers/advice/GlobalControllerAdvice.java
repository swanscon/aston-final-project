package com.astontech.gameservice.controllers.advice;

import com.astontech.gameservice.exceptions.GameTypeNotFoundException;
import com.astontech.gameservice.exceptions.ForeignKeyRestraintException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(ForeignKeyRestraintException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    ResponseEntity<String> foreignKeyRestraintHandler(ForeignKeyRestraintException fEx) {
        return new ResponseEntity<>(fEx.getLocalizedMessage(), HttpStatus.CONFLICT) ;
    }

    @ExceptionHandler(GameTypeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ResponseEntity<String> gameTypeNotFoundException(GameTypeNotFoundException eEx) {
        return new ResponseEntity<>(eEx.getLocalizedMessage(), HttpStatus.NOT_FOUND);
    }
}
