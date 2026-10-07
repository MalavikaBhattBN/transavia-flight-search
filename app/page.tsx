import { Suspense } from "react";

import FlightSearchPage from "@/components/FlightSearchPage";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <FlightSearchPage />
    </Suspense>
  );
}
