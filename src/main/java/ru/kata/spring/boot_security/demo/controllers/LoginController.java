package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entity.User;

@RestController
public class LoginController {

//    @GetMapping("/login")
//    public String showLoginForm(@RequestBody User user) {
//
//
//            return "login";
//        }
    @PostMapping("/login")
    public String processLogin(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(email, password);
    }

}
