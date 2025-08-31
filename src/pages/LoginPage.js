// File: src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Signing in...');
    try {
      await login(email, password);
      toast.dismiss(loadingToast);
      toast.success('Welcome back!');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-neutral-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Or{' '}
            <Link to="/register" className="font-medium text-brand-green hover:text-brand-green-dark">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-brand-green focus:border-brand-green focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-brand-green focus:border-brand-green focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;