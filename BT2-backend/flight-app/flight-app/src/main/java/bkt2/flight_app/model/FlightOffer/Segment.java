package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.List;

@Data
public class Segment {
    private AirportSegmentInfo departure;
    private AirportSegmentInfo arrival;
    private String carrierCode;
    private String duration;
    private String id;
    private int numberOfStops;
    private String number;
    private List<Stop> stops;
    private Operating operating;
    private Aircraft aircraft;
}