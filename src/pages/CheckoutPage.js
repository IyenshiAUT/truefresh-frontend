// File: src/pages/CheckoutPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/axiosConfig";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliverySlot, setDeliverySlot] = useState("");
  const [customCuts, setCustomCuts] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + ((item.productPrice || item.price) / 100) * item.quantity,
    0
  );
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!deliverySlot || !address) {
      toast.error("Please fill in your address and select a delivery slot.");
      return;
    }

    const orderData = {
      customerId: userId,
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.productPrice || item.price,
      })),
      shippingAddress: address,
      shippingMethod: "Standard",
      paymentMethod: "COD",
      deliverySlot: deliverySlot,
      customCuts: customCuts,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
    };

    const dataFroApi = {
      customerId: userId,
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.productPrice || item.price,
      })),
      shippingAddress: address,
      shippingMethod: "Standard",
      paymentMethod: "COD",
    };

    const loadingToast = toast.loading("Placing your order...");
    try {
      await api.post("/orders", dataFroApi);
      toast.dismiss(loadingToast);
      toast.success("Order placed successfully!");
      clearCart();
      // Navigate to success page with order data
      navigate("/order-success", { state: { orderData } });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-neutral-900">
              Nothing to checkout
            </h1>
            <p className="mt-4 text-neutral-600">
              Your cart is empty. Add some items to your cart before proceeding
              to checkout.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-neutral-900 text-center">
          Checkout
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          {/* Checkout Form */}
          <section className="lg:col-span-7 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Delivery Information
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full delivery address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="deliverySlot"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Delivery Time Slot *
                </label>
                <select
                  id="deliverySlot"
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a time slot</option>
                  <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">
                    10:00 AM - 12:00 PM
                  </option>
                  <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                  <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                  <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="customCuts"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="customCuts"
                  rows={3}
                  value={customCuts}
                  onChange={(e) => setCustomCuts(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Any special cutting instructions or notes for your order"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">
                  Payment Method
                </h3>
                <div className="bg-neutral-50 p-4 rounded-md">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      type="radio"
                      checked={true}
                      readOnly
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-neutral-300"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-3 block text-sm font-medium text-neutral-700"
                    >
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Pay when your order is delivered
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Place Order
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-neutral-200"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900">
                        {item.productName || item.name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">
                      $
                      {(
                        ((item.productPrice || item.price) / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Delivery Fee</span>
                  <span className="text-neutral-900">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-neutral-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 text-sm text-neutral-500">
                <p>Items: {cartItems.length}</p>
                <p>Estimated delivery: 1-2 hours</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
