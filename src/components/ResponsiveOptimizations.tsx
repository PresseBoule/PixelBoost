import { useEffect } from 'react';

/**
 * Hook pour optimiser l'expérience mobile
 */
export function useResponsiveOptimizations() {
  useEffect(() => {
    // Désactiver le zoom sur double-tap sur iOS
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Empêcher le pull-to-refresh sur Chrome mobile
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].pageY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].pageY;
      // Si on scrolle vers le haut et qu'on est en haut de la page
      if (y > startY && window.scrollY === 0) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Améliorer les performances sur mobile
    if ('ontouchstart' in window) {
      // Ajouter une classe pour identifier les appareils tactiles
      document.body.classList.add('touch-device');
      
      // Optimiser le rendu
      document.body.style.webkitTapHighlightColor = 'transparent';
    }
    
    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
}

/**
 * Composant vide qui applique les optimisations
 */
export function ResponsiveOptimizations() {
  useResponsiveOptimizations();
  return null;
}
