package com.mingzuozhibi.modules.user;

import lombok.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class SessionAndCount {

    private String userName;
    private Set<String> userRoles;
    private long userCount;
    private boolean hasBasic;
    private boolean hasAdmin;

    public SessionAndCount(Authentication authentication, long userCount) {
        this.userName = authentication.getName();
        this.userRoles = getUserRoles(authentication);
        this.userCount = userCount;
        this.hasBasic = userRoles.contains("ROLE_BASIC");
        this.hasAdmin = userRoles.contains("ROLE_ADMIN");
    }

    private Set<String> getUserRoles(Authentication authentication) {
        return authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());
    }

}
