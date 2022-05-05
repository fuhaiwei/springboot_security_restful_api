package com.mingzuozhibi.commons.utils;

import java.time.*;

public abstract class MyTimeUtils {

    public static final ZoneId ZONE = ZoneId.systemDefault();

    public static Instant toInstant(LocalDateTime time) {
        return time.atZone(ZONE).toInstant();
    }

    public static LocalDateTime ofInstant(Instant instant) {
        return instant.atZone(ZONE).toLocalDateTime();
    }

    public static long toEpochMilli(LocalDateTime time) {
        return toInstant(time).toEpochMilli();
    }

    public static LocalDateTime ofEpochMilli(long milli) {
        return ofInstant(Instant.ofEpochMilli(milli));
    }

}
