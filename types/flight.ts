export type OutboundFlight = {
  id: string;
  departureDateTime: string;
  arrivalDateTime: string;
  marketingAirline: {
    companyShortName: string;
  };
  flightNumber: number;
  departureAirport: {
    locationCode: string;
  };
  arrivalAirport: {
    locationCode: string;
  };
};

export type PricingInfo = {
  totalPriceAllPassengers: number;
  totalPriceOnePassenger: number;
  baseFare: number;
  taxSurcharge: number;
  currencyCode: string;
  productClass: string;
};

export type Deeplink = {
  href: string;
};

export type FlightOffer = {
  outboundFlight: OutboundFlight;
  pricingInfoSum: PricingInfo;
  deeplink: Deeplink;
};

export type FlightResponse = {
  resultSet: {
    count: number;
  };
  flightOffer: FlightOffer[];
};
