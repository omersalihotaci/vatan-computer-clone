package com.otaci.inatback.service.impl;
import com.otaci.inatback.dto.AuthResponse;
import com.otaci.inatback.dto.LoginRequest;
import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.dto.UserSummaryResponse;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.exception.custom.BadRequestException;
import com.otaci.inatback.exception.custom.ConflictException;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.mapper.UserMapper;
import com.otaci.inatback.model.Role;
import com.otaci.inatback.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;


    @Transactional(readOnly = true)
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated user");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + email)
                );
    }


    @Transactional
        public AuthResponse register(RegisterRequest request) {

            if (userRepository.existsByEmail(request.email())) {
                throw new ConflictException("Email zaten kayıtlı");
            }

            User user = userMapper.toEntity(request);
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode(request.password()));
            userRepository.save(user);

        String token = jwtService.generateToken(user);
        return new AuthResponse(
                token,
                "Bearer",
                3600,
                new UserSummaryResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName(),
                        user.getRole()
                )
        );
        }


    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new BadRequestException("Email veya şifre hatalı"));


        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadRequestException("Email veya şifre hatalı");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(
                token,
                "Bearer",
                3600,
                new UserSummaryResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName(),
                        user.getRole()
                )
        );
    }

    }
