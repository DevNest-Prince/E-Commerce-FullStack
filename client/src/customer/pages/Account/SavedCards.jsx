import AddCardIcon from "@mui/icons-material/AddCard";
import { teal } from "@mui/material/colors";

const SavedCards = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-[60vh] gap-6">

      {/* Icon */}
      <AddCardIcon sx={{ color: teal[400], fontSize: "140px" }} />

      {/* Info Text */}
      <div className="space-y-3 max-w-xl px-5">
        <h1 className="font-bold text-lg text-gray-900">
          SAVE YOUR CREDIT/DEBIT CARDS DURING PAYMENT
        </h1>

        <p className="text-gray-600 leading-relaxed">
          It's convenient to pay with saved cards. Your card information will remain secure — we use
          <span className="font-medium"> 128-bit encryption</span> to protect your data.
        </p>
      </div>
    </div>
  );
};

export default SavedCards;
