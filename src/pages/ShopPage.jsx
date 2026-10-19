// src/pages/ShopPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/useCart';
import styles from '../styles/ShopPage.module.css';

const currency = (n) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 });

export const ShopPage = ({ onBackHome, onSelectProduct }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const { addItem } = useCart();

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeFilter === 'Todos'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div className={styles.shopContainer}>
      <button className={styles.backBtn} onClick={onBackHome}>
        <FiArrowLeft size={18} /> Volver al Catálogo
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Nuestra <span className={styles.titleAccent}>Tienda</span>
        </h1>
        <p className={styles.subtitle}>
          Todo el catálogo disponible con precios por mayoreo. Agrega piezas al carrito y cotiza o ordena directo por WhatsApp.
        </p>
      </header>

      <div className={styles.filters}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div
          className={styles.grid}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className={styles.shopCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              layout
              onClick={() => onSelectProduct && onSelectProduct(product)}
            >
              <div className={styles.imageWrap}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  loading="lazy"
                />
                <span className={styles.categoryTag}>{product.category}</span>
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{currency(product.price)}</span>
                  <span className={styles.priceNote}>c/u · mayoreo</span>
                </div>
                <button
                  className={styles.addBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product);
                  }}
                >
                  <FiShoppingCart size={16} /> Agregar al carrito
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className={styles.emptyState}>
          No hay productos en esta categoría todavía.
        </div>
      )}
    </div>
  );
};
