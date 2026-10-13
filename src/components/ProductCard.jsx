// src/components/ProductCard.jsx
import React from 'react';
import styles from '../styles/ProductCard.module.css';

export const ProductCard = ({ product, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(product)}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </div>
    </div>
  );
};