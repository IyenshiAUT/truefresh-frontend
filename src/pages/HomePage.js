// File: src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const categories = [
  { name: 'Dairy', emoji: '🥛', description: 'Milk, Curd, Ghee & More', link: '/category/dairy', bg: 'bg-blue-100' },
  { name: 'Fish', emoji: '🐟', description: 'Caught Today, Every Day', link: '/category/fish', bg: 'bg-indigo-100' },
  { name: 'Meat', emoji: '🥩', description: 'Farm-Fresh & Custom Cut', link: '/category/meat', bg: 'bg-red-100' },
];

const HomePage = () => {
  return (
    <div>
      <section className="relative bg-neutral-100 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-800 tracking-tight">The Freshest Catch & Harvest,</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-green tracking-tight mt-2">Delivered Today.</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600">
            Connecting you directly with local farmers, fishers, and butchers in Colombo for unparalleled freshness and same-day delivery.
          </p>
          <div className="mt-10">
            <Link to="/category/fish" className="inline-block bg-brand-green text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:-translate-y-1">
              Shop Now <ArrowRightIcon className="inline h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Browse Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link to={cat.link} key={cat.name} className="group block">
                <div className={`p-8 rounded-2xl ${cat.bg} text-center shadow-sm group-hover:shadow-xl transition-shadow duration-300`}>
                  <div className="text-6xl mb-4">{cat.emoji}</div>
                  <h3 className="text-2xl font-bold text-neutral-900">{cat.name}</h3>
                  <p className="text-neutral-600 mt-2">{cat.description}</p>
                  <span className="mt-6 inline-block text-brand-green font-semibold group-hover:underline">Shop {cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;