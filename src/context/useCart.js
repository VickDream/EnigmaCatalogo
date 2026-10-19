// src/context/useCart.js
import { useContext } from 'react';
import { CartContext } from './CartContextBase';

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};
