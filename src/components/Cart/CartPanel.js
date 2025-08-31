// File: src/components/Cart/CartPanel.js
import React, { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function CartPanel() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price / 100) * item.quantity, 0);

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* ... (Transitions for overlay and panel) ... */}
        {/* The rest of the component JSX, which is quite long, will handle displaying items */}
      </Dialog>
    </Transition.Root>
  )
}