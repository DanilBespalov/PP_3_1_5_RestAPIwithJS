package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {


    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @GetMapping()
    public String adminPage(@ModelAttribute("users") User user) {
        return "admin";
    }

    @GetMapping("/new")
    public String getUserCreateForm(@ModelAttribute("user") User user) {
        roleService.getRoles();
        return "new";
    }

    @PostMapping("/new")
    public String createUser(@ModelAttribute("user") User user) {
        Role role = new Role("ROLE_USER");
        roleService.saveRoles(role);
        user.setRoles(Set.of(role));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String getUserEditForm(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        userService.getUserById(id);
        roleService.getRoles();
        return "edit";
    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        userService.updateUser(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteuser(@ModelAttribute("uer") User user, @PathVariable("id") Long id) {
        userService.removeUser(id);
        return "redirect:/admin";
    }
}
