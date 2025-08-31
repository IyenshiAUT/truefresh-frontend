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
          sku: p.sku || '',
          productName: p.name || '',
          productDescription: p.description || '',
          brand: p.brand || '',
          productCategory: p.category || '',
          productPrice: p.price ? ((p.price || 0) / 100).toFixed(2) : '',
          productSalePrice: p.salePrice ? (p.salePrice / 100).toFixed(2) : '',
          productImages: Array.isArray(p.images) ? p.images.join('\n') : (p.images || ''),
          currency: p.currency || 'USD',
          stockQuantity: p.stockQuantity || 0,
          productStatus: p.status || 'ACTIVE',
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
      const images = (form.productImages || '')
        .split(/\r?\n/)
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
