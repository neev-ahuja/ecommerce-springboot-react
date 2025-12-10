package com.neevahuja.ecommerce.controller;

import com.neevahuja.ecommerce.requests.LoginRequest;
import com.neevahuja.ecommerce.requests.RegisterRequest;
import com.neevahuja.ecommerce.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    LoginService loginService;
    @Autowired
    public LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest.username, loginRequest.password);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest registerRequest){
        return loginService.register(registerRequest.name , registerRequest.username , registerRequest.password);
    }
}
