// src/components/LightboxModal.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from '../styles/LightboxModal.module.css';

export const LightboxModal = ({ item, onClose }) => {

  // --- BLOQUEAR EL SCROLL DEL FONDO ---
  useEffect(() => {
    // Si hay un item seleccionado, bloqueamos el scroll
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Limpieza: al desmontar el componente, restauramos el scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.9 }
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
          className={styles.imageContainer}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX size={24} />
          </button>

          <img
            src={item.image}
            alt={item.title}
            className={styles.image}
          />

          {item.title && (
            <h3 className={styles.title}>{item.title}</h3>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};