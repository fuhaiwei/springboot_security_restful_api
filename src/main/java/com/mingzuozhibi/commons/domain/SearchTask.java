package com.mingzuozhibi.commons.domain;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class SearchTask<T> {

    public SearchTask(String key) {
        this.key = key;
        this.uuid = UUID.randomUUID().toString();
        this.message = "任务已超时";
    }

    private String uuid;

    private String key;

    private boolean success;

    private String message;

    private T data;

    public SearchTask<T> withError(String message) {
        setSuccess(false);
        setMessage(message);
        return this;
    }

    public SearchTask<T> withData(T data) {
        setSuccess(true);
        setData(data);
        return this;
    }

}
