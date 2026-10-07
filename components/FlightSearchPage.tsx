"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import flightsData from "@/data/flights-from-AMS.json";
import { findFlights } from "@/lib/flights";

import type { FlightOffer, FlightResponse } from "@/types/flight";
import type { SearchCriteria } from "@/types/search";

const flights = (flightsData as FlightResponse).flightOffer;

export default function FlightSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCriteria: SearchCriteria = {
    origin: searchParams.get("origin") ?? "AMS",
    destination: searchParams.get("destination") ?? "",
    departureDate: searchParams.get("departureDate") ?? "",
  };

  const hasSearchCriteria =
    initialCriteria.destination !== "" && initialCriteria.departureDate !== "";

  const [results, setResults] = useState<FlightOffer[] | null>(() =>
    hasSearchCriteria ? findFlights(flights, initialCriteria) : null,
  );

  function handleSearch(criteria: SearchCriteria) {
    setResults(findFlights(flights, criteria));

    const params = new URLSearchParams({
      origin: criteria.origin,
      destination: criteria.destination,
      departureDate: criteria.departureDate,
    });

    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <section className="bg-[#00b86b] px-4 pb-28 pt-10 sm:pt-14">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Where do you want to go?
            </h1>

            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Search available flights from Amsterdam
            </p>
          </div>
        </section>

        <section className="-mt-20 px-4 pb-12">
          <div className="mx-auto max-w-5xl">
            <FlightSearchForm
              onSearch={handleSearch}
              initialCriteria={initialCriteria}
            />

            {results !== null && <FlightResults flights={results} />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
