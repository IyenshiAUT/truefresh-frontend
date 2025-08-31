// File: src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    const loadingToast = toast.loading('Creating account...');
    try {
  const username = `${firstName}${lastName ? ' ' + lastName : ''}`;
  await register({ username, firstName, lastName, dateOfBirth, phoneNumber, address, city, state, email, password, role });
      toast.dismiss(loadingToast);
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-neutral-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-green hover:text-brand-green-dark">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            {/* Form Inputs similar to LoginPage */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700">
                Date of birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700">
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-neutral-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-neutral-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-neutral-700">
                Role
              </label>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;