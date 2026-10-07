export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00d66c] text-lg font-bold text-white">
            t
          </div>

          <span className="text-xl font-bold text-gray-900">transavia</span>
        </div>
      </div>
    </header>
  );
}
