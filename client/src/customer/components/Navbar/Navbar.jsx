import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import DrawerList from "./DrawerList";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";

import { useAppSelector } from "../../../Redux Toolkit/Store";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user, cart } = useAppSelector((store) => store);
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-[70px] px-5 lg:px-20 border-b bg-white">

        {/* LEFT — LOGO + MENU BUTTON */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <IconButton className="lg:hidden" onClick={() => setOpenDrawer(true)}>
            <MenuIcon className="text-gray-700" />
          </IconButton>

          {/* LOGO */}
          <h1
            className="text-xl lg:text-2xl font-bold text-[#00927c] cursor-pointer"
            onClick={() => navigate("/")}
          >
            Zosh Bazaar
          </h1>
        </div>

        {/* DESKTOP CATEGORY MENU */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          {mainCategory.map((cat) => (
            <li
              key={cat.name}
              onMouseEnter={() => {
                setSelectedCategory(cat.categoryId);
                setShowSheet(true);
              }}
              onMouseLeave={() => setShowSheet(false)}
              className="cursor-pointer hover:text-[#00927c] hover:border-b-2 border-[#00927c] px-3 py-2"
            >
              {cat.name}
            </li>
          ))}
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" />
          </IconButton>

          {/* USER LOGIN / PROFILE */}
          {user.user ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/account/orders")}
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden lg:block font-semibold">
                {user.user.fullName.split(" ")[0]}
              </span>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-[#00927c] text-white px-4 py-1 rounded-md"
            >
              <AccountCircleIcon />
              Login
            </button>
          )}

          {/* WISHLIST */}
          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorder className="text-gray-700" />
          </IconButton>

          {/* CART */}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              badgeContent={cart.cart?.cartItems.length}
              color="primary"
            >
              <AddShoppingCartIcon className="text-gray-700" />
            </Badge>
          </IconButton>

          {/* BECOME SELLER */}
          <button
            className="hidden lg:flex items-center gap-2 border px-4 py-1 rounded-md"
            onClick={() => navigate("/become-seller")}
          >
            <StorefrontIcon />
            Become Seller
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerList toggleDrawer={setOpenDrawer} />
      </Drawer>

      {/* CATEGORY DROPDOWN */}
      {showSheet && (
        <div
          className="absolute top-[70px] left-20 right-20"
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
        >
          <CategorySheet selectedCategory={selectedCategory} setShowSheet={setShowSheet} />
        </div>
      )}
    </div>
  );
};

export default Navbar;


