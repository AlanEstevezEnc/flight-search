package bkt2.flight_app.service;


import bkt2.flight_app.manager.TokenManager;
import bkt2.flight_app.model.AirlineInfo;
import bkt2.flight_app.model.AirlineModel;
import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.model.AirportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AirlineService {

    private final String API_URL = "https://test.api.amadeus.com/v1/reference-data/airlines";
    private final TokenManager tkManager;
    private RestTemplate rt;


    @Autowired
    public AirlineService(TokenManager tkManager) {
        this.tkManager = tkManager;
        this.rt = new RestTemplate();
    }

    //@Cacheable(value = "externalApiCache", key = "#keyword")
    public List<AirlineInfo> getAirline(String airlineCodes){
        

        String url = API_URL + "?airlineCodes="+airlineCodes;
        System.out.println(url);
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization","Bearer " + tkManager.getToken());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AirlineModel> response = rt.exchange(
                url,
                HttpMethod.GET,
                entity,
                AirlineModel.class
        );

        if (response.getBody() == null || response.getBody().getData() == null) {
            return List.of();
        }

        return response.getBody().getData();
    }



}
