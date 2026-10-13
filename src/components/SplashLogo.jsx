// src/components/SplashLogo.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-ocultar después de 1.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0, 
      transition: { type: 'spring', damping: 12, stiffness: 200, delay: 0.2 } 
    },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="blurOverlay"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="splashContainer">
            <div className="splashLogoContainer">
              <motion.div className="splashLogoIcon" variants={logoVariants}>
                <img src="/logoe2.svg" alt="Enigma Logo" className="splashLogoImage" />
              </motion.div>
              <motion.h1 className="splashLogoText" variants={textVariants}>
                Enigma
              </motion.h1>
            </div>
            <motion.p className="splashLoadingText" variants={textVariants}>
              Cargando...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};