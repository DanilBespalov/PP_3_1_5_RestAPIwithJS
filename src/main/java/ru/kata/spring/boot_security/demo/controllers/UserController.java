package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.thymeleaf.util.Validate;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserServiceImpl userService;
    private RoleServiceImpl roleService;

    @Autowired
    public UserController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/registration")
    public String registartionPage(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "user/registration";
    }

    @PostMapping("/registration")
    public String perfomRegistration(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/login";
    }

    @GetMapping("/showUserInfo/{id}")
    public String showUserInfo(@ModelAttribute ("user") User user, Long id) {
        userService.getUserByUsername(String.valueOf(user));


        return "user/user";
    }


    @GetMapping("/user/edit/{id}")
    public String editUser(@PathVariable(name = "id") Long id) {
        User user = userService.getUserById(id);
        userService.updateUser(id, user);
        return "user/edit";
    }


}
