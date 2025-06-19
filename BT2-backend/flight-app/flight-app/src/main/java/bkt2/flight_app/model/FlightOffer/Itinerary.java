package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.List;

@Data
public class Itinerary {
    private String duration;
    private List<Segment> segments;
}