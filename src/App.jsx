import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { products } from './data/products';
import { galleryItems } from './data/gallery';

// --- IMPORTS DE COMPONENTES NUEVOS ---
import { GlassNavbar } from './components/GlassNavbar';
import { BentoGrid } from './components/BentoGrid';
import { DetailModal } from './components/DetailModal';
import { PortfolioGrid } from './components/PortfolioGrid';
import { SplashLogo } from './components/SplashLogo';

import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Carga inicial (simulada)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Transición de rutas
  useEffect(() => {
    if (isLoading) return;
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, isLoading]);

  // Lógica de redirección a galería (por si se necesita a futuro)
  const handleShowGallery = (product) => {
    setSelectedProduct(null);
    const rawCategory = product.category ? product.category.toLowerCase().trim() : '';
    let targetCategory = 'Promocionales';

    if (rawCategory.includes('dtf uv')) targetCategory = 'Termos y Tazas';
    else if (rawCategory.includes('textil') || rawCategory.includes('camisa') || rawCategory.includes('ropa')) targetCategory = 'Textil';
    else if (rawCategory.includes('termo') || rawCategory.includes('taza')) targetCategory = 'Termos y Tazas';
    else if (rawCategory.includes('etiqueta') || rawCategory.includes('sticker') || rawCategory.includes('papel')) targetCategory = 'Etiquetas y Papelería';

    navigate('/galeria', { state: { category: targetCategory } });
  };

  return (
    <>
      {/* --- FONDO ANIMADO CMYK --- */}
      <div className="app-background">
        <div className="bg-yellow-blob"></div>
      </div>

      {/* --- SPLASH LOGO --- */}
      {/* La key basada en la ruta fuerza el remontaje en cada navegación */}
      <AnimatePresence mode="wait">
        <SplashLogo key={location.pathname} />
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <GlassNavbar />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="mainContainer">
        <Routes>
          {/* --- RUTA DEL CATÁLOGO --- */}
          <Route path="/" element={
            <>
              <header className="headerSection">
                <div className="headerCard">
                  <span className="headerBadge">Catálogo 2026</span>
                  <h1 className="mainTitle">
                    Enigma <span className="titleAccent">Publicidad</span> & Diseño
                  </h1>
                  <p className="mainSubtitle">
                    Soluciones de impresión y artículos personalizados • Venta exclusiva por mayoreo y tirajes especiales para eventos
                  </p>
                </div>
              </header>

              <BentoGrid
                products={products}
                onSelectProduct={(product) => setSelectedProduct(product)}
              />

              <DetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            </>
          } />

          {/* --- RUTA DE GALERÍA --- */}
          <Route path="/galeria" element={
            <PortfolioGrid
              items={galleryItems}
              onBackHome={() => navigate('/')}
            />
          } />
        </Routes>
      </main>
    </>
  );
}