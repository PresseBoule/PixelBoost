import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface DecomposingTextProps {
  text: string;
  className?: string;
}

export const DecomposingText = ({ text, className = '' }: DecomposingTextProps) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecter mobile et désactiver l'effet
    setIsMobile(window.innerWidth < 768);
    
    // Ne pas ajouter les listeners sur mobile
    if (window.innerWidth < 768) {
      return;
    }

    // Throttle pour ultra performance
    let lastTime = 0;
    const throttleDelay = 16; // 60fps max

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={`inline-block ${className} relative`}>
      {text.split('').map((char, index) => {
        return (
          <CharFilament
            key={index}
            char={char}
            index={index}
            mousePos={mousePos}
            containerRef={containerRef}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
};

interface CharFilamentProps {
  char: string;
  index: number;
  mousePos: { x: number; y: number } | null;
  containerRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
}

const CharFilament = ({ char, index, mousePos, containerRef, isMobile }: CharFilamentProps) => {
  const charRef = useRef<HTMLSpanElement>(null);
  const [charPosition, setCharPosition] = useState<{ x: number; y: number } | null>(null);

  // Calculer la position du caractère une seule fois au montage et quand nécessaire
  useEffect(() => {
    const updatePosition = () => {
      if (!charRef.current || !containerRef.current) return;

      const charRect = charRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
      const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

      setCharPosition({ x: charCenterX, y: charCenterY });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef]);

  // Sur mobile, pas d'effet du tout
  if (isMobile) {
    return <span className="inline-block text-white">{char === ' ' ? '\u00A0' : char}</span>;
  }

  // Calculer la distance et l'intensité
  let distance = 1000;
  let intensity = 0;
  let isDecomposed = false;

  if (mousePos && charPosition) {
    distance = Math.sqrt(
      Math.pow(mousePos.x - charPosition.x, 2) + 
      Math.pow(mousePos.y - charPosition.y, 2)
    );

    const activationRadius = 150;
    isDecomposed = distance < activationRadius;
    intensity = Math.max(0, Math.min(1, 1 - distance / activationRadius));
  }

  // Créer seulement 4 filaments autour de la lettre pour ultra performance
  const filaments = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2;
    const dist = 12 * intensity;
    
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0.5 - (i * 0.08),
      scale: 1 - (i * 0.12),
      blur: i * 0.4
    };
  });

  if (char === ' ') {
    return <span className="inline-block" style={{ width: '0.3em' }}> </span>;
  }

  return (
    <span
      ref={charRef}
      className="relative inline-block"
      style={{ 
        display: 'inline-block',
        position: 'relative'
      }}
    >
      {/* Lettre principale */}
      <motion.span
        className="relative inline-block text-white"
        animate={{
          opacity: isDecomposed ? 0.3 : 1,
          scale: isDecomposed ? 0.95 : 1,
          filter: isDecomposed ? `blur(${intensity * 1}px)` : 'blur(0px)',
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {char}
      </motion.span>

      {/* Filaments de décomposition - Réduits pour performance */}
      {filaments.map((filament, i) => (
        <motion.span
          key={i}
          className="absolute inset-0 text-white pointer-events-none"
          style={{
            filter: `blur(${filament.blur}px)`,
          }}
          animate={{
            opacity: isDecomposed ? filament.opacity * intensity : 0,
            x: isDecomposed ? filament.x : 0,
            y: isDecomposed ? filament.y : 0,
            scale: isDecomposed ? filament.scale : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
