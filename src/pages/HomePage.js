// File: src/pages/HomePage.js
import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import heroBg from '../assets/images/hero-fresh-foods.jpg';
import dairyImg from '../assets/images/dairy-category.jpg';
import fishImg from '../assets/images/fish-category.jpg';
import meatImg from '../assets/images/meat-category.jpg';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const categories = [
  { name: 'Dairy', emoji: '🥛', description: 'Milk, Curd, Ghee & More', link: '/category/dairy', img: dairyImg },
  { name: 'Fish', emoji: '🐟', description: 'Caught Today, Every Day', link: '/category/fish', img: fishImg },
  { name: 'Meat', emoji: '🥩', description: 'Farm-Fresh & Custom Cut', link: '/category/meat', img: meatImg },
];

const HomePage = () => {
  const categoriesRef = useRef(null);
  const location = useLocation();

  const scrollToCategories = () => {
    const el = document.getElementById('browse-categories') || categoriesRef.current;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (location.hash === '#browse-categories') {
      // small timeout to allow layout/hero animations to finish
      setTimeout(scrollToCategories, 120);
    }
  }, [location]);

  return (
    <div>
      <section className="relative py-20 md:py-32">
        {/* blurred background image */}
        <div className="absolute inset-0 -z-10">
          <img src={heroBg} alt="Fresh foods background" className="w-full h-full object-cover filter blur-sm opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="TrueFresh logo" className="mx-auto mb-6 h-28 md:h-40 w-auto" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-800 tracking-tight">The Freshest Catch & Harvest,</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-green tracking-tight mt-2">Delivered Today.</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600">
            Connecting you directly with local farmers, fishers, and butchers in Colombo for unparalleled freshness and same-day delivery.
          </p>
          <div className="mt-10">
            <button onClick={scrollToCategories} className="inline-block bg-brand-green text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:-translate-y-1">
              Shop Now <ArrowRightIcon className="inline h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section id="browse-categories" ref={categoriesRef} className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Browse Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link to={cat.link} key={cat.name} className="group block">
                <div className={`rounded-2xl overflow-hidden text-center shadow-sm group-hover:shadow-xl transition-shadow duration-300`}>
                  <div className="h-44 md:h-56 w-full relative">
                    <img src={cat.img} alt={`${cat.name} category`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-neutral-900">{cat.name}</h3>
                    <p className="text-neutral-600 mt-2">{cat.description}</p>
                    <span className="mt-6 inline-block text-brand-green font-semibold group-hover:underline">Shop {cat.name}</span>
                  </div>
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