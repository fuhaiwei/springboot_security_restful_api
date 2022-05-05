package com.mingzuozhibi.modules.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static com.mingzuozhibi.modules.user.SessionUtils.setSessionTokenToHeader;

@Service
public class SessionService {

    @Autowired
    private RememberRepository rememberRepository;

    @Transactional
    public Optional<Remember> vaildSession(String token) {
        if (token == null || token.length() != 36) {
            return Optional.empty();
        }
        Optional<Remember> byToken = rememberRepository.findByToken(token);
        if (!byToken.isPresent()) {
            setSessionTokenToHeader("");
            return Optional.empty();
        }
        Remember remember = byToken.get();
        if (remember.getExpired().isBefore(Instant.now())) {
            rememberRepository.delete(remember);
            return Optional.empty();
        }
        if (!remember.getUser().isEnabled()) {
            return Optional.empty();
        }
        return Optional.of(remember);
    }

    @Transactional
    public Remember buildSession(User user) {
        String token = UUID.randomUUID().toString();
        Instant expired = Instant.now().plusMillis(TimeUnit.DAYS.toMillis(14));
        Remember remember = new Remember(user, token, expired);
        rememberRepository.save(remember);
        return remember;
    }

    @Transactional
    public void cleanSession(Long sessionId) {
        if (sessionId != null) {
            rememberRepository.deleteById(sessionId);
        }
    }

}
