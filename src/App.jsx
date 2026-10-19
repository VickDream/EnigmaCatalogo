import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { products } from './data/products';
import { galleryItems } from './data/gallery';

// --- IMPORTS DE COMPONENTES NUEVOS ---
import { GlassNavbar } from './components/GlassNavbar';
import { BentoGrid } from './components/BentoGrid';
import { DetailModal } from './components/DetailModal';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ShopPage } from './pages/ShopPage';
import { SplashLogo } from './components/SplashLogo';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  return (
    <>
      {/* --- FONDO ANIMADO CMYK --- */}
      <div className="app-background">
        <div className="bg-yellow-blob"></div>
      </div>

      {/* --- SPLASH LOGO --- */}
      {/* Se muestra SOLO en la primera carga; no se repite en navegaciones internas */}
      <SplashLogo />

      {/* --- NAVBAR --- */}
      <GlassNavbar />

      {/* --- CARRITO / CHECKOUT (globales, fuera de rutas) --- */}
      <CartDrawer />
      <CheckoutModal />

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

          {/* --- RUTA DE TIENDA --- */}
          <Route path="/tienda" element={
            <ShopPage
              onBackHome={() => navigate('/')}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />
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