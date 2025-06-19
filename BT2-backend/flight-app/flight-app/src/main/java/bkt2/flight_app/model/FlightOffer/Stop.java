package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

@Data
public class Stop {
    private String iataCode;
    private String duration;
    private String arrivalAt;
    private String departureAt;
}