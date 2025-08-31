import React from 'react';

const ProductForm = ({ form, onChange, onSubmit, saving, submitLabel = 'Save' }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input name="sku" value={form.sku || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input name="brand" value={form.brand || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input name="productName" value={form.productName || form.name || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Description</label>
        <textarea name="productDescription" value={form.productDescription || form.description || ''} onChange={onChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input name="productCategory" value={form.productCategory || form.category || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input name="productPrice" type="number" step="0.01" value={form.productPrice || form.price || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sale Price</label>
          <input name="productSalePrice" type="number" step="0.01" value={form.productSalePrice || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <input name="currency" value={form.currency || 'USD'} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <input name="stockQuantity" type="number" value={form.stockQuantity || ''} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="productStatus" value={form.productStatus || 'ACTIVE'} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="DRAFT">DRAFT</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Images (one URL per line)</label>
        <textarea name="productImages" value={(form.productImages && form.productImages.join ? form.productImages.join('\n') : form.productImages) || form.imageUrl || ''} onChange={onChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        <p className="text-xs text-neutral-500 mt-1">Enter each image URL on a new line.</p>
      </div>

      <div className="flex items-center justify-end space-x-3">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-brand-green text-white rounded-md">
          {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
