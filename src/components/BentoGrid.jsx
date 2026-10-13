// src/components/BentoGrid.jsx
import { ProductCard } from './ProductCard';
import styles from '../styles/BentoGrid.module.css';

export const BentoGrid = ({ products, onSelectProduct }) => {

  // Función para asignar el tamaño de la tarjeta según su posición
  const getCardSize = (index) => {
    // Patrón de diseño: 
    // 0: Grande (2x2)
    // 1: Normal (1x1)
    // 2: Alta (1x2)
    // 3: Normal (1x1)
    // 4: Ancha (2x1)
    // 5: Normal (1x1)
    // ... y se repite o adapta
    const patterns = [
      'cardLarge',   // Índice 0
      'cardNormal',  // Índice 1
      'cardTall',    // Índice 2
      'cardNormal',  // Índice 3
      'cardWide',    // Índice 4
      'cardNormal',  // Índice 5
      'cardNormal',  // Índice 6
      'cardTall',    // Índice 7
    ];

    // Si hay más productos que patrones, se reinicia el patrón
    const patternIndex = index % patterns.length;
    return styles[patterns[patternIndex]];
  };

  return (
    <div className={styles.gridContainer}>
      {products.map((product, index) => (
        <div key={product.id} className={getCardSize(index)}>
          <ProductCard
            product={product}
            onClick={onSelectProduct}
          />
        </div>
      ))}
    </div>
  );
};