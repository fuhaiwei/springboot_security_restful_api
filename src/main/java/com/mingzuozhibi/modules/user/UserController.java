package com.mingzuozhibi.modules.user;

import com.mingzuozhibi.commons.base.BaseController;
import com.mingzuozhibi.commons.mylog.JmsBind;
import com.mingzuozhibi.commons.mylog.JmsEnums.Name;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

import static com.mingzuozhibi.support.ChecksUtils.*;
import static com.mingzuozhibi.support.ModifyUtils.*;

@RestController
@JmsBind(Name.SERVER_USER)
public class UserController extends BaseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RememberRepository rememberRepository;

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/api/users", produces = MEDIA_TYPE)
    public String findAll() {
        return dataResult(userRepository.findAll());
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/api/users/{id}", produces = MEDIA_TYPE)
    public String findById(@PathVariable Long id) {
        Optional<User> byId = userRepository.findById(id);
        if (!byId.isPresent()) {
            return paramNotExists("用户ID");
        }
        return dataResult(byId.get());
    }

    @Setter
    private static class EntityForm {
        private String username;
        private String password;
        private Boolean enabled;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/api/users", produces = MEDIA_TYPE)
    public String createUser(@RequestBody EntityForm form) {
        Optional<String> checks = runChecks(
            checkNotEmpty(form.username, "username"),
            checkStrMatch(form.username, "username", "[A-Za-z0-9_]{4,20}"),
            checkNotEmpty(form.password, "password"),
            checkStrMatch(form.password, "password", "[0-9a-f]{32}")
        );
        if (checks.isPresent()) {
            return errorResult(checks.get());
        }
        if (userRepository.existsByUsername(form.username)) {
            return paramExists("username");
        }
        User user = new User(form.username, form.password, form.enabled);
        userRepository.save(user);
        bind.success(logCreate("User", user.getUsername(), gson.toJson(user)));
        return dataResult(user);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/api/users/{id}", produces = MEDIA_TYPE)
    public String updateUser(@PathVariable Long id,
                             @RequestBody EntityForm form) {
        Optional<String> checks = runChecks(
            checkNotEmpty(form.username, "username"),
            checkStrMatch(form.username, "username", "[A-Za-z0-9_]{4,20}"),
            checkStrMatch(form.password, "password", "[0-9a-f]{32}"),
            checkNotEmpty(form.enabled, "enabled")
        );
        if (checks.isPresent()) {
            return errorResult(checks.get());
        }
        Optional<User> byId = userRepository.findById(id);
        if (!byId.isPresent()) {
            return paramNotExists("user id");
        }
        User user = byId.get();
        if (!Objects.equals(user.getUsername(), form.username)) {
            bind.notify(logUpdate("Username", user.getUsername(), form.username, user.getUsername()));
            user.setUsername(form.username);
        }
        if (StringUtils.isNotEmpty(form.password) && !Objects.equals(user.getPassword(), form.password)) {
            bind.notify(logUpdate("Password", "******", "******", user.getUsername()));
            user.setPassword(form.password);
            onChangePassword(user);
        }
        if (user.isEnabled() != form.enabled) {
            bind.notify(logUpdate("Enabled", user.isEnabled(), form.enabled, user.getUsername()));
            user.setEnabled(form.enabled);
        }
        return dataResult(user);
    }

    private void onChangePassword(User user) {
        rememberRepository.deleteByUser(user);
    }

}
