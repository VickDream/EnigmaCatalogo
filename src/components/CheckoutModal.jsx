// src/components/CheckoutModal.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { useCart } from '../context/useCart';
import { buildWhatsAppUrl } from '../data/config';
import styles from '../styles/CheckoutModal.module.css';

export const CheckoutModal = () => {
  const { items, totalPrice, isCheckoutOpen, closeCheckout, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    delivery: 'pickup',
    notes: '',
  });

  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCheckoutOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = items
      .map(
        (i) =>
          `• ${i.quantity} x ${i.name} — $${(i.price * i.quantity).toLocaleString('es-MX')} MXN`
      )
      .join('\n');

    const message = `¡Hola! Quiero hacer este pedido:\n\n${lines}\n\n*Total estimado:* $${totalPrice.toLocaleString('es-MX')} MXN\n\n*Datos de contacto:*\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nEntrega: ${formData.delivery === 'pickup' ? 'Recoger en tienda' : 'Envío a domicilio'}${formData.notes ? `\nNotas: ${formData.notes}` : ''}`;

    window.open(buildWhatsAppUrl(message), '_blank');

    // Pedido enviado: limpiar carrito y cerrar
    clearCart();
    closeCheckout();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && items.length > 0 && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
        >
          <motion.div
            className={styles.modalContainer}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeCheckout} aria-label="Cerrar">
              <FiX size={18} />
            </button>

            <h2 className={styles.title}>Finalizar pedido</h2>
            <p className={styles.subtitle}>
              Completa tus datos y te llevaré a WhatsApp con tu pedido listo para enviar. Sin
              registros ni pagos en línea.
            </p>

            <div className={styles.summary}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toLocaleString('es-MX')}</span>
                </div>
              ))}
              <div className={styles.summaryTotal}>
                <span>Total estimado</span>
                <span>${totalPrice.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="checkout-name">
                  Nombre *
                </label>
                <input
                  id="checkout-name"
                  className={styles.input}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="checkout-phone">
                  Teléfono *
                </label>
                <input
                  id="checkout-phone"
                  className={styles.input}
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <span className={styles.label}>Entrega</span>
                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={formData.delivery === 'pickup'}
                      onChange={handleChange}
                    />
                    Recoger en tienda
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="delivery"
                      value="shipping"
                      checked={formData.delivery === 'shipping'}
                      onChange={handleChange}
                    />
                    Envío a domicilio
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="checkout-notes">
                  Notas (opcional)
                </label>
                <textarea
                  id="checkout-notes"
                  className={styles.textarea}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Personalización, colores, fecha de entrega, tiraje..."
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <FiSend /> Enviar pedido por WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
