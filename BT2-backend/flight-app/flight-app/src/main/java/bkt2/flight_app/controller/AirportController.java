package bkt2.flight_app.controller;

import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping("/api/airport")
    public ResponseEntity<List<AirportInfo>> getAirport(@RequestParam String keyword) {

        List<AirportInfo> airports = airportService.getAirport(keyword);
        return ResponseEntity.ok(airports);
    }




}
