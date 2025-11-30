import React from "react";

function AddProduct() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Add New Product</h1>

      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 shadow rounded-xl border">

        <div>
          <label className="font-medium">Product Title</label>
          <input className="w-full mt-2 p-3 border rounded-xl" type="text" />
        </div>

        <div>
          <label className="font-medium">Brand</label>
          <input className="w-full mt-2 p-3 border rounded-xl" type="text" />
        </div>

        <div>
          <label className="font-medium">MRP</label>
          <input className="w-full mt-2 p-3 border rounded-xl" type="number" />
        </div>

        <div>
          <label className="font-medium">Selling Price</label>
          <input className="w-full mt-2 p-3 border rounded-xl" type="number" />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Description</label>
          <textarea className="w-full mt-2 p-3 border rounded-xl h-32" />
        </div>

        <div>
          <label className="font-medium">Upload Images</label>
          <input className="w-full mt-2 p-3 border rounded-xl" type="file" multiple />
        </div>

        <button className="col-span-2 bg-blue-600 text-white p-3 rounded-xl font-semibold">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
