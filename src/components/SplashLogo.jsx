// src/components/SplashLogo.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/SplashLogo.module.css';

const MIN_SPLASH_MS = 1200;

export const SplashLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    // Esperamos a que la página TERMINÉ de cargar (imágenes, fuentes, CSS).
    // Así siempre hay contenido real detrás del blur,
    // tanto en local como en producción (Cloudflare).
    const handleReady = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      setTimeout(() => setIsVisible(false), remaining);
    };

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady, { once: true });
      // Fallback de seguridad: máximo 4s aunque algo tarde en cargar
      const fallback = setTimeout(() => setIsVisible(false), 4000);
      return () => {
        window.removeEventListener('load', handleReady);
        clearTimeout(fallback);
      };
    }

    return undefined;
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
        delay: 0.2,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.5 },
    },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.blurOverlay}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.splashContainer}>
            <div className={styles.logoContainer}>
              <motion.div
                className={styles.logoIcon}
                variants={logoVariants}
              >
                <img
                  src="/logoe2.svg"
                  alt="Enigma Logo"
                  className={styles.logoImage}
                />
              </motion.div>

              <motion.h1
                className={styles.logoText}
                variants={textVariants}
              >
                Enigma
              </motion.h1>
            </div>

            <motion.p
              className={styles.loadingText}
              variants={textVariants}
            >
              Cargando...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
