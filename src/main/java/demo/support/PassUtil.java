package demo.support;

import demo.model.User;

import java.security.MessageDigest;
import java.util.Objects;

public abstract class PassUtil {

    public static boolean vaild(User user, String password) {
        String md5Password = md5(user.getUsername() + md5(password));
        return md5Password.equals(user.getPassword());
    }

    public static String encode(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        return md5(username + md5(password));
    }

    private static String md5(String text) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(text.getBytes("utf-8"));
            return toHex(bytes);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static String toHex(byte[] bytes) {
        final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();
        StringBuilder ret = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            ret.append(HEX_DIGITS[(b >> 4) & 0x0f]);
            ret.append(HEX_DIGITS[b & 0x0f]);
        }
        return ret.toString();
    }

}