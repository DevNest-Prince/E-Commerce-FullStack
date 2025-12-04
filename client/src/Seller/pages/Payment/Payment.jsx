import { Button, Card, Divider } from "@mui/material";
import { useState } from "react";
import TransactionTable from "./TransactionTable";
import PayoutsTable from "./PayoutsTable";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const tabs = [{ name: "Transaction" }]; 
// If needed, add later → { name: "Payouts" }

const Payment = () => {
  const [activeTab, setActiveTab] = useState("Transaction");
  const { sellers } = useAppSelector((store) => store);

  const handleActiveTab = (item) => {
    setActiveTab(item.name);
  };

  return (
    <div>
      {/* Earnings Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="col-span-1 p-5 rounded-md space-y-4">
          <h1 className="text-gray-600 font-medium">Total Earnings</h1>
          <h1 className="font-bold text-xl pb-1">
            ₹{sellers.report?.totalEarnings || 0}
          </h1>
          <Divider />
          <p className="text-gray-600 font-medium pt-1">
            Last Payment : <strong>₹0</strong>
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-4">
          {tabs.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleActiveTab(item)}
              variant={activeTab === item.name ? "contained" : "outlined"}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-5">
          {activeTab === "Transaction" ? (
            <TransactionTable />
          ) : (
            <PayoutsTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
