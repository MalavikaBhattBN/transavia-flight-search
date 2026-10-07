import { describe, expect, it } from "vitest";
import { findFlights } from "./flights";
import type { FlightOffer } from "@/types/flight";

const flight: FlightOffer = {
  outboundFlight: {
    id: "AMSFNC20221110HV6629",
    departureDateTime: "2022-11-10T06:25:00",
    arrivalDateTime: "2022-11-10T09:35:00",
    marketingAirline: {
      companyShortName: "HV",
    },
    flightNumber: 6629,
    departureAirport: {
      locationCode: "AMS",
    },
    arrivalAirport: {
      locationCode: "FNC",
    },
  },
  pricingInfoSum: {
    totalPriceAllPassengers: 58.7,
    totalPriceOnePassenger: 58.7,
    baseFare: 29.51,
    taxSurcharge: 29.19,
    currencyCode: "EUR",
    productClass: "Basic",
  },
  deeplink: {
    href: "https://www.transavia.com/nl-NL/bookingtool/flights/deeplink?ds=AMS&as=FNC&ap=1&cp=0&od=10&om=11&oy=2022&utm_source=API&utm_medium=Public GOS",
  },
};

describe("findFlights", () => {
  it("returns a flight matching the origin, destination and departure date", () => {
    const criteria = {
      origin: "AMS",
      destination: "FNC",
      departureDate: "2022-11-10",
    };
    const result = findFlights([flight], criteria);
    expect(result).toEqual([flight]);
  });
  it("returns no flight when the destination does not match", () => {
    const criteria = {
      origin: "AMS",
      destination: "BCN",
      departureDate: "2022-11-10",
    };
    const result = findFlights([flight], criteria);
    expect(result).toEqual([]);
  });
  it("returns no flight when the departure date does not match", () => {
    const criteria = {
      origin: "AMS",
      destination: "BCN",
      departureDate: "2022-12-10",
    };
    const result = findFlights([flight], criteria);
    expect(result).toEqual([]);
  });
});
