package com.mingzuozhibi.commons.base;

import com.google.gson.Gson;
import com.mingzuozhibi.commons.domain.Result;
import com.mingzuozhibi.commons.mylog.JmsLogger;
import com.mingzuozhibi.commons.mylog.JmsSender;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import static com.mingzuozhibi.commons.gson.GsonFactory.GSON;

public abstract class BaseSupport {

    @Autowired
    protected Gson gson;

    @Setter
    protected JmsLogger bind;

    @Autowired
    protected JmsSender jmsSender;

    public static String errorResult(String error) {
        return GSON.toJson(Result.ofError(error));
    }

}
