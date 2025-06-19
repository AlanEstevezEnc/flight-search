//import { SingleValue } from 'react-select';
import { useNavigate, useLocation } from "react-router-dom";
import type { FlightOffer } from "../types/FlightOffer";
//import type { FlightOffer } from "../types/FlightOffer";

function DetailsPage() {
  //const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  //const offers = (location.state as { offers: FlightOffer[] })?.offers;
  const flightDetail = (location.state as { flightDetail: FlightOffer })
    ?.flightDetail;
  const mapData = (location.state as { mapData: Map<string, string> }).mapData;

  console.log(flightDetail);
  console.log(mapData);

  //const [mapData, setMapData] = useState<Map<string, string>>(new Map());
  //const { departureAirport, arrivalAirport } = location.state || {}

  const x =
    parseInt(flightDetail.price.total) - parseInt(flightDetail.price.base);
  const l = flightDetail.price.fees.length;

  const goToSearch = () => {
    navigate("/");
  };

  return (
    <>
      <button className="btn btn-primary" onClick={goToSearch}>
        Return to flight search
      </button>

      <div className="row">
        <div className="col-7">
          {flightDetail.itineraries.map((it, ind) =>
            it.segments.map((segment, index) => (
              <div
                className="FlightItemContainer container border border-secondary"
                key={index}
              >
                <div className="row ">
                  <div className="col-6">
                    <h3>
                      Itinerary {ind + 1} - Segment {index + 1}
                    </h3>
                    <div className="row">
                      <div className="col">
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
                        <p>Flight number {segment.number}</p>
                        <p>Aircraft {segment.aircraft.code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 justify-content-center">
                    <div className="FlightItemContainer border border-secondary-subtle">
                      <h6>Travelers fare details</h6>
                      <p className="mb-0">
                        Cabin:{" "}
                        {
                          flightDetail.travelerPricings[0].fareDetailsBySegment[
                            index
                          ].cabin
                        }
                      </p>
                      <p className="mb-3">
                        Class:{" "}
                        {
                          flightDetail.travelerPricings[0].fareDetailsBySegment[
                            index
                          ].class
                        }
                      </p>
                      <p>Amenities:</p>
                      {flightDetail.travelerPricings[0].fareDetailsBySegment[
                        index
                      ].amenities.map((amen, k) => (
                        <div key={k}>
                          <p className="mb-0">Name: {amen.description}</p>
                          <p>Chargeable: {amen.chargeable ? "Yes" : "No"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-5">
          <div className="FlightItemContainer border border-secondary container">
            <div className="row ">
              <h3>Price breakdown </h3>
              <div className="row">
                <div className="col">
                  <p>Base {flightDetail.price.base}</p>
                  <p className="mb-2">Fees:</p>
                  {flightDetail.price.fees.map((f, k) => (
                    <p key={k} className="mb-2">
                      {f.type}: {x / l}MXN
                    </p>
                  ))}
                  <p className="mb-5" style={{ marginTop: "30px" }}>
                    Total {flightDetail.price.total}
                  </p>

                  <div className="FlightItemContainer border border-secondary-subtle">
                    <p>Per traveler</p>
                    <p>Base {flightDetail.travelerPricings[0].price.base}</p>
                    <p>Total {flightDetail.travelerPricings[0].price.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
