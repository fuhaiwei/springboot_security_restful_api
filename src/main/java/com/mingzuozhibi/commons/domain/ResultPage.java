package com.mingzuozhibi.commons.domain;

import lombok.Getter;

@Getter
public class ResultPage {

    public ResultPage(int pageSize, int currentPage, long totalElements) {
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.totalElements = totalElements;
    }

    private final int pageSize;

    private final int currentPage;

    private final long totalElements;

}
