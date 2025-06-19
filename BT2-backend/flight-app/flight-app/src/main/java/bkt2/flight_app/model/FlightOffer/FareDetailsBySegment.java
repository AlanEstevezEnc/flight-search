package bkt2.flight_app.model.FlightOffer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    private String brandedFareLabel;
    private String fareBasis;
    private String brandedFare;
    private String cabinClass; // avoid clash with `class`
    private IncludedBags includedCheckedBags;
    private IncludedBags includedCabinBags;
    private List<Amenity> amenities;

    @JsonProperty("class")
    public void setCabinClass(String cabinClass) {
        this.cabinClass = cabinClass;
    }
}