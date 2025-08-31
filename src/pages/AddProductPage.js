import React, { useState } from 'react';
import api from '../api/axiosConfig';
import ProductForm from '../components/Products/ProductForm';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', tag: '', imageUrl: '' });
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
      const payload = { ...form, price: Math.round(parseFloat(form.price || 0) * 100) };
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
