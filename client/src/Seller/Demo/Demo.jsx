import React from "react";
import "./Demo.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Demo = () => {
  const cards = [
    { amount: "$203k", label: "Total Income" },
    { amount: "$45k", label: "Today's Revenue" },
    { amount: "1,203", label: "Orders" },
    { amount: "93%", label: "Performance" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="metric-card col-span-4 md:col-span-2 lg:col-span-1 flex gap-5 items-center p-5 h-[90px]"
        >
          <div className="rounded-md p-2 bg-[#000025]">
            <AccountBalanceIcon />
          </div>

          <div>
            <p className="font-bold text-xl">{card.amount}</p>
            <p className="font-medium text-sm opacity-90">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Demo;
