package bkt2.flight_app.controller;

import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.model.FlightOffer.FlightOffer;
import bkt2.flight_app.service.AirportService;
import bkt2.flight_app.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
public class FlightsController {

    @Autowired
    private FlightService flightService;

    @GetMapping("/api/flights")
    public ResponseEntity<List<FlightOffer>> getFlight(@RequestParam String originLocationCode, @RequestParam String destinationLocationCode
    , @RequestParam String departureDate, @RequestParam(required = false) String returnDate, @RequestParam int adults, @RequestParam(required = false) String currency) {

        List<FlightOffer> flights = flightService.getFlight(originLocationCode,destinationLocationCode,departureDate,returnDate,adults,currency);
        return ResponseEntity.ok(flights);
    }




}