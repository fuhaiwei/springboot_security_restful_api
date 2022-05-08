package com.mingzuozhibi.commons.base;

import com.mingzuozhibi.commons.domain.Result;
import com.mingzuozhibi.commons.domain.ResultPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
public abstract class BaseController extends BaseSupport {

    protected static final String MEDIA_TYPE = MediaType.APPLICATION_JSON_VALUE;

    @ResponseBody
    @ExceptionHandler
    public String errorHandler(Exception e) throws Exception {
        if (e instanceof AccessDeniedException) {
            throw e;
        }
        if (e instanceof AuthenticationException) {
            throw e;
        }
        log.warn("errorHandler", e);
        return errorResult(e.toString());
    }

    protected <T> String baseResult(Result<T> base) {
        return gson.toJson(base);
    }

    protected <T> String dataResult(T data) {
        return gson.toJson(Result.ofData(data));
    }

    protected <T> String pageResult(List<T> data, ResultPage page) {
        return gson.toJson(Result.ofPage(data, page));
    }

}
