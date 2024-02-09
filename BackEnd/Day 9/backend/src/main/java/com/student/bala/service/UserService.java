package com.student.bala.service;

import com.student.bala.dto.response.BasicResponse;
import com.student.bala.dto.response.UserResponse;

public interface UserService {

    BasicResponse<UserResponse> getAllUser();

}