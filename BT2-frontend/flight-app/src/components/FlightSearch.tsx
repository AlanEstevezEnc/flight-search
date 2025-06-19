import React, { useRef, useState } from "react";
//import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
//import type { FlightOffer } from '../types/FlightOffer';

/*
type AirportApiItem = {
  iataCode: string;
  name: string;
  offers={offers}
};*/

type AirportOption = {
  value: string;
  label: string;
};

function FlightSearch() {
  //function FlightSearch<F extends (...args: any[]) => Promise<Option[]>>(fn: F, delay: number) {

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [departureAirport, setDepartureAirport] =
    useState<AirportOption | null>(null);
  const [arrivalAirport, setArrivalAirport] = useState<AirportOption | null>(
    null
  );
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [adults, setAdults] = useState("1");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //const [offers, setOffers] = useState<FlightOffer[]>([]);

  const handleSearch = async () => {
    if (departureAirport?.value == arrivalAirport?.value) {
      alert("Please choose a different arrival airport");
      return;
    }
    if (parseInt(adults) <= 0) {
      alert("Please select at least one adult");
      return;
    }
    if (departureDate == null || departureDate == "") {
      alert("Please choose a departure date");
      return;
    }

    setLoading(true);

    try {
      let url = `http://localhost:8080/api/flights?originLocationCode=${
        departureAirport?.value
      }&destinationLocationCode=${
        arrivalAirport?.value
      }&departureDate=${departureDate}&adults=${parseInt(
        adults
      )}&currency=${currency}`;

      if (returnDate) {
        url += `&returnDate=${returnDate}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data == null || data.length == 0 || data.status == 500) {
        alert("No flights");
      } else {
        navigate("/ListFlights", {
          state: {
            offers: data,
            departureAirport,
            arrivalAirport,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching the flights:", error);
    } finally {
      setLoading(false); // Ocultar spinner al terminar
    }
  };

  const departureOptions = (
    inputValue: string,
    callback: (options: AirportOption[]) => void
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetch(
        `http://localhost:8080/api/airport?keyword=${inputValue}&subType=AIRPORT`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const opciones: AirportOption[] = data.map(
            (item: { iataCode: string; name: string }) => ({
              value: item.iataCode,
              label: item.name + " " + item.iataCode,
            })
          );
          callback(opciones);
        })
        .catch((error) => {
          console.error("Error al cargar opciones:", error);
          callback([]);
        });
    }, 500);
  };

  const arrivalOptions = (
    inputValue: string,
    callback: (options: AirportOption[]) => void
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetch(
        `http://localhost:8080/api/airport?keyword=${inputValue}&subType=AIRPORT`
      )
        .then((res) => res.json())
        .then((data) => {
          const opciones: AirportOption[] = data.map(
            (item: { iataCode: string; name: string }) => ({
              value: item.iataCode,
              label: item.name + " " + item.iataCode,
            })
          );
          callback(opciones);
        })
        .catch((error) => {
          console.error("Error al cargar opciones:", error);
          callback([]);
        });
    }, 500);
  };

  return (
    <>
      <form className="searchBox container border">
        <div className="row justify-content-center">
          <div className="row justify-content-center">
            <h1 className="">Flight app</h1>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Departure Airport
            </label>
            <div className="col-sm-4">
              <AsyncSelect
                cacheOptions
                loadOptions={departureOptions}
                defaultOptions
                onChange={(e) => {
                  setDepartureAirport(e);
                }}
                placeholder="Search..."
              ></AsyncSelect>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="selectPriority" className="col-sm-2 col-form-label">
              Arrival Airport
            </label>
            <div className="col-sm-4">
              <AsyncSelect
                cacheOptions
                loadOptions={arrivalOptions}
                defaultOptions
                placeholder="Search..."
                onChange={(e) => {
                  setArrivalAirport(e);
                }}
              ></AsyncSelect>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Departure date
            </label>
            <div className="col-sm-4">
              <div className="row-sm-4">
                <input
                  type="date"
                  id="datePicker"
                  name="due-date"
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Return date
            </label>
            <div className="col-sm-4">
              <div className="row-sm-4">
                <input
                  type="date"
                  id="datePicker"
                  name="due-date"
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="selectPriority" className="col-sm-2 col-form-label">
              Number of adults
            </label>
            <div className="col-sm-4">
              <input
                type="number"
                defaultValue={adults}
                onChange={(e) => {
                  setAdults(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="selectState" className="col-sm-2 col-form-label">
              Currency
            </label>
            <div className="col-sm-4">
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MXN">MXN</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="col-sm-2 ">
            <button
              onClick={handleSearch}
              type="button"
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FlightSearch;
