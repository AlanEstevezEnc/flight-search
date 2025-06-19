package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.List;

@Data
public class FlightOfferResponse {
    private List<FlightOffer> data;
    private Dictionaries dictionaries;


}
