package com.student.bala.controller;

import static com.student.bala.util.MyConstant.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.bala.dto.request.Loginrequest;
import com.student.bala.dto.request.RegisterRequest;
import com.student.bala.dto.response.LoginResponse;
import com.student.bala.dto.response.RegisterResponse;
import com.student.bala.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AUTH)
@RequiredArgsConstructor
public class AthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request){
        RegisterResponse response = new RegisterResponse();
        try{
            response = authenticationService.register(request);
            return new ResponseEntity<>(response,ACCEPTED);
        }
        catch(Exception e){
            response.setMessage("Something went wrong");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }
    @PostMapping(LOGIN)
    public ResponseEntity<LoginResponse> login(@RequestBody Loginrequest request){
        LoginResponse response = new LoginResponse();
        try{
            response = authenticationService.login(request);
            return new ResponseEntity<>(response, ACCEPTED);
        }
        catch(Exception e){
            System.out.print(e);
            response.setMessage("Someting wrong");
            response.setToken("");
            // response.builder()
            // .message("Somethin went wrong").token("").build();
            return new  ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }
}
