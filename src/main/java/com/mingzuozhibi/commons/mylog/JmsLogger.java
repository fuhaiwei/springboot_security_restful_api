package com.mingzuozhibi.commons.mylog;

import com.mingzuozhibi.commons.mylog.JmsEnums.Name;
import lombok.extern.slf4j.Slf4j;

import static com.mingzuozhibi.commons.mylog.JmsEnums.Type.*;

@Slf4j
public class JmsLogger {

    private final Name name;
    private final JmsSender jmsSender;

    public JmsLogger(Name name, JmsSender jmsSender) {
        this.jmsSender = jmsSender;
        this.name = name;
    }

    public void debug(String text) {
        jmsSender.info(name, DEBUG, text);
    }

    public void info(String text) {
        jmsSender.info(name, INFO, text);
    }

    public void notify(String text) {
        jmsSender.info(name, NOTIFY, text);
    }

    public void success(String text) {
        jmsSender.info(name, SUCCESS, text);
    }

    public void warning(String text) {
        jmsSender.info(name, WARNING, text);
    }

    public void error(String text) {
        jmsSender.info(name, ERROR, text);
    }

    public void debug(String format, Object... args) {
        jmsSender.info(name, DEBUG, String.format(format, args));
    }

    public void info(String format, Object... args) {
        jmsSender.info(name, INFO, String.format(format, args));
    }

    public void notify(String format, Object... args) {
        jmsSender.info(name, NOTIFY, String.format(format, args));
    }

    public void success(String format, Object... args) {
        jmsSender.info(name, SUCCESS, String.format(format, args));
    }

    public void warning(String format, Object... args) {
        jmsSender.info(name, WARNING, String.format(format, args));
    }

    public void error(String format, Object... args) {
        jmsSender.info(name, ERROR, String.format(format, args));
    }


}
