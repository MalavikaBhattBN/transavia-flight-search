import type { FlightOffer } from "@/types/flight";

type FlightCardProps = {
  flight: FlightOffer;
};

export default function FlightCard({ flight }: FlightCardProps) {
  const { outboundFlight, pricingInfoSum, deeplink } = flight;

  const departureTime = outboundFlight.departureDateTime
    .split("T")[1]
    .slice(0, 5);

  const arrivalTime = outboundFlight.arrivalDateTime.split("T")[1].slice(0, 5);

  const price = new Intl.NumberFormat("en-NL", {
    style: "currency",
    currency: pricingInfoSum.currencyCode,
  }).format(pricingInfoSum.totalPriceAllPassengers);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex flex-1 items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {outboundFlight.departureAirport.locationCode}
            </p>
            <p className="text-sm text-gray-500">{departureTime}</p>
          </div>

          <div className="flex flex-1 items-center gap-2 text-gray-400">
            <div className="h-px flex-1 bg-gray-300" />
            <span>→</span>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900">
              {outboundFlight.arrivalAirport.locationCode}
            </p>
            <p className="text-sm text-gray-500">{arrivalTime}</p>
          </div>
        </div>

        <div className="flex w-full items-end justify-between sm:w-auto sm:block sm:text-right">
          <p className="text-sm text-gray-500">
            {outboundFlight.marketingAirline.companyShortName}{" "}
            {outboundFlight.flightNumber}
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">{price}</p>

          <a
            href={deeplink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-lg bg-[#00d66c] px-4 py-2 text-sm font-semibold text-gray-900 transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#00d66c] focus:ring-offset-2"
          >
            Select flight
          </a>
        </div>
      </div>
    </article>
  );
}
