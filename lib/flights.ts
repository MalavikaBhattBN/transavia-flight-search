import type { FlightOffer } from "@/types/flight";
import type { SearchCriteria } from "@/types/search";

export function findFlights(
  flights: FlightOffer[],
  criteria: SearchCriteria,
): FlightOffer[] {
  return flights.filter((flight) => {
    const flightDepartureDate =
      flight.outboundFlight.departureDateTime.split("T")[0];
    return (
      flight.outboundFlight.departureAirport.locationCode === criteria.origin &&
      flight.outboundFlight.arrivalAirport.locationCode ===
        criteria.destination &&
      flightDepartureDate === criteria.departureDate
    );
  });
}
