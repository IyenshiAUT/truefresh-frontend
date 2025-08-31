// File: src/pages/CheckoutPage.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/axiosConfig';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliverySlot, setDeliverySlot] = useState('');
  const [customCuts, setCustomCuts] = useState('');
  const [address, setAddress] = useState('');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price / 100) * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!deliverySlot || !address) {
      toast.error('Please fill in your address and select a delivery slot.');
      return;
    }

    const orderData = {
      customerId: user.id,
      orderItems: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
      deliveryAddress: address,
      deliverySlot: deliverySlot,
      paymentMethod: 'COD',
      notes: customCuts,
    };

    const loadingToast = toast.loading('Placing your order...');
    try {
      await api.post('/orders', orderData);
      toast.dismiss(loadingToast);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-neutral-900 text-center">Checkout</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          {/* Checkout Form */}
          <section className="lg:col-span-7 bg-white p-8 rounded-lg shadow-md">
            {/* Form similar to Register/Login */}
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-10 lg:mt-0">
            {/* Order summary details */}
          </section>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;