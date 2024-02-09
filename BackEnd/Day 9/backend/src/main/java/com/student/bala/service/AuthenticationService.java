package com.student.bala.service;

import com.student.bala.dto.request.Loginrequest;
import com.student.bala.dto.request.RegisterRequest;
import com.student.bala.dto.response.LoginResponse;
import com.student.bala.dto.response.RegisterResponse;

public interface AuthenticationService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(Loginrequest request);

}
