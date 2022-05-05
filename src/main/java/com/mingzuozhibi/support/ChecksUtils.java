package com.mingzuozhibi.support;

import org.apache.commons.lang3.StringUtils;

import java.util.Objects;
import java.util.Optional;

import static com.mingzuozhibi.commons.base.BaseSupport.errorResult;

public abstract class ChecksUtils {

    @SafeVarargs
    public static Optional<String> runChecks(Optional<String>... checks) {
        for (Optional<String> check : checks) {
            if (check.isPresent()) return check;
        }
        return Optional.empty();
    }

    public static Optional<String> checkNotEmpty(String value, String paramName) {
        if (StringUtils.isNotEmpty(value)) {
            return Optional.empty();
        }
        return Optional.of(paramName + " can not empty");
    }

    public static Optional<String> checkNotEmpty(Object value, String paramName) {
        if (!Objects.isNull(value)) {
            return Optional.empty();
        }
        return Optional.of(paramName + " can not empty");
    }

    public static Optional<String> checkStrMatch(String text, String paramName, String regex) {
        if (StringUtils.isEmpty(text) || text.matches(regex)) {
            return Optional.empty();
        }
        return Optional.of(paramName + " mast match " + regex);
    }

    public static String paramExists(String paramName) {
        return errorResult("specified " + paramName + " already exists");
    }

    public static String paramNotExists(String paramName) {
        return errorResult("specified " + paramName + " does not exist");
    }

    public static String itemsExists(String itemName) {
        return errorResult("specified " + itemName + " already exists in the list");
    }

    public static String itemsNotExists(String itemName) {
        return errorResult("specified " + itemName + " does not exist in the list");
    }

}
