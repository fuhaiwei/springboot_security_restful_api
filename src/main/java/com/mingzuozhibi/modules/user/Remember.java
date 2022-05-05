package com.mingzuozhibi.modules.user;

import com.mingzuozhibi.commons.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Remember extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 100L;

    public Remember(User user, String token, Instant expired) {
        this.user = user;
        this.token = token;
        this.expired = expired;
    }

    @ManyToOne(optional = false)
    private User user;

    @Column(length = 36, nullable = false)
    private String token;

    @Column(nullable = false)
    private Instant expired;

}
