package demo.model;

import demo.support.BaseModel;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User extends BaseModel implements UserDetails {

    private Set<Authority> authorities = new HashSet<>();
    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.accountNonExpired = true;
        this.accountNonLocked = true;
        this.credentialsNonExpired = true;
        this.enabled = true;
    }

    @Override
    @ManyToMany
    @JoinTable(name = "user_authorities",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_id")})
    public Set<Authority> getAuthorities() {
        return this.authorities;
    }

    @Override
    @Column(length = 50, unique = true, nullable = false)
    public String getUsername() {
        return this.username;
    }

    @Override
    @Column(length = 50, nullable = false)
    public String getPassword() {
        return this.password;
    }

    @Override
    @Column(nullable = false)
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    @Column(nullable = false)
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    @Column(nullable = false)
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    @Column(nullable = false)
    public boolean isEnabled() {
        return this.enabled;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

}
