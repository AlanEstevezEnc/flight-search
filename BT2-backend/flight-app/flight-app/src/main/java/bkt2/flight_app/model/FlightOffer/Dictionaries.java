package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

import java.util.Map;

@Data
public class Dictionaries {
    private Map<String, LocationInfo> locations;
    private Map<String, String> carriers;
    private Map<String, String> aircraft;
    private Map<String, String> currencies;
}