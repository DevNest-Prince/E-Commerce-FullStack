import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Home from "../customer/pages/Home/Home";
import Products from "../customer/pages/Products/Products";
import ProductDetails from "../customer/pages/Products/ProductDetails/ProductDetails";
import Cart from "../customer/pages/Cart/Cart";
import Address from "../customer/pages/Checkout/AddressPage";
import Profile from "../customer/pages/Account/Profile";
import Footer from "../customer/components/Footer/Footer";
import Navbar from "../customer/components/Navbar/Navbar";
import NotFound from "../customer/pages/NotFound/NotFound";
import Auth from "../customer/pages/Auth/Auth";
import PaymentSuccessHandler from "../customer/pages/Pyement/PaymentSuccessHandler";
import Reviews from "../customer/pages/Review/Reviews";
import WriteReviews from "../customer/pages/Review/WriteReview";
import Wishlist from "../customer/pages/Wishlist/Wishlist";
import SearchProducts from "../customer/pages/Search/SearchProducts";

import { useAppDispatch, useAppSelector } from "../Redux Toolkit/Store";
import { fetchUserCart } from "../Redux Toolkit/Customer/CartSlice";
import { getWishlistByUserId } from "../Redux Toolkit/Customer/WishlistSlice";

const CustomerRoutes = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
    dispatch(getWishlistByUserId());
  }, [auth.jwt]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/search-products" element={<SearchProducts />} />

        {/* Reviews */}
        <Route path="/reviews/:productId" element={<Reviews />} />
        <Route
          path="/reviews/:productId/create"
          element={<WriteReviews />}
        />

        {/* Product Details */}
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />

        {/* Cart & Wishlist */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout */}
        <Route path="/checkout/address" element={<Address />} />

        {/* Account */}
        <Route path="/account/*" element={<Profile />} />

        {/* Auth */}
        <Route path="/login" element={<Auth />} />

        {/* Payment Success */}
        <Route
          path="/payment-success/:orderId"
          element={<PaymentSuccessHandler />}
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default CustomerRoutes;
