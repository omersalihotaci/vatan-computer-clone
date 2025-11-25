package com.otaci.inatback.util;

public class TextUtils {

    public static String truncate(String text, int limit) {
        if (text == null || text.length() <= limit) return text;

        String trimmed = text.substring(0, limit);
        int lastSpace = trimmed.lastIndexOf(" ");
        if (lastSpace == -1) return trimmed;

        return trimmed.substring(0, lastSpace);
    }
}
