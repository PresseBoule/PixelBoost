import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface DecomposingTextProps {
  text: string;
  className?: string;
}

export const DecomposingText = ({ text, className = '' }: DecomposingTextProps) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
}

const CharFilament = ({ char, index, mousePos, containerRef }: CharFilamentProps) => {
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

  // Créer 8 filaments autour de la lettre
  const filaments = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const dist = 15 * intensity;
    
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0.6 - (i * 0.05),
      scale: 1 - (i * 0.08),
      blur: i * 0.3
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

      {/* Filaments de décomposition */}
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
            duration: 0.3,
            ease: "easeOut",
            delay: i * 0.01
          }}
        >
          {char}
        </motion.span>
      ))}

      {/* Filaments supplémentaires plus fins et plus loin */}
      {isDecomposed && [...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const dist = 25 * intensity;
        
        return (
          <motion.span
            key={`outer-${i}`}
            className="absolute inset-0 text-white/30 pointer-events-none"
            style={{
              filter: `blur(${2 + i * 0.5}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.4 * intensity,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: 0.7,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: 0.05 + i * 0.015
            }}
          >
            {char}
          </motion.span>
        );
      })}

      {/* Effet de glow central */}
      {isDecomposed && (
        <motion.span
          className="absolute inset-0 text-white pointer-events-none"
          style={{
            filter: 'blur(4px)',
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 0.5 * intensity,
            scale: 1.2,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      )}

      {/* Particules fines */}
      {isDecomposed && [...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const dist = 20 * intensity;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-[1px] h-[1px] bg-white/70 rounded-full pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.8 * intensity,
              scale: 1,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: i * 0.02
            }}
          />
        );
      })}
    </span>
  );
};
