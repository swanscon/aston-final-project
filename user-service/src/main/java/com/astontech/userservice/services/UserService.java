package com.astontech.userservice.services;

import com.astontech.userservice.dto.UserRequest;
import com.astontech.userservice.dto.UserResponse;
import com.astontech.userservice.models.User;
import com.astontech.userservice.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //region CREATE
    public void createUser(UserRequest userRequest) {
        String hashedPassword = passwordEncoder.encode(userRequest.getPassword());
        userRequest.setPassword(hashedPassword);
        User user = mapToUser(userRequest);
        userRepository.save(user);
        log.info("User created: [" + user.getId() + "]: " + user.getUsername());
    }
    //endregion

    //region READ
    public List<UserResponse> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserResponse> userResponseList = new ArrayList<>();
        for(User user : userList) {
            userResponseList.add(mapToUserReponse(user));
        }
        return userResponseList;
    }

    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        return mapToUserReponse(user);
    }
    //endregion

    //region UPDATE
    private void updateUser(Integer userId, UserRequest userRequest) {
        User userToUpdate = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User not found with ID: [" + userId + "]"
                ));
        userToUpdate.setUsername(userRequest.getUsername());
        String hashedPassword = passwordEncoder.encode(userRequest.getPassword());
        userToUpdate.setPassword(hashedPassword);
        userToUpdate.setAdmin(userRequest.getAdmin());
        userRepository.save(userToUpdate);
        log.info("User updated: [" + userToUpdate.getId() + "]");
    }
    //endregion

    //region DELETE
    public void deleteUser(Integer userId) {
        User userToDelete = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User not found with ID: [" + userId + "]"
                ));
        userRepository.delete(userToDelete);
        log.info("User deleted: [" + userId + "]");
    }
    //endregion

    //region CUSTOM METHODS
    private User mapToUser(UserRequest userRequest) {
        return User.builder()
                .username(userRequest.getUsername())
                .password(userRequest.getPassword())
                .build();
    }

    private UserResponse mapToUserReponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .admin(user.getAdmin())
                .build();
    }

    //endregion
}
