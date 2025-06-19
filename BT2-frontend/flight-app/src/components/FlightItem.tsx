//import { SingleValue } from 'react-select';
import { useNavigate, useLocation } from "react-router-dom";
import type { FlightOffer } from "../types/FlightOffer";
import { useEffect, useRef, useState } from "react";

function FlightItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const offers = (location.state as { offers: FlightOffer[] })?.offers;
  //console.log(offers)

  const [visibleOffers, setVisibleOffers] = useState<FlightOffer[]>([]);
  const Size = 5;

  const airportCache = useRef<Record<string, unknown>>({});
  const loadingCodes = useRef<Set<string>>(new Set());
  const [mapData, setMapData] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (offers && offers.length > 0) {
      setVisibleOffers(offers.slice(0, Size));
    }
  }, [offers]);

  const loadMore = () => {
    const currentLength = visibleOffers.length;
    const nextBatch = offers.slice(currentLength, currentLength + Size);
    setVisibleOffers([...visibleOffers, ...nextBatch]);
  };

  useEffect(() => {
    fetchAirportData();
  }, [visibleOffers]);

  const fetchAirportData = async () => {
    const uniqueCodes = new Set<string>();
    const carierCodes = new Set<string>();

    visibleOffers.forEach((offer) => {
      offer.itineraries.forEach((itinerary) => {
        itinerary.segments.forEach((segment) => {
          uniqueCodes.add(segment.departure.iataCode);
          uniqueCodes.add(segment.arrival.iataCode);
          carierCodes.add(segment.carrierCode);
          if (segment.numberOfStops > 0) {
            segment.stops.forEach((stop: { iataCode: string }) => {
              console.log(stop.iataCode);
              uniqueCodes.add(stop.iataCode);
            });
          }
        });
      });
    });

    for (const code of carierCodes) {
      if (mapData.has(code)) continue;

      try {
        const res = await fetch(
          `http://localhost:8080/api/airline?airlineCodes=${code}`
        );
        const data = await res.json();

        //airportCache.current[code] = data;
        const { iataCode, businessName } = data[0];

        setMapData((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.set(iataCode, businessName);
          return newMap;
        });
      } catch (err) {
        console.error(`Error fetching info for ${code}`, err);
      } finally {
        //loadingCodes.current.delete(code);
      }
    }

    for (const code of uniqueCodes) {
      if (mapData.has(code)) continue;

      try {
        const res = await fetch(
          `http://localhost:8080/api/airport?keyword=${code}&subType=AIRPORT`
        );
        const data = await res.json();

        airportCache.current[code] = data;
        const { iataCode, name } = data[0];

        setMapData((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.set(iataCode, name);
          return newMap;
        });
      } catch (err) {
        console.error(`Error fetching info for ${code}`, err);
      } finally {
        loadingCodes.current.delete(code);
      }
    }
  };

  const goToSearch = () => {
    navigate("/");
  };

  const handleDetails = (flightDetail: object) => {
    navigate("/Details", { state: { flightDetail, mapData } });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={goToSearch}>
        Return to search
      </button>

      {visibleOffers.map((elemento, i) =>
        elemento.itineraries.length == 1 ? (
          <>
            <h4>{i + 1} Flight</h4>
            <div
              className="FlightItemContainer container border border-secondary"
              key={elemento.id}
            >
              <div className="row">
                <div className="col-5">
                  {elemento.itineraries[0].segments.map((segment, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <h5>{index + 1} segment</h5>
                        <p>
                          {segment.departure.at.split("T")[0]}{" "}
                          {segment.departure.at.split("T")[1]} -{" "}
                          {segment.arrival.at.split("T")[0]}{" "}
                          {segment.arrival.at.split("T")[1]}
                        </p>
                        <p>
                          {mapData.get(segment.departure.iataCode)} (
                          {segment.departure.iataCode}) -{" "}
                          {mapData.get(segment.arrival.iataCode)} (
                          {segment.arrival.iataCode})
                        </p>
                        <p>
                          {mapData.get(segment.carrierCode)} (
                          {segment.carrierCode})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <p className="mb-0">
                          {elemento.itineraries[0].duration.split("T")[1]}
                        </p>
                      </div>
                      <div className="row">
                        {elemento.itineraries[0].segments.map(
                          (segment, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <p key={index} className="mb-5">
                                  {segment.numberOfStops > 0
                                    ? segment.stops.map(
                                        (
                                          stop: {
                                            iataCode: string;
                                            duration: string;
                                          },
                                          j: any
                                        ) =>
                                          "Stop at " +
                                          mapData.get(stop.iataCode) +
                                          " for " +
                                          stop.duration.split("T")[1]
                                      )
                                    : "No stops"}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="row">
                    <div className="col">
                      <p className="mb-4">
                        ${elemento.price.grandTotal} {elemento.price.currency}{" "}
                        total
                      </p>
                      <p>
                        ${elemento.travelerPricings[0].price.total} per traveler
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleDetails(elemento)}
                  >
                    Show details
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h4>{i + 1} Flight</h4>
            <div className="FullContainer">
              <div className="row">
                <div className="col-9 cocol">
                  {elemento.itineraries.map((it, index) => (
                    <div
                      className={
                        index == 0 ? "ItinerariesContainer itin" : "itin"
                      }
                      key={index}
                    >
                      <div className="row">
                        <div className="col-5">
                          {it.segments.map((segment, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <h5>{index + 1} segment</h5>
                                <p>
                                  {segment.departure.at.split("T")[0]}{" "}
                                  {segment.departure.at.split("T")[1]} -{" "}
                                  {segment.arrival.at.split("T")[0]}{" "}
                                  {segment.arrival.at.split("T")[1]}
                                </p>
                                <p>
                                  {mapData.get(segment.departure.iataCode)} (
                                  {segment.departure.iataCode}) -{" "}
                                  {mapData.get(segment.arrival.iataCode)} (
                                  {segment.arrival.iataCode})
                                </p>
                                <p>
                                  {mapData.get(segment.carrierCode)} (
                                  {segment.carrierCode})
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <p className="mb-0">
                                  {it.duration.split("T")[1]}
                                </p>
                              </div>
                              <div className="row">
                                {it.segments.map((segment, index) => (
                                  <div className="row" key={index}>
                                    <div className="col">
                                      <p key={index} className="mb-5">
                                        {segment.numberOfStops > 0
                                          ? segment.stops.map(
                                              (
                                                stop: {
                                                  iataCode: string;
                                                  duration: string;
                                                },
                                                j: any
                                              ) =>
                                                "Stop at " +
                                                mapData.get(stop.iataCode) +
                                                " for " +
                                                stop.duration.split("T")[1]
                                            )
                                          : "No stops"}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-3 priceContainer">
                  <div className="row">
                    <div className="col">
                      <p className="mb-0">
                        ${elemento.price.grandTotal} {elemento.price.currency}{" "}
                        total
                      </p>
                      <p>
                        ${elemento.travelerPricings[0].price.total} per traveler
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleDetails(elemento)}
                  >
                    Show details
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}

      {visibleOffers.length < offers.length ? (
        <button className="btn btn-primary" onClick={loadMore}>
          Load more flights
        </button>
      ) : null}
    </>
  );
}

export default FlightItem;
