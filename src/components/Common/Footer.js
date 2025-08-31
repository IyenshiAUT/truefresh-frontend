// File: src/components/Common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TrueFresh</h3>
            <p className="text-sm text-neutral-400">Farm-to-table freshness, delivered to your doorstep in Colombo on the same day.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
              <li><Link to="/login" className="hover:text-white">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/dairy" className="hover:text-white">Dairy Products</Link></li>
              <li><Link to="/category/fish" className="hover:text-white">Fresh Fish</Link></li>
              <li><Link to="/category/meat" className="hover:text-white">Quality Meat</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Our Guarantee</h4>
            <p className="text-sm text-neutral-400">✓ 100% Freshness Guarantee</p>
            <p className="text-sm text-neutral-400">✓ Sourced Today, Delivered Today</p>
            <p className="text-sm text-neutral-400">✓ Trusted Cash on Delivery</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm text-neutral-400">Phone: <a href="tel:+94112056789" className="hover:text-white">+94 112 406 789</a></p>
            <p className="text-sm text-neutral-400">Email: <a href="mailto:support@truefresh.lk" className="hover:text-white">support@truefresh.lk</a></p>
            <p className="text-sm text-neutral-400 mt-2">Open: <span className="font-medium text-white">Mon–Sat</span> 7:00 AM — 7:00 PM</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-700 text-center text-sm text-neutral-500">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo192.png" alt="TrueFresh" className="h-8 w-8" />
            <p>&copy; {year} TrueFresh. All Rights Reserved. Built with care in Sri Lanka.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;