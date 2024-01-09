package education.platform.backend.Service.Impl;

/*
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GoogleMeetService {

    @Value("${google.meet.api.endpoint}")
    private String googleMeetApiEndpoint;

    @Value("${google.meet.api.token}")
    private String googleMeetApiToken;

    public String createPermanentRoom() {
        CloseableHttpClient httpClient = null;
        CloseableHttpResponse response = null;

        try {
            httpClient = HttpClients.createDefault();
            HttpPost httpPost = new HttpPost(googleMeetApiEndpoint);

            httpPost.addHeader("Authorization", "Bearer " + googleMeetApiToken);
            httpPost.addHeader("Content-Type", "application/json");

            String json = "{\"name\": \"My Permanent Meeting Room\"}";
            StringEntity entity = new StringEntity(json);
            httpPost.setEntity(entity);

            response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();

            if (statusCode == 200) {
                String responseBody = EntityUtils.toString(response.getEntity());
                // Парсинг JSON ответа и получение ссылки на комнату
                // Пример: {"roomLink": "https://meet.google.com/xyz-abc-123"}
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                String roomLink = jsonNode.get("roomLink").asText();

                return roomLink; // Вернуть ссылку на созданную комнату
            } else {
                // Обработка ошибки
                throw new RuntimeException("Ошибка при создании комнаты Google Meet. Код статуса: " + statusCode);
            }
        } catch (Exception e) {
            // Обработка исключений
            e.printStackTrace(); // Замените это на логирование или другую обработку ошибок
            return null;
        } finally {
            try {
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace(); // Замените это на логирование или другую обработку ошибок
            }

            try {
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (IOException e) {
                e.printStackTrace(); // Замените это на логирование или другую обработку ошибок
            }
        }
    }
}
*/
