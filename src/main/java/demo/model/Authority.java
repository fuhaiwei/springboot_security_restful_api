package demo.model;

import demo.support.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Authority extends BaseModel implements GrantedAuthority {

    public Authority(String authority) {
        this.authority = authority;
    }

    @Column(length = 32, nullable = false, unique = true)
    private String authority;

}
