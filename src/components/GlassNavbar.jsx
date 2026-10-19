// src/components/GlassNavbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMessageCircle, FiShoppingCart } from 'react-icons/fi';
import { WHATSAPP_URL } from '../data/config';
import { useCart } from '../context/useCart';
import styles from '../styles/GlassNavbar.module.css';

export const GlassNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isGallery = location.pathname === '/galeria';
  const isShop = location.pathname === '/tienda';

  const menuVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>

        {/* Logo */}
        <Link to="/" className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <img
              src="/logoe2.svg"
              alt="Enigma Logo"
              className={styles.logoImage}
            />
          </div>
          {/*<span className={styles.logoText}>Enigma Publicidad & Diseño</span>*/}
        </Link>

        {/* Enlaces de Navegación (Desktop) */}
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${!isGallery && !isShop ? styles.active : ''}`}
          >
            Catálogo
          </Link>
          <Link
            to="/tienda"
            className={`${styles.navLink} ${isShop ? styles.active : ''}`}
          >
            Tienda
          </Link>
          <Link
            to="/galeria"
            className={`${styles.navLink} ${isGallery ? styles.active : ''}`}
          >
            Trabajos Realizados
          </Link>
        </div>

        {/* Contenedor de Acciones (Botón WhatsApp + Hamburguesa) */}
        <div className={styles.actionsContainer}>

          {/* Botón Carrito con badge */}
          <button
            className={styles.cartBtn}
            onClick={openDrawer}
            aria-label={`Abrir carrito, ${totalItems} artículos`}
          >
            <FiShoppingCart size={19} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>

          {/* Botón de Contacto */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactBtn}
          >
            {/*<span>¡Contactar!</span>*/}
            <FiMessageCircle size={18} />
          </a>

          {/* Botón de Menú Móvil */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

      </nav>

      {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              to="/"
              className={`${styles.mobileNavLink} ${!isGallery && !isShop ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              to="/tienda"
              className={`${styles.mobileNavLink} ${isShop ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tienda
            </Link>
            <Link
              to="/galeria"
              className={`${styles.mobileNavLink} ${isGallery ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trabajos Realizados
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};