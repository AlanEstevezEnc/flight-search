// types.ts (puedes crear este archivo por separado)

export interface FlightOffer {
  id: string;
  itineraries: Itinerary[];
  price: Price;
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  id: string;
  duration: string;
  numberOfStops: number;
  number: string;
  stops: unknown | null;
  carrierCode: string;
  operating: {
    carrierCode: string;
  };
  aircraft: {
    code: string;
  };
  departure: {
    iataCode: string;
    at: string;
    terminal: string | null;
  };
  arrival: {
    iataCode: string;
    at: string;
    terminal: string | null;
  };
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  grandTotal: string;
  fees: Fee[];
  additionalServices: unknown | null;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface TravelerPricing {
  travelerId: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetails[];
}

export interface FareDetails {
  segmentId: string;
  cabin: string;
  brandedFareLabel: string;
  fareBasis: string;
  brandedFare: string;
  includedCheckedBags: {
    quantity: number;
  };
  includedCabinBags: {
    quantity: number;
  };
  amenities: Amenity[];
  class: string;
}

export interface Amenity {
  description: string;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
  chargeable: boolean;
}
