import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import CartItemCard from "./CartItemCard";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, auth, coupone } = useAppSelector((store) => store);

  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch user cart when JWT changes
  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [auth.jwt]);

  const handleChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = (apply) => {
    let code = couponCode;

    if (apply === "false") {
      code = cart.cart?.couponCode || "";
    }

    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (coupone.couponApplied || coupone.error) {
      setSnackbarOpen(true);
      setCouponCode("");
    }
  }, [coupone.couponApplied, coupone.error]);

  return (
    <>
      {cart.cart && cart.cart?.cartItems.length !== 0 ? (
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              {cart.cart?.cartItems.map((item) => (
                <CartItemCard key={item._id} item={item} />
              ))}
            </div>

            <div className="col-span-1 text-sm space-y-3">
              {/* Coupon Section */}
              <div className="border rounded-md px-5 py-3 space-y-5">
                <div className="flex gap-3 text-sm items-center">
                  <LocalOfferIcon sx={{ color: teal[600], fontSize: 17 }} />
                  <span>Apply Coupons</span>
                </div>

                {!cart.cart?.couponCode ? (
                  <div className="flex justify-between items-center">
                    <TextField
                      value={couponCode}
                      onChange={handleChange}
                      placeholder="Coupon code"
                      size="small"
                    />
                    <Button
                      onClick={() => handleApplyCoupon("true")}
                      disabled={!couponCode}
                      size="small"
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
                      <span>{cart.cart.couponCode} Applied</span>
                      <IconButton
                        onClick={() => handleApplyCoupon("false")}
                        size="small"
                      >
                        <Close className="text-red-600" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Section */}
              <section className="border rounded-md">
                <PricingCard />
                <div className="p-5">
                  <Button
                    onClick={() => navigate("/checkout/address")}
                    sx={{ py: "11px" }}
                    variant="contained"
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              </section>

              {/* Wishlist Section */}
              <div className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer">
                <span>Add From Wishlist</span>
                <FavoriteIcon sx={{ color: teal[600], fontSize: 21 }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">Hey, it feels so light!</h1>
            <p className="text-gray-500 text-sm">
              There is nothing in your bag, let's add some items.
            </p>
          </div>
          <Button variant="outlined" sx={{ py: "11px" }}>
            Add Item From Wishlist
          </Button>
        </div>
      )}

      {/* Snackbar for coupon feedback */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupone.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupone.error ? coupone.error : "Coupon applied successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
