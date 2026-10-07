import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FlightResults from "./FlightResults";
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
    href: "https://example.com",
  },
};

describe("FlightResults", () => {
  it("renders matching flight information", () => {
    render(<FlightResults flights={[flight]} />);

    expect(screen.getByText("1 flight found")).toBeInTheDocument();
    expect(screen.getByText("AMS")).toBeInTheDocument();
    expect(screen.getByText("FNC")).toBeInTheDocument();
    expect(screen.getByText("HV 6629")).toBeInTheDocument();
  });

  it("renders an empty state when there are no flights", () => {
    render(<FlightResults flights={[]} />);

    expect(
      screen.getByText("No flights found for your search."),
    ).toBeInTheDocument();
  });
});
