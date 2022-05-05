package com.mingzuozhibi.commons.gson;

import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.*;

import static com.mingzuozhibi.commons.utils.FormatUtils.fmtDate;
import static com.mingzuozhibi.commons.utils.MyTimeUtils.*;

@Slf4j
@Configuration
public class GsonFactory {

    public static Gson GSON;

    @Bean
    public GsonBuilderCustomizer gsonConfig() {
        log.info("GsonFactory.GSON Config");
        return builder -> {
            setupConfig(builder);
            withInstant(builder);
            withLocalDate(builder);
            withLocalDateTime(builder);
            setGson(builder);
        };
    }

    private void setGson(GsonBuilder builder) {
        GsonFactory.GSON = builder.create();
        log.info("GsonFactory.GSON Inject");
    }

    private void setupConfig(GsonBuilder builder) {
        builder.setExclusionStrategies(new ExclusionStrategy() {
            public boolean shouldSkipField(FieldAttributes f) {
                return f.getAnnotation(GsonIgnored.class) != null;
            }

            public boolean shouldSkipClass(Class<?> clazz) {
                return false;
            }
        });
    }

    private void withInstant(GsonBuilder builder) {
        builder.registerTypeAdapter(Instant.class, new GsonAdapter<Instant>() {
            protected void withWriter(JsonWriter writer, Instant value) throws IOException {
                writer.value(value.toEpochMilli());
            }

            protected Instant withReader(JsonReader reader) throws IOException {
                return Instant.ofEpochMilli(reader.nextLong());
            }
        });
    }

    private void withLocalDate(GsonBuilder builder) {
        builder.registerTypeAdapter(LocalDate.class, new GsonAdapter<LocalDate>() {
            protected void withWriter(JsonWriter writer, LocalDate value) throws IOException {
                writer.value(value.format(fmtDate));
            }

            protected LocalDate withReader(JsonReader reader) throws IOException {
                return LocalDate.parse(reader.nextString(), fmtDate);
            }
        });
    }

    private void withLocalDateTime(GsonBuilder builder) {
        builder.registerTypeAdapter(LocalDateTime.class, new GsonAdapter<LocalDateTime>() {
            protected void withWriter(JsonWriter writer, LocalDateTime value) throws IOException {
                writer.value(toEpochMilli(value));
            }

            protected LocalDateTime withReader(JsonReader reader) throws IOException {
                return ofEpochMilli(reader.nextLong());
            }
        });
    }

}
