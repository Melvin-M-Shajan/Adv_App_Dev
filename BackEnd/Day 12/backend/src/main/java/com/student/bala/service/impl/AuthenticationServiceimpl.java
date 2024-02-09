package com.student.bala.service.impl;


import static com.student.bala.enumerated.Role.USER;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.student.bala.dto.request.Loginrequest;
import com.student.bala.dto.request.RegisterRequest;
import com.student.bala.dto.response.LoginResponse;
import com.student.bala.dto.response.RegisterResponse;
import com.student.bala.model.User;
import com.student.bala.repository.UserRepository;
import com.student.bala.service.AuthenticationService;
import com.student.bala.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceimpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public RegisterResponse register(RegisterRequest request) {
        Optional<User> isUserExist = userRepository.findByEmail(request.getEmail());
        if(isUserExist.isPresent()){
            return RegisterResponse.builder().message("User with mail id "+ request.getEmail()+" is already exist").build();
        }
        var user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(USER)
        .build();
        userRepository.save(user);
        return RegisterResponse.builder()
        .message("user created successfully")
        .build();
    }
    
    @Override
    public LoginResponse login(Loginrequest request) {
        authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            String token = jwtUtil.generateToken(user);
            return LoginResponse.builder()
            .message("User logged in sucessfully")
            .token(token)
            .build();
    }

}
