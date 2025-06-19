package bkt2.flight_app.service;


import bkt2.flight_app.manager.TokenManager;
import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.model.AirportModel;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.logging.Logger;

@Slf4j
@Service
public class AirportService {

    private final String API_URL = "https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT";
    private final TokenManager tkManager;
    private RestTemplate rt;


    @Autowired
    public AirportService(TokenManager tkManager) {
        this.tkManager = tkManager;
        this.rt = new RestTemplate();
    }

    @Cacheable(value = "externalApiCache", key = "#keyword")
    public List<AirportInfo> getAirport(String keyword){
        log.info("Usando Lombok para loggear: {}", keyword);

        String url = API_URL + "&keyword="+keyword;
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization","Bearer " + tkManager.getToken());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AirportModel> response = rt.exchange(
                url,
                HttpMethod.GET,
                entity,
                AirportModel.class
        );

        if (response.getBody() == null || response.getBody().getData() == null) {
            return List.of();
        }

        return response.getBody().getData();
    }




}
