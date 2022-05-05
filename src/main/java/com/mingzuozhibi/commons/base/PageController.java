package com.mingzuozhibi.commons.base;

import com.mingzuozhibi.commons.domain.ResultPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public abstract class PageController extends BaseController {

    protected <T> String pageResult(Page<T> page) {
        Pageable p = page.getPageable();
        return pageResult(page.getContent(), new ResultPage(
            p.getPageSize(), p.getPageNumber() + 1, page.getTotalElements()
        ));
    }

}
