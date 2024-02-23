package com.astontech.userservice.services;

import com.astontech.userservice.dto.UserEventRequest;
import com.astontech.userservice.dto.UserEventResponse;
import com.astontech.userservice.models.UserEvent;
import com.astontech.userservice.repositories.UserEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserEventService {

    private final UserEventRepository userEventRepository;

    public void createUserEvent(UserEventRequest userEventRequest) {
        UserEvent userEvent = mapToUserEvent(userEventRequest);
        userEventRepository.save(userEvent);
        log.info("Event [{}] assigned to user [{}]", userEvent.getEventId(), userEvent.getUserId());
    }

    public List<UserEventResponse> getEventIdsByUserId(Integer userId) {
        List<UserEvent> userEventList = userEventRepository.findAllByUserId(userId);
        List<UserEventResponse> userEventResponseList = new ArrayList<>();
        if(!userEventList.isEmpty()) {
            for(UserEvent userEvent : userEventList) {
                UserEventResponse userEventResponse = mapToUserEventResponse(userEvent);
                userEventResponseList.add(userEventResponse);
                log.info("User: [{}], Event: [{}]", userEvent.getUserId(), userEvent.getEventId());
            }
        } else {
            log.info("No user events found");
        }
        return userEventResponseList;
    }

    public void deleteUserEvent(UserEventRequest userEventRequest) {
        UserEvent userEventToDelete = mapToUserEvent(userEventRequest);
        userEventRepository.delete(userEventToDelete);
        log.info("Event [{}] removed from user [{}]", userEventRequest.getEventId(), userEventRequest.getUserId());
    }

    private UserEvent mapToUserEvent(UserEventRequest userEventRequest) {
        return UserEvent.builder()
                .eventId(userEventRequest.getEventId())
                .userId(userEventRequest.getUserId())
                .build();
    }

    private UserEventResponse mapToUserEventResponse(UserEvent userEvent) {
        return UserEventResponse.builder()
                .eventId(userEvent.getEventId())
                .build();
    }
}
