import React, { useState } from 'react';
import api from '../api/axiosConfig';
import ProductForm from '../components/Products/ProductForm';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [form, setForm] = useState({ sku: '', productName: '', productDescription: '', brand: '', productCategory: '', productPrice: '', productSalePrice: '', productImages: '', currency: 'USD', stockQuantity: 0, productStatus: 'ACTIVE' });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // convert dollars to cents if backend expects integer price
      const images = (form.productImages || '')
        .split(/\r?\n/) // split lines
        .map((s) => s.trim())
        .filter(Boolean);
      const payload = {
        sku: form.sku,
        name: form.productName,
        description: form.productDescription,
        brand: form.brand,
        category: form.productCategory,
        price: Math.round(parseFloat(form.productPrice || 0) * 100),
        salePrice: form.productSalePrice ? Math.round(parseFloat(form.productSalePrice) * 100) : undefined,
        images,
        currency: form.currency,
        stockQuantity: form.stockQuantity ? parseInt(form.stockQuantity, 10) : 0,
        status: form.productStatus,
      };
      await api.post('/products', payload);
      navigate('/category/' + (form.category || 'all'));
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
      <ProductForm form={form} onChange={onChange} onSubmit={onSubmit} saving={saving} submitLabel="Add Product" />
    </div>
  );
};

export default AddProductPage;
