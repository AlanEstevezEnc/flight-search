package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

@Data
public class TravelerPrice {
    private String currency;
    private String total;
    private String base;
}
