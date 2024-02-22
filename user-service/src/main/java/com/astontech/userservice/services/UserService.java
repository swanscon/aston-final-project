package com.astontech.userservice.services;

import com.astontech.userservice.dto.NewUserRequest;
import com.astontech.userservice.models.User;
import com.astontech.userservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final JwtEncoder encoder;

    //region POST REQUESTS

    public User registerNewUser(NewUserRequest newUser) {
        User user = User.builder()
                .username(newUser.getUsername())
                .password(newUser.getPassword())
                .build();
        return userRepository.save(user);
    }


    public String generateToken(Authentication authentication) {
    Instant now = Instant.now();
    String scope = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));
    JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.HOURS))
            .subject(authentication.getName())
            .claim("scope", scope)
            .build();
    return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
}

    //endregion

    //region GET REQUESTS

        // Get all users

        // Get single user

    //endregion

    //region PUT REQUESTS

        // Edit user

        // Change password

    //endregion

    //region DELETE REQUESTS

        //delete user

    //endregion

}
