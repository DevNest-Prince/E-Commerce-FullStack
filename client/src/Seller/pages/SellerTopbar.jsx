export default function SellerTopbar() {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
          aria-label="toggle-menu"
        >
          ☰
        </button>
        <h2 className="text-xl font-semibold">Seller Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Go to Store</button>
        <img
          src="https://i.pravatar.cc/40"
          alt="seller"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  )
}
