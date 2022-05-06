package com.mingzuozhibi.commons.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.function.BiConsumer;

@Getter
@NoArgsConstructor
public class Result<T> {

    private boolean success;

    private String message;

    private T data;

    private ResultPage page;

    public boolean hasError() {
        return message != null;
    }

    public boolean hasData() {
        return data != null;
    }

    public boolean hasPage() {
        return page != null;
    }

    public Result<T> withError(String message) {
        this.success = false;
        this.message = message;
        return this;
    }

    public Result<T> withData(T data) {
        this.success = true;
        this.data = data;
        return this;
    }

    public Result<T> withPage(T data, ResultPage page) {
        this.success = true;
        this.data = data;
        this.page = page;
        return this;
    }

    public Result<T> ifSuccess(BiConsumer<T, Result<T>> consumer) {
        if (success) {
            consumer.accept(data, this);
        }
        return this;
    }

    public static <T> Result<T> ofError(String message) {
        return new Result<T>().withError(message);
    }

    public static <T> Result<T> ofData(T data) {
        return new Result<T>().withData(data);
    }

    public static <T> Result<List<T>> ofPage(List<T> data, ResultPage page) {
        return new Result<List<T>>().withPage(data, page);
    }

    public static <T> Result<T> ofTask(SearchTask<T> task) {
        if (task.isSuccess()) {
            return ofData(task.getData());
        } else {
            return ofError(task.getMessage());
        }
    }

}
