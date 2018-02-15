package demo.action;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

public class BaseController {

    protected static final String MEDIA_TYPE = MediaType.APPLICATION_JSON_UTF8_VALUE;
    protected Logger LOGGER;

    public BaseController() {
        LOGGER = LoggerFactory.getLogger(this.getClass());
    }

    protected String objectResult(Object object) {
        JSONObject root = new JSONObject();
        root.put("success", true);
        root.put("data", object);
        return root.toString();
    }

    protected String errorMessage(String message) {
        JSONObject root = new JSONObject();
        root.put("success", false);
        root.put("message", message);
        return root.toString();
    }

}
