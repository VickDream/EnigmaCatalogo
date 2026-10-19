// src/components/CartDrawer.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/useCart';
import styles from '../styles/CartDrawer.module.css';

export const CartDrawer = () => {
  const {
    items,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    openCheckout,
  } = useCart();

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
    exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeDrawer}
          />
          <motion.aside
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.header}>
              <h3 className={styles.title}>
                <FiShoppingCart /> Tu Cotización
              </h3>
              <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Cerrar carrito">
                <FiX size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <FiShoppingCart />
                <p className={styles.emptyText}>Tu carrito está vacío</p>
                <p className={styles.emptyHint}>
                  Agrega productos del catálogo y arma tu pedido. Todo se envía y se concreta por
                  WhatsApp.
                </p>
              </div>
            ) : (
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} loading="lazy" />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemPrice}>${item.price} MXN c/u</p>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Disminuir cantidad"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label="Quitar del carrito"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Total estimado</span>
                  <span className={styles.totalAmount}>${totalPrice.toLocaleString('es-MX')} MXN</span>
                </div>
                <p className={styles.note}>
                  El total es referencial. Precios finales y disponibilidad se confirman por
                  WhatsApp según tiraje.
                </p>
                <button
                  className={styles.checkoutBtn}
                  onClick={() => {
                    closeDrawer();
                    openCheckout();
                  }}
                >
                  Finalizar por WhatsApp
                </button>
                <button className={styles.note} onClick={clearCart} style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
