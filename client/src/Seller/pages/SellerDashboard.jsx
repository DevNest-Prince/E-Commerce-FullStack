import React from "react";

function SellerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Seller Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {["Total Orders", "Total Sales", "Products", "Pending Orders"].map(
          (item, i) => (
            <div
              key={i}
              className="p-5 bg-white shadow rounded-xl border flex flex-col"
            >
              <h2 className="text-lg font-medium">{item}</h2>
              <span className="text-3xl mt-4 font-bold text-blue-600">0</span>
            </div>
          )
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow mt-8 p-6 border">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-52 bg-gray-100 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Chart Here</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow mt-8 p-6 border">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <p className="text-gray-500">No recent orders found.</p>
      </div>
    </div>
  );
}

export default SellerDashboard;
