package com.astontech.userservice.config;

import com.astontech.userservice.dto.UserRequest;
import com.astontech.userservice.models.Role;
import com.astontech.userservice.models.User;
import com.astontech.userservice.repositories.UserRepository;
import com.astontech.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("password"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            log.debug("Created ADMIN User - {}", admin);
        }
    }
}
