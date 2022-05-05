package com.mingzuozhibi.commons.domain;

import com.mingzuozhibi.commons.mylog.JmsEnums.Name;
import com.mingzuozhibi.commons.mylog.JmsEnums.Type;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
public class Logger {

    public Logger(Name name, Type type, String text) {
        this.name = name;
        this.type = type;
        this.text = text;
        this.createOn = Instant.now();
    }

    private Name name;

    private Type type;

    private String text;

    private Instant createOn;

    public String toString() {
        return String.format("[%s][%s][%s]", type, name, text);
    }

}
