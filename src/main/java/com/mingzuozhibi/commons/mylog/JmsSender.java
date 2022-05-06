package com.mingzuozhibi.commons.mylog;

import com.mingzuozhibi.commons.domain.Logger;
import com.mingzuozhibi.commons.mylog.JmsEnums.Name;
import com.mingzuozhibi.commons.mylog.JmsEnums.Type;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.JmsException;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import static com.mingzuozhibi.commons.gson.GsonFactory.GSON;
import static com.mingzuozhibi.commons.mylog.JmsEnums.MODULE_MESSAGE;

@Slf4j
@Component
public class JmsSender {

    @Autowired
    private JmsTemplate template;

    public void info(Name name, Type type, String text) {
        Logger logger = new Logger(name, type, text);
        log.info("JMS -> {} msg={}", MODULE_MESSAGE, logger);
        send(MODULE_MESSAGE, GSON.toJson(logger));
    }

    public void send(String destination, String json) {
        for (int i = 0; i < 3; i++) {
            try {
                template.convertAndSend(destination, json);
                break;
            } catch (JmsException e) {
                String format = "convertAndSend(destination=%s, json=%s)";
                log.debug(String.format(format, destination, json), e);
            }
        }
    }

    public JmsLogger bind(Name name) {
        return new JmsLogger(name, this);
    }

}
