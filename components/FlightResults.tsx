import FlightCard from "@/components/FlightCard";
import type { FlightOffer } from "@/types/flight";

type FlightResultsProps = {
  flights: FlightOffer[];
};

export default function FlightResults({ flights }: FlightResultsProps) {
  if (flights.length === 0) {
    return (
      <div
        className="mt-6 rounded-xl bg-white p-6 text-gray-700 shadow-sm"
        role="status"
      >
        No flights found for your search.
      </div>
    );
  }

  return (
    <section className="mt-8" aria-live="polite">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {flights.length} {flights.length === 1 ? "flight" : "flights"} found
      </h2>

      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.outboundFlight.id} flight={flight} />
        ))}
      </div>
    </section>
  );
}
