// File: src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import ProductCard from '../components/Products/ProductCard';
import Spinner from '../components/Common/Spinner';

const ProductsPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/products');
        const filtered = response.data.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
        setProducts(filtered);
      } catch (err) {
        setError('Could not fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-neutral-800 mb-12 capitalize">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="col-span-full text-center text-neutral-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;