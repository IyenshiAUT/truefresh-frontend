// File: src/components/Products/ProductCard.js
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CartContext } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, openCart } = useContext(CartContext);

  const handleAddToCart = () => {
    console.log("ProductCard - Product being added:", product);
    console.log("ProductCard - All product keys:", Object.keys(product));
    console.log("ProductCard - Product ID:", product.id);
    console.log("ProductCard - Product _id:", product._id);
    console.log("ProductCard - Product productId:", product.productId);
    console.log("ProductCard - Product Name:", product.productName);
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
    openCart();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img
          src={
            product.productImages[0] ||
            `https://via.placeholder.com/400x300?text=${product.productName}`
          }
          alt={product.productName}
          className="w-full h-48 object-cover img-zoom"
        />
        <div className="absolute top-2 left-2 bg-brand-blue/90 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.tag || "Fresh"}
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-neutral-800 truncate">
          {product.productName}
        </h3>
        <p className="text-neutral-500 text-sm mt-1 flex-grow">
          {product.productDescription || "Finest quality produce"}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-brand-green">
            ${(product.productPrice / 100).toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-brand-green-light text-brand-green-dark p-2 rounded-full shadow-sm group-hover:bg-brand-green group-hover:text-white transition-colors duration-300 transform group-hover:scale-110"
            title="Add to Cart"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
