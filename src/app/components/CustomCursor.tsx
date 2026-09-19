import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Détecter si c'est un appareil tactile
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
    
    // Si c'est un appareil tactile, ne pas afficher le curseur custom
    if (checkTouchDevice()) {
      return;
    }
    let animationFrameId: number;
    let trailFrameId: number;
    
    // Position cible pour le trail
    let targetX = 0;
    let targetY = 0;
    
    // Throttle pour mousemove - ultra fluide
    let lastTime = 0;
    const throttleDelay = 8; // 120fps max

    const updateMousePosition = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;
      
      setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Mise à jour immédiate pour le curseur principal
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation du trail avec lerp pour un effet de trainée fluide - optimisé
    const animateTrail = () => {
      setTrailPosition((prev) => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        // Arrêter l'animation si le mouvement est négligeable
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return prev;
        }
        return {
          x: prev.x + dx * 0.2, // Augmenté pour plus de réactivité
          y: prev.y + dy * 0.2,
        };
      });
      trailFrameId = requestAnimationFrame(animateTrail);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Détecte si on est dans la section portfolio
      const portfolioSection = target.closest('[data-section="portfolio"]');
      setIsInPortfolio(!!portfolioSection);
      
      // Détecte si on survole un élément cliquable
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    trailFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (trailFrameId) cancelAnimationFrame(trailFrameId);
    };
  }, []);

  // Ne pas afficher sur les appareils tactiles
  if (!isVisible || isTouchDevice) return null;

  const cursorSize = isHovering ? 40 : 20;

  return (
    <>
      {/* Effet de trail/trainée - Ultra optimisé */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99997]"
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0)`,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300"
          style={{
            width: '50px',
            height: '50px',
            filter: 'blur(12px)',
            backgroundColor: isInPortfolio ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
          }}
        />
      </div>

      {/* Cercle externe - Simplifié */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out"
          style={{
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: isInPortfolio ? '#000000' : '#ffffff',
            backgroundColor: 'transparent',
          }}
        />
      </div>

      {/* Point central - Simplifié */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150"
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: isInPortfolio ? '#000000' : '#ffffff',
          }}
        />
      </div>

      {/* Particules périphériques - Supprimées pour optimisation */}
    </>
  );
}
