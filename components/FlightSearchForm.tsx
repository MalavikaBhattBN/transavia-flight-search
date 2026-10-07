"use client";

import airportsData from "@/data/airports.json";
import flightsData from "@/data/flights-from-AMS.json";

import type { Airport } from "@/types/airport";
import type { FlightResponse } from "@/types/flight";
import type { SearchCriteria } from "@/types/search";

type FlightSearchFormProps = {
  onSearch: (criteria: SearchCriteria) => void;
  initialCriteria: SearchCriteria;
};

const flights = (flightsData as FlightResponse).flightOffer;
const airports = airportsData.Airports as Airport[];

export default function FlightSearchForm({
  onSearch,
  initialCriteria,
}: FlightSearchFormProps) {
  const destinationCodes = flights.map(
    (flight) => flight.outboundFlight.arrivalAirport.locationCode,
  );

  const destinations = airports.filter((airport) =>
    destinationCodes.includes(airport.ItemName),
  );

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const origin = formData.get("origin");
    const destination = formData.get("destination");
    const departureDate = formData.get("departureDate");

    if (
      typeof origin !== "string" ||
      typeof destination !== "string" ||
      typeof departureDate !== "string"
    ) {
      return;
    }

    const criteria: SearchCriteria = {
      origin,
      destination,
      departureDate,
    };

    onSearch(criteria);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/10"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label
            htmlFor="origin"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            From
          </label>

          <div className="relative">
            <select
              id="origin"
              name="origin"
              defaultValue={initialCriteria.origin}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3 pr-10 text-gray-900"
            >
              <option value="AMS">Amsterdam (Schiphol)</option>
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              ▾
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="destination"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            To
          </label>

          <div className="relative">
            <select
              id="destination"
              name="destination"
              defaultValue={initialCriteria.destination}
              required
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3 pr-10 text-gray-900"
            >
              <option value="">Select destination</option>

              {destinations.map((destination) => (
                <option key={destination.ItemName} value={destination.ItemName}>
                  {destination.AirportName}
                </option>
              ))}
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              ▾
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="departureDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Departure date
          </label>

          <input
            id="departureDate"
            name="departureDate"
            type="date"
            min="2022-11-10"
            max="2022-11-30"
            defaultValue={initialCriteria.departureDate}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-[#00d66c] px-6 py-3 font-semibold text-gray-900 transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#00d66c] focus:ring-offset-2"
        >
          Search flights
        </button>
      </div>
    </form>
  );
}
