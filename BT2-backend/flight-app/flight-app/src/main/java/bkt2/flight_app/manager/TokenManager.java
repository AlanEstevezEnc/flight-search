package bkt2.flight_app.manager;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component
public class TokenManager {

    //@Value("${auth.url}")
    private String tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    @Value("${auth.client-id}")
    private String clientId;

    @Value("${auth.client-secret}")
    private String clientSecret ;

    private Instant tokenTTL;


    private final RestTemplate restTemplate;
    private String currentToken;

    public TokenManager(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @PostConstruct
    public void init() {
        fetchToken(); 
        
    }

    public String getToken() {
        if(isTokenExpired()){
            fetchToken();
        }
        return currentToken;
    }

    private void fetchToken() {



        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
        System.out.println(tokenUrl);

        body.add("grant_type", "client_credentials");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<TokenResponse> response = restTemplate.postForEntity(tokenUrl, request, TokenResponse.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                this.currentToken = response.getBody().getAccess_token();
                System.out.println("Token obtenido: " + currentToken);
                tokenTTL = Instant.now();
            } else {
                System.err.println("Error al obtener el token: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean isTokenExpired(){
        if( tokenTTL == null ) return true;
        Duration t = Duration.between(tokenTTL, Instant.now());
        return t.toMinutes() >= 29;
    }
   


}
