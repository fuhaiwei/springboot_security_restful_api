package com.mingzuozhibi.commons.gson;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.*;

import java.io.IOException;

public abstract class GsonAdapter<T> extends TypeAdapter<T> {

    public void write(JsonWriter writer, T value) throws IOException {
        if (value != null) {
            withWriter(writer, value);
        } else {
            writer.nullValue();
        }
    }

    public T read(JsonReader reader) throws IOException {
        if (reader.peek() == JsonToken.NULL) {
            reader.nextNull();
            return null;
        } else {
            return withReader(reader);
        }
    }

    protected abstract void withWriter(JsonWriter writer, T value) throws IOException;

    protected abstract T withReader(JsonReader reader) throws IOException;

}
