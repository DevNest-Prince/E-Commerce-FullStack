import React from "react";

function MyProducts() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Products</h1>

      <div className="bg-white shadow rounded-xl border p-4 mt-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyProducts;
