import React from 'react';

const ProductForm = ({ form, onChange, onSubmit, saving, submitLabel = 'Save' }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description} onChange={onChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input name="category" value={form.category} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <input name="tag" value={form.tag} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input name="imageUrl" value={form.imageUrl} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
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
