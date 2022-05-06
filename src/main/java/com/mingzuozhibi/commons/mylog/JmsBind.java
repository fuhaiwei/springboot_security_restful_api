package com.mingzuozhibi.commons.mylog;

import com.mingzuozhibi.commons.mylog.JmsEnums.Name;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface JmsBind {
    Name value() default Name.DEFAULT;
}
