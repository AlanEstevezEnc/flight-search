package bkt2.flight_app.controller;

import bkt2.flight_app.model.AirlineInfo;
import bkt2.flight_app.model.AirportInfo;
import bkt2.flight_app.service.AirlineService;
import bkt2.flight_app.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AirlineController {

    @Autowired
    private AirlineService airlineService;

    @GetMapping("/api/airline")
    public ResponseEntity<List<AirlineInfo>> getAirport(@RequestParam String airlineCodes) {

        List<AirlineInfo> airLine = airlineService.getAirline(airlineCodes);
        return ResponseEntity.ok(airLine);
    }



}
