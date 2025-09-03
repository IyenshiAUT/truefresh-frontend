// File: src/contexts/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    console.log("Adding product to cart:", product);
    setCartItems((prevItems) => {
      console.log("Current cart items:", prevItems);

      // Get the actual product ID from various possible fields
      const productId =
        product.id ||
        product._id ||
        product.productId ||
        product.uuid ||
        product.key;
      console.log("Resolved product ID:", productId);

      // If no ID is found, create a unique ID based on product name and other fields
      const uniqueId =
        productId ||
        `${product.productName || product.name}-${
          product.productCategory || product.category
        }-${product.sku || Date.now()}`;
      console.log("Final unique ID:", uniqueId);

      const itemExists = prevItems.find((item) => item.id === uniqueId);
      console.log("Item exists?", itemExists);

      if (itemExists) {
        console.log("Item exists, increasing quantity");
        return prevItems.map((item) =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Normalize product data to ensure consistent field names for cart
      const normalizedProduct = {
        id: uniqueId,
        productName: product.productName || product.name,
        productDescription: product.productDescription || product.description,
        productCategory: product.productCategory || product.category,
        productPrice: product.productPrice || product.price,
        productImages: product.productImages || product.images || [],
        brand: product.brand,
        currency: product.currency,
        stockQuantity: product.stockQuantity,
        sku: product.sku,
        quantity: 1,
      };

      console.log("Adding new item to cart:", normalizedProduct);
      const newCartItems = [...prevItems, normalizedProduct];
      console.log("New cart items:", newCartItems);
      return newCartItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + amount }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity is 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
