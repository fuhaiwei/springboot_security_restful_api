package com.mingzuozhibi.support;

import java.security.Principal;

import static com.mingzuozhibi.modules.user.SessionUtils.getAuthentication;

public abstract class ModifyUtils {

    private static String getName() {
        return getAuthentication().map(Principal::getName).orElse("*system*");
    }

    public static String logCreate(String entryName, String name, String json) {
        return String.format("[%s][Create %s][name=%s][json=%s]", getName(), entryName, name, json);
    }

    public static String logDelete(String entryName, String name, String json) {
        return String.format("[%s][Remove %s][name=%s][json=%s]", getName(), entryName, name, json);
    }

    public static String logUpdate(String paramName, Object from, Object to, String name) {
        return String.format("[%s][Update %s][%s=>%s][name=%s]", getName(), paramName, from, to, name);
    }

    public static String logPush(String paramName, String itemName, String listName) {
        return String.format("[%s][Push %s to list][item=%s][list=%s]", getName(), paramName, itemName, listName);
    }

    public static String logDrop(String paramName, String itemName, String listName) {
        return String.format("[%s][Drop %s from list][item=%s][list=%s]", getName(), paramName, itemName, listName);
    }

}
