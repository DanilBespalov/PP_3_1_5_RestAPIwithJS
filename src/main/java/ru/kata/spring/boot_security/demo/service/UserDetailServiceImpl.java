package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserServiceImpl userService;

    @Autowired
    public UserDetailServiceImpl(UserServiceImpl userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = Optional.ofNullable(Optional.ofNullable(userService.getUserByEmail(username)).orElseThrow(() -> new UsernameNotFoundException(String.format("User %s not found", username))));

        return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getEmail(),
                (user.get().getRoles()));
    }
}
