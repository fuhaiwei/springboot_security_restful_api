package com.mingzuozhibi.modules.user;

import com.mingzuozhibi.commons.base.BaseController;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;

import static com.mingzuozhibi.modules.user.SessionUtils.*;
import static com.mingzuozhibi.support.ChecksUtils.*;

@Slf4j
@RestController
public class SessionController extends BaseController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @GetMapping(value = "/api/session", produces = MEDIA_TYPE)
    public String sessionQuery() {
        Optional<Authentication> optional = getAuthentication();
        if (!optional.isPresent()) {
            log.debug("sessionQuery: Authentication is null");
            setAuthentication(buildGuestAuthentication());
        } else {
            if (!isLogged(optional.get())) {
                String token = getSessionTokenFromHeader();
                sessionService.vaildSession(token).ifPresent(remember -> {
                    onSessionLogin(remember.getUser(), false);
                });
            }
        }
        return buildSession();
    }

    private boolean isLogged(Authentication authentication) {
        return authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch(Predicate.isEqual("ROLE_BASIC"));
    }

    @Setter
    private static class LoginForm {
        private String username;
        private String password;
    }

    @Transactional
    @PostMapping(value = "/api/session", produces = MEDIA_TYPE)
    public String sessionLogin(@RequestBody LoginForm form) {
        Optional<String> checks = runChecks(
            checkNotEmpty(form.username, "username"),
            checkStrMatch(form.username, "username", "[A-Za-z0-9_]{4,20}"),
            checkNotEmpty(form.password, "password"),
            checkStrMatch(form.password, "password", "[0-9a-f]{32}")
        );
        if (checks.isPresent()) {
            return errorResult(checks.get());
        }
        Optional<User> byUsername = userRepository.findByUsername(form.username);
        if (!byUsername.isPresent()) {
            return paramNotExists("username");
        }
        User user = byUsername.get();
        if (!Objects.equals(user.getPassword(), form.password)) {
            return errorResult("password error");
        }
        if (!user.isEnabled()) {
            return errorResult("user is disabled");
        }
        onSessionLogin(user, true);
        return buildSession();
    }

    @Transactional
    @DeleteMapping(value = "/api/session", produces = MEDIA_TYPE)
    public String sessionLogout() {
        Long sessionId = getSessionIdFromHttpSession();
        sessionService.cleanSession(sessionId);
        setSessionTokenToHeader("");
        setAuthentication(buildGuestAuthentication());
        return buildSession();
    }

    private String buildSession() {
        Optional<Authentication> optional = getAuthentication();
        if (optional.isPresent()) {
            return dataResult(new Session(optional.get()));
        } else {
            return dataResult(new Session(buildGuestAuthentication()));
        }
    }

    private void onSessionLogin(User user, boolean buildNew) {
        if (buildNew) {
            Remember remember = sessionService.buildSession(user);
            setSessionIdToHttpSession(remember.getId());
            setSessionTokenToHeader(remember.getToken());
        }
        setAuthentication(buildUserAuthentication(user));
        user.setLastLoggedIn(Instant.now());
    }

}
