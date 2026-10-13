// src/components/DetailModal.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageCircle } from 'react-icons/fi';
import { WHATSAPP_URL } from '../data/config'; // <-- Importamos la URL
import styles from '../styles/DetailModal.module.css';

export const DetailModal = ({ product, onClose }) => {

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

            <div className={styles.price}>${product.price} MXN</div>

            <div className={styles.actions}>
              {/* Botón de WhatsApp (Ahora es un enlace <a>) */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsApp}
              >
                <FiMessageCircle size={20} />
                Cotizar
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};