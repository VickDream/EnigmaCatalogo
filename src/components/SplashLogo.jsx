// src/components/SplashLogo.jsx
import { motion } from 'framer-motion';
import styles from '../styles/SplashLogo.module.css';

export const SplashLogo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
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
        delay: 0.2
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className={styles.splashContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.logoContainer}>
        {/* Logo con gradiente y SVG */}
        <motion.div
          className={styles.logoIcon}
          variants={logoVariants}
        >
          {/* Aquí va tu SVG desde /public */}
          <img
            src="/logoe2.svg"
            alt="Enigma Logo"
            className={styles.logoImage}
          />
        </motion.div>

        {/* Texto del Logo */}
        <motion.h1
          className={styles.logoText}
          variants={textVariants}
        >
          Enigma
        </motion.h1>
      </div>

      {/* Texto de carga */}
      <motion.p
        className={styles.loadingText}
        variants={textVariants}
      >
        Cargando...
      </motion.p>
    </motion.div>
  );
};