// File: src/components/Common/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartPanel from '../Cart/CartPanel';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartPanel />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;