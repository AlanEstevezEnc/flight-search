package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.List;

@Data
public class TravelerPricing {
    private String travelerId;
    private String travelerType;
    private TravelerPrice price;
    private List<FareDetailsBySegment> fareDetailsBySegment;
}
