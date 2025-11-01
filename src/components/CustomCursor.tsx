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

    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Mise à jour immédiate pour le curseur principal
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation du trail avec lerp pour un effet de trainée fluide
    const animateTrail = () => {
      setTrailPosition((prev) => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        return {
          x: prev.x + dx * 0.15, // Facteur de lissage
          y: prev.y + dy * 0.15,
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
      {/* Effet de trail/trainée */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99997]"
        style={{
          transform: `translate(${trailPosition.x}px, ${trailPosition.y}px)`,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            backgroundColor: isInPortfolio ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: '60px',
            height: '60px',
            filter: 'blur(15px)',
          }}
        />
      </div>

      {/* Cercle externe avec double bordure pour contraste */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: cursorSize,
            height: cursorSize,
            borderColor: isInPortfolio ? '#000000' : '#ffffff',
          }}
          transition={{ 
            width: { type: 'spring', stiffness: 500, damping: 30 },
            height: { type: 'spring', stiffness: 500, damping: 30 },
            borderColor: { duration: 0.3 }
          }}
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            boxShadow: isInPortfolio
              ? isHovering
                ? '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.2)'
                : '0 0 15px rgba(0, 0, 0, 0.3)'
              : isHovering
                ? '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.2)'
                : '0 0 15px rgba(255, 255, 255, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>

      {/* Point central avec double bordure pour contraste */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            backgroundColor: isInPortfolio ? '#000000' : '#ffffff',
            borderColor: isInPortfolio ? '#ffffff' : '#000000',
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: '8px',
            height: '8px',
            border: '2px solid',
            boxShadow: isInPortfolio 
              ? '0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5)' 
              : '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5)',
          }}
        />
      </div>

      {/* Particules périphériques avec double couleur */}
      {isHovering && (
        <>
          {[...Array(4)].map((_, i) => {
            const angle = (i * Math.PI) / 2;
            const distance = 25;
            const particleX = mousePosition.x + Math.cos(angle) * distance * (i % 2 === 0 ? 1 : -1);
            const particleY = mousePosition.y + Math.sin(angle) * distance * (i % 2 === 0 ? 1 : -1);
            
            return (
              <div
                key={i}
                className="pointer-events-none fixed top-0 left-0 z-[99996]"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  willChange: 'transform',
                }}
              >
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.cos(angle) * distance],
                    y: [0, Math.sin(angle) * distance],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      backgroundColor: isInPortfolio ? '#000000' : '#ffffff',
                      borderColor: isInPortfolio ? '#ffffff' : '#000000',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '4px',
                      height: '4px',
                      border: '1px solid',
                      boxShadow: isInPortfolio 
                        ? '0 0 8px rgba(0, 0, 0, 0.8)' 
                        : '0 0 8px rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
