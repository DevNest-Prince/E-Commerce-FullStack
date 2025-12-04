import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED" },
  { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" },
  { name: "Arrived", description: "Delivered", value: "DELIVERED" },
];

const canceledSteps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Canceled", description: "Order was canceled", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus }) => {
  const [statusStep, setStatusStep] = useState(steps);

  const currentStepIndex = statusStep.findIndex((s) => s.value === orderStatus);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledSteps);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="mx-auto my-8">
      {statusStep.map((step, index) => (
        <div
          key={step.value}
          className="flex px-4 py-1"
        >
          {/* LEFT SIDE - STEP INDICATOR */}
          <div className="flex flex-col items-center">
            <Box
              className={`
                w-8 h-8 rounded-full 
                flex items-center justify-center
                ${index <= currentStepIndex
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300 text-gray-600"
                }
              `}
            >
              {index === currentStepIndex ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <FiberManualRecordIcon fontSize="small" />
              )}
            </Box>

            {/* VERTICAL LINE */}
            {index < statusStep.length - 1 && (
              <div
                className={`
                  h-16 w-[2px] 
                  ${index < currentStepIndex ? "bg-teal-500" : "bg-gray-300"}
                `}
              ></div>
            )}
          </div>

          {/* RIGHT SIDE - TEXT */}
          <div className="ml-3 w-full">
            <div
              className={`
                p-2 rounded-md transition
                ${index === currentStepIndex ? "bg-teal-600 text-white" : ""}
                ${orderStatus === "CANCELLED" && step.value === "CANCELLED"
                  ? "bg-red-500 text-white"
                  : ""}
              `}
            >
              <p className="font-medium">{step.name}</p>

              <p
                className={`
                  text-xs
                  ${index === currentStepIndex ? "text-gray-200" : "text-gray-500"}
                `}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default OrderStepper;
