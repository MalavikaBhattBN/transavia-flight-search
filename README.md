# Transavia Flight Search

A small flight search application built with Next.js and TypeScript as part of the Transavia front-end assignment.

## Features

- Search flights from Amsterdam (Schiphol)
- Select destinations using human-readable airport names
- Search by departure date
- Display matching flight information including:
  - Departure and arrival airports
  - Departure and arrival times
  - Flight number
  - Total price
- Show an empty state when no matching flights are available
- Responsive, Transavia-inspired interface
- Native form validation for required fields and the available date range

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vitest
- React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Testing

Run the test suite:

```bash
npm test
```

The tests cover:

- Flight filtering logic
- Rendering matching flight results
- Rendering the empty state

## Production Build

Create an optimized production build:

```bash
npm run build
```

## Implementation Notes

The application uses the supplied static flight and airport datasets.

Flight filtering is separated from the UI in a pure `findFlights` function, allowing the business logic to be tested independently from the React components.

The search form uses native HTML form semantics and `FormData`. Search results are managed at the page level, while rendering responsibilities are separated into `FlightResults` and `FlightCard` components.

The supplied flight dataset contains departures from Amsterdam between 10 November and 30 November 2022, so the departure date input is constrained to that range.
