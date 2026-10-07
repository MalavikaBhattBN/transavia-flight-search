import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import FlightSearchPage from "@/components/FlightSearchPage";

const replaceMock = vi.fn();

let searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => searchParams,
}));

describe("FlightSearchPage", () => {
  beforeEach(() => {
    replaceMock.mockClear();
    searchParams = new URLSearchParams();
  });

  afterEach(() => {
    cleanup();
  });

  it("restores search criteria and results from the URL", () => {
    searchParams = new URLSearchParams({
      origin: "AMS",
      destination: "ALC",
      departureDate: "2022-11-12",
    });

    render(<FlightSearchPage />);

    expect(screen.getByLabelText("From")).toHaveValue("AMS");

    expect(screen.getByLabelText("To")).toHaveValue("ALC");

    expect(screen.getByLabelText("Departure date")).toHaveValue("2022-11-12");

    expect(screen.getByText("2 flights found")).toBeInTheDocument();
  });

  it("updates the URL and displays results when a search is submitted", () => {
    render(<FlightSearchPage />);

    fireEvent.change(screen.getByLabelText("To"), {
      target: {
        value: "ALC",
      },
    });

    fireEvent.change(screen.getByLabelText("Departure date"), {
      target: {
        value: "2022-11-12",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Search flights",
      }),
    );

    expect(replaceMock).toHaveBeenCalledWith(
      "/?origin=AMS&destination=ALC&departureDate=2022-11-12",
      {
        scroll: false,
      },
    );

    expect(screen.getByText("2 flights found")).toBeInTheDocument();
  });
});
