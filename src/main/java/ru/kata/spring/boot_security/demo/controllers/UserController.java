package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Set;

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
        userService.getAllUsers();
        return "/registration";
    }

    @PostMapping("/registration")
    public String perfomRegistration(@ModelAttribute("user") User user) {
        Role role = new Role("ROLE_USER");
        roleService.saveRoles(role);
        user.setRoles(Set.of(role));
        userService.saveUser(user);
        return "redirect:/login";
    }

    @GetMapping("/showUserInfo/{id}")
    public String showUserInfo(@ModelAttribute ("user") User user, @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserServiceImpl userServiceImpl = (UserServiceImpl) authentication.getPrincipal();
        userServiceImpl.getUserById(id);
        return "user";
    }

}
