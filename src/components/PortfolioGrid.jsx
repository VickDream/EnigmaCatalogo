// src/components/PortfolioGrid.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { LightboxModal } from './LightboxModal';
import styles from '../styles/PortfolioGrid.module.css';

export const PortfolioGrid = ({ items, onBackHome }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState(null); // <-- Estado para el Lightbox

  // Extraer categorías únicas
  const categories = ['Todos', ...new Set(items.map(item => item.category))];

  // Filtrar items
  const filteredItems = activeFilter === 'Todos'
    ? items
    : items.filter(item => item.category === activeFilter);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.portfolioContainer}>

      {/* Botón para volver */}
      <button className={styles.backBtn} onClick={onBackHome}>
        <FiArrowLeft size={18} /> Volver al Catálogo
      </button>

      {/* Encabezado */}
      <header className={styles.header}>
        <h1 className={styles.title}>Nuestros Trabajos Realizados</h1>
        <p className={styles.subtitle}>
          Explora una muestra real de los proyectos que hemos entregado.
        </p>
      </header>

      {/* Filtros */}
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

      {/* Cuadrícula de Imágenes */}
      {filteredItems.length > 0 ? (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className={styles.portfolioItem}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem(item)} // <-- Abrir Lightbox al hacer clic
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className={styles.emptyState}>
          No hay trabajos en esta categoría todavía.
        </div>
      )}

      {/* --- LIGHTBOX MODAL --- */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

    </div>
  );
};