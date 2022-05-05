package com.mingzuozhibi.modules.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface RememberRepository extends JpaRepository<Remember, Long> {

    void deleteByUser(User user);

    Optional<Remember> findByToken(String token);

    long deleteByExpiredBefore(Instant instant);

}
