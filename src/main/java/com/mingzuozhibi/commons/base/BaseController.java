package com.mingzuozhibi.commons.base;

import com.mingzuozhibi.commons.domain.Result;
import com.mingzuozhibi.commons.domain.ResultPage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

public abstract class BaseController extends BaseSupport {

    protected static final String MEDIA_TYPE = MediaType.APPLICATION_JSON_VALUE;

    @ResponseBody
    @ExceptionHandler
    public String errorHandler(Exception e) {
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
