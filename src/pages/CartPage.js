// src/pages/CartPage.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + ((item.productPrice || item.price) / 100) * item.quantity,
    0
  );

  return (
    <div className="container cart-page">
      <h1 className="page-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.productName || item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Price: $
                    {((item.productPrice || item.price) / 100).toFixed(2)}
                  </p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button
              className="btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
