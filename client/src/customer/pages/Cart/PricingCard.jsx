import { Divider } from "@mui/material";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/cartCalculator";

const PricingCard = () => {
  const { cart } = useAppSelector((store) => store);

  const cartItems = cart.cart?.cartItems || [];
  const subtotal = sumCartItemMrpPrice(cartItems);
  const totalSelling = sumCartItemSellingPrice(cartItems);
  const discount = subtotal - totalSelling;
  const shipping = 79; // Fixed for now, can be dynamic later
  const total = totalSelling + shipping;

  return (
    <div className="border rounded-md">
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>₹ {subtotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>₹ {discount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>₹ {shipping}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform Fee</span>
          <span className="text-teal-600">Free</span>
        </div>
      </div>

      <Divider />

      <div className="font-medium px-5 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>₹ {total}</span>
      </div>
    </div>
  );
};

export default PricingCard;
