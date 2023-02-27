package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import ru.kata.spring.boot_security.demo.entity.User;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String showLoginForm(Model model) {

            model.addAttribute("user", new User());
            return "login";
        }
    @PostMapping("/process_login")
    public String processLogin() {
        return "redirect:/";
    }

}
