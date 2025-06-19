package bkt2.flight_app.model.FlightOffer;


import lombok.Data;

@Data
public class AirportSegmentInfo {
    private String iataCode;
    private String at;
    private String terminal;
}