import React from "react";

function Performance() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Account Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Order Defect Rate", "Cancellation Rate", "Late Dispatch Rate"].map(
          (item, i) => (
            <div className="p-6 bg-white shadow border rounded-xl" key={i}>
              <h2 className="text-lg font-semibold">{item}</h2>
              <p className="text-3xl mt-4 font-bold text-blue-600">0%</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Performance;
