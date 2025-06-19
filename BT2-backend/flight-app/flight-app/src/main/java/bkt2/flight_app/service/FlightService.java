package bkt2.flight_app.service;

import bkt2.flight_app.manager.TokenManager;
import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.model.AirportModel;
import bkt2.flight_app.model.FlightOffer.FlightOffer;
import bkt2.flight_app.model.FlightOffer.FlightOfferResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;


@Service
public class FlightService {

    private final String API_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers?";
    //https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MEX&destinationLocationCode=MUC&departureDate=2025-10-10&adults=2
    private final TokenManager tkManager;
    private RestTemplate rt;

    @Autowired
    public FlightService(TokenManager tkManager) {
        this.tkManager = tkManager;
        this.rt = new RestTemplate();
    }

    public List<FlightOffer> getFlight(String originLocationCode, String destinationLocationCode,
                                       String departureDate, String returnDate, int adults,String currency){

        //String url = API_URL + "&originLocationCode="+originLocationCode+"&destinationLocationCode="+destinationLocationCode+"&departureDate="
          //     +departureDate+"&returnDate="+returnDate+"&adults="+adults+"&currencyCode="+currency;
        String url;


        if(returnDate == null){
             url = API_URL + "&originLocationCode="+originLocationCode+"&destinationLocationCode="+destinationLocationCode+"&departureDate="
                    +departureDate+"&adults="+adults+"&currencyCode="+currency;
        }else{
             url = API_URL + "&originLocationCode="+originLocationCode+"&destinationLocationCode="+destinationLocationCode+"&departureDate="
                    +departureDate+"&returnDate="+returnDate+"&adults="+adults+"&currencyCode="+currency;
        }

        HttpHeaders headers = new HttpHeaders();


        System.out.println("Currency: "+currency);
        System.out.println("Returndfate: "+returnDate);

        headers.set("Authorization","Bearer " + tkManager.getToken());
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<FlightOfferResponse> response = rt.exchange(
                url,
                HttpMethod.GET,
                entity,
                FlightOfferResponse.class
        );

        if (response.getBody() == null || response.getBody().getData() == null) {
            return List.of();
        }

        return response.getBody().getData();
    }




}