// File: src/components/Common/Header.js
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const { userId, userName, logout } = useContext(AuthContext);
  const { cartItems, openCart } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) =>
    `text-neutral-600 hover:text-brand-green transition-colors duration-300 ${
      isActive ? "text-brand-green font-semibold" : ""
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="TrueFresh" className="h-14 md:h-16 w-auto" />
            <span className="text-xl md:text-2xl font-bold text-brand-green hidden sm:inline">
              TrueFresh
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/category/dairy" className={navLinkClass}>
              🥛 Dairy
            </NavLink>
            <NavLink to="/category/fish" className={navLinkClass}>
              🐟 Fish
            </NavLink>
            <NavLink to="/category/meat" className={navLinkClass}>
              🥩 Meat
            </NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative text-neutral-600 hover:text-brand-blue transition-colors"
            >
              <ShoppingBagIcon className="h-7 w-7" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {userId ? (
              <div className="flex items-center space-x-2">
                <NavLink to="/products/add" className={navLinkClass}>
                  Add product
                </NavLink>
                <Link to="/profile" className="flex items-center space-x-2">
                  <UserCircleIcon className="h-7 w-7 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700 hidden sm:block">
                    Hi, {userName}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-neutral-600" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-neutral-600 hover:text-brand-green"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-brand-green-dark transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
