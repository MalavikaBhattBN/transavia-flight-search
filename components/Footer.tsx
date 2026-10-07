export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-sm font-medium text-gray-700">
          Flight search assignment
        </p>

        <p className="text-xs text-gray-500">
          Demo data includes flights from 10–30 November 2022.
        </p>
      </div>
    </footer>
  );
}
