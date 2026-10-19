// src/data/config.js

// Número de WhatsApp centralizado
export const WHATSAPP_NUMBER = "527228418404";

// Construye URL de WhatsApp con mensaje opcional
export const buildWhatsAppUrl = (message = "") => {
  const base = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&type=phone_number&app_absent=0`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
};

// Enlace genérico (sin mensaje predefinido)
export const WHATSAPP_URL = buildWhatsAppUrl();