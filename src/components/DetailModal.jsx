// src/components/DetailModal.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageCircle, FiShoppingCart } from 'react-icons/fi';
import { buildWhatsAppUrl } from '../data/config';
import { useCart } from '../context/useCart';
import styles from '../styles/DetailModal.module.css';

export const DetailModal = ({ product, onClose }) => {
  const { addItem } = useCart();

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className={styles.modalContainer}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de Cerrar */}
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX size={24} />
          </button>

          {/* Columna Izquierda: Imagen */}
          <div className={styles.imageSection}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
          </div>

          {/* Columna Derecha: Información */}
          <div className={styles.infoSection}>
            <span className={styles.category}>{product.category}</span>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.price}>Desde ${product.price} MXN</div>

            <div className={styles.actions}>
              {/* Agregar al carrito */}
              <button
                className={styles.btnCart}
                onClick={() => {
                  addItem(product);
                  onClose();
                }}
              >
                <FiShoppingCart size={20} />
                Agregar al carrito
              </button>

              {/* Botón de WhatsApp con mensaje contextual */}
              <a
                href={buildWhatsAppUrl(
                  `¡Hola! Me interesa cotizar: ${product.name} (${product.category})`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsApp}
              >
                <FiMessageCircle size={20} />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};