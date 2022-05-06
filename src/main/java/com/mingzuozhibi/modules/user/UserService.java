package com.mingzuozhibi.modules.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void initAdminUser(String encode) {
        User user = userRepository.findByUsername("admin").orElseGet(() -> {
            User admin = new User("admin", encode, true);
            admin.getRoles().add("ROLE_ADMIN");
            return userRepository.save(admin);
        });
        user.setPassword(encode);
        user.getRoles().add("ROLE_BASIC");
        user.getRoles().add("ROLE_ADMIN");
        user.setEnabled(true);
    }

}
