package com.astontech.userservice.services;

import com.astontech.userservice.dto.UserRequest;
import com.astontech.userservice.models.Role;
import com.astontech.userservice.models.User;
import com.astontech.userservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findUserByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Username not found."));
            }
        };
    }

    public User createUser(UserRequest userRequest) {
        User newUser = mapToUser(userRequest);
        return userRepository.save(newUser);
    }

    public User createAdmin(UserRequest userRequest) {
        User newAdmin = mapToAdmin(userRequest);
        return userRepository.save(newAdmin);
    }

    private User mapToUser(UserRequest userRequest) {
        return User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.ROLE_USER)
                .build();
    }

    private User mapToAdmin(UserRequest userRequest) {
        return User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.ROLE_ADMIN)
                .build();
    }

}
