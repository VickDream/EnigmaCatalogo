// src/components/ProductCard.jsx
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/useCart';
import styles from '../styles/ProductCard.module.css';

export const ProductCard = ({ product, onClick }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita abrir el modal de detalle
    addItem(product);
  };

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

      {/* Botón agregar al carrito */}
      <button
        className={styles.addBtn}
        onClick={handleAddToCart}
        aria-label={`Agregar ${product.name} al carrito`}
      >
        <FiShoppingCart size={16} />
        <span>Agregar</span>
      </button>
    </div>
  );
};