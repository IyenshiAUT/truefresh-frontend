import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from '../components/Common/Spinner';

const ProfilePage = () => {
  const { user, loading, updateProfile, deleteAccount } = useContext(AuthContext);
  const [form, setForm] = useState(() => ({ name: user?.name || '', email: user?.email || '' }));
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!user) return null;

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      // simple feedback
      alert('Profile updated');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm('Delete account? This cannot be undone.')) return;
    try {
      await deleteAccount();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-brand-green text-white rounded-md">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
