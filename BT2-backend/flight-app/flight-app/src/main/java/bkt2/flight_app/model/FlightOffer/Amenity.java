package bkt2.flight_app.model.FlightOffer;

import lombok.Data;

@Data
public class Amenity {
    private String description;
    private boolean isChargeable;
    private String amenityType;
    private AmenityProvider amenityProvider;
}
