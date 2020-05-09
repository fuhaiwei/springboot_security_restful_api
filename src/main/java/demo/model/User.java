package demo.model;

import demo.support.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class User extends BaseModel implements UserDetails {

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.accountNonExpired = true;
        this.accountNonLocked = true;
        this.credentialsNonExpired = true;
        this.enabled = true;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authorities",
        joinColumns = {@JoinColumn(name = "user_id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_id")})
    private Set<Authority> authorities = new HashSet<>();

    @Column(length = 32, unique = true, nullable = false)
    private String username;

    @Column(length = 32, nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean accountNonExpired;

    @Column(nullable = false)
    private boolean accountNonLocked;

    @Column(nullable = false)
    private boolean credentialsNonExpired;

    @Column(nullable = false)
    private boolean enabled;

}
