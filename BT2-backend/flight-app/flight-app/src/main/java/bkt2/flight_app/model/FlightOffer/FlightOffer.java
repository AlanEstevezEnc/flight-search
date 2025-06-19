package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.List;

@Data
public class FlightOffer {

    private String id;
    private List<Itinerary> itineraries;
    private Price price;
    private List<TravelerPricing> travelerPricings;

}
