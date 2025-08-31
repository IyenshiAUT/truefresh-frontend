import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import ProductForm from '../components/Products/ProductForm';
import Spinner from '../components/Common/Spinner';

const EditProductPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setForm({
          name: p.name || '',
          description: p.description || '',
          price: ((p.price || 0) / 100).toFixed(2),
          category: p.category || '',
          tag: p.tag || '',
          imageUrl: p.imageUrl || ''
        });
      } catch (err) {
        console.error(err);
        alert('Could not load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Math.round(parseFloat(form.price || 0) * 100) };
      await api.put(`/products/${id}`, payload);
      navigate('/category/' + (form.category || 'all'));
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (!form) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <ProductForm form={form} onChange={onChange} onSubmit={onSubmit} saving={saving} submitLabel="Update Product" />
    </div>
  );
};

export default EditProductPage;
