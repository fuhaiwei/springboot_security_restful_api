package com.mingzuozhibi.configs;

import com.mingzuozhibi.modules.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 100L;

    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    public String getPassword() {
        return user.getPassword();
    }

    public String getUsername() {
        return user.getUsername();
    }

    public boolean isEnabled() {
        return user.isEnabled();
    }

    public Set<GrantedAuthority> getAuthorities() {
        return user.getRoles().stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toSet());
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String toString() {
        return String.format("UserDetails[name:%s,enabled:%s]", getUsername(), isEnabled());
    }
}
