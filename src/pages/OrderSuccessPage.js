// File: src/pages/OrderSuccessPage.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Extract order data from navigation state
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate("/");
      return;
    }

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Handle window resize for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [orderData, navigate]);

  if (!orderData) {
    return null; // Will redirect to home
  }

  // Generate a mock order ID (in real app, this would come from the backend)
  const orderId = `TF${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

  return (
    <div className="bg-neutral-100 min-h-screen relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircleIcon className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Thank you for your order! We've received your order and will prepare
            it with the freshest ingredients.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
              Order Details
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-neutral-700">Order ID:</span>
                <span className="text-green-600 font-semibold">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-neutral-700">
                  Order Date:
                </span>
                <span className="text-neutral-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-neutral-700">
                  Payment Method:
                </span>
                <span className="text-neutral-900">
                  {orderData.paymentMethod}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Items Ordered
              </h3>
              <div className="space-y-3">
                {orderData.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-neutral-100"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-neutral-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">
                        ${((item.unitPrice / 100) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">
                    ${orderData.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Delivery Fee</span>
                  <span className="text-neutral-900">
                    ${orderData.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-green-600">
                    ${orderData.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 flex items-center">
              <TruckIcon className="h-6 w-6 text-blue-600 mr-2" />
              Shipping Details
            </h2>

            <div className="space-y-6">
              {/* Delivery Address */}
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-neutral-500 mt-1" />
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">
                    Delivery Address
                  </h3>
                  <p className="text-neutral-600 whitespace-pre-line">
                    {orderData.shippingAddress}
                  </p>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-neutral-500 mt-1" />
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">
                    Delivery Time
                  </h3>
                  <p className="text-neutral-600">{orderData.deliverySlot}</p>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-1">
                  Estimated Delivery
                </h3>
                <p className="text-blue-700">
                  {estimatedDelivery.toLocaleDateString()} at{" "}
                  {estimatedDelivery.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  We'll deliver fresh to your doorstep!
                </p>
              </div>

              {/* Special Instructions */}
              {orderData.customCuts && (
                <div className="border-t pt-4">
                  <h3 className="font-medium text-neutral-900 mb-2">
                    Special Instructions
                  </h3>
                  <p className="text-neutral-600 bg-neutral-50 p-3 rounded-md">
                    {orderData.customCuts}
                  </p>
                </div>
              )}

              {/* Shipping Method */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-neutral-900 mb-1">
                  Shipping Method
                </h3>
                <p className="text-neutral-600">
                  {orderData.shippingMethod} Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6 text-center">
              What's Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                View Orders
              </button>
              <button
                onClick={() => window.print()}
                className="bg-neutral-600 text-white py-3 px-6 rounded-md hover:bg-neutral-700 transition-colors font-medium"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-neutral-50 rounded-lg p-6 text-center">
            <h4 className="font-semibold text-neutral-900 mb-2">Need Help?</h4>
            <p className="text-neutral-600 mb-4">
              If you have any questions about your order, feel free to contact
              us.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="tel:+1234567890"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                📞 Call Support
              </a>
              <a
                href="mailto:support@truefresh.com"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
