import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';

interface Realistic3DLogoProps {
  scrollProgress: any;
}

export function Realistic3DLogo({ scrollProgress }: Realistic3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Valeurs pour le suivi de la souris
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Animation idle (rotation lente continue)
  const time = useMotionValue(0);

  // Spring pour des mouvements ultra-fluides
  const springConfig = { damping: 25, stiffness: 60, mass: 0.5 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  // Rotation au scroll
  const scrollRotateY = useTransform(scrollProgress, [0, 0.3], [0, 180]);
  const scrollScale = useTransform(scrollProgress, [0, 0.2, 0.3], [1, 0.8, 0.6]);

  // Animation idle très lente
  useAnimationFrame((t) => {
    time.set(t / 3000); // Très lent
  });

  const idleRotateY = useTransform(time, (latest) => latest * 360);

  // Suivi de la souris avec effet parallaxe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Position relative de la souris (-1 à 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      // Limiter l'angle de rotation (plus subtil)
      mouseX.set(x * 15);
      mouseY.set(-y * 15);

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '2000px' }}
    >
      {/* Ombre portée réaliste */}
      <motion.div
        style={{
          scale: scrollScale,
          opacity: useTransform(scrollProgress, [0, 0.3], [0.15, 0])
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-12 bg-black/20 rounded-full blur-3xl"
      />

      {/* Logo 3D */}
      <motion.div
        style={{
          rotateX,
          rotateY: useTransform(
            [rotateY, idleRotateY, scrollRotateY],
            ([mouse, idle, scroll]: any) => mouse + idle + scroll
          ),
          scale: scrollScale,
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* Structure du logo - Forme géométrique sophistiquée */}
        <div className="relative w-[400px] h-[400px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Sphère centrale */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Segments de sphère pour effet 3D réaliste */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const radius = 120;
              
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `
                      rotateY(${(i * 360) / 20}deg) 
                      translateZ(${radius}px)
                    `,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="w-24 h-64 bg-gradient-to-b from-[#1a1a1a] via-[#333] to-[#1a1a1a] rounded-full" 
                       style={{
                         boxShadow: '0 0 40px rgba(0,0,0,0.2), inset 0 0 40px rgba(255,255,255,0.1)'
                       }}
                  />
                </div>
              );
            })}

            {/* Anneaux métalliques */}
            {[0, 45, 90].map((rotation, idx) => (
              <motion.div
                key={rotation}
                animate={{
                  rotateZ: [rotation, rotation + 360]
                }}
                transition={{
                  duration: 20 + idx * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-[3px]"
                  style={{
                    borderColor: '#666',
                    transform: `rotateX(${70 + idx * 10}deg)`,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                  }}
                />
              </motion.div>
            ))}

            {/* Cube central minimaliste avec logo */}
            <motion.div
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Faces du cube */}
              {[
                { transform: 'translateZ(64px)', bg: '#1a1a1a' },
                { transform: 'translateZ(-64px) rotateY(180deg)', bg: '#0a0a0a' },
                { transform: 'translateX(-64px) rotateY(-90deg)', bg: '#151515' },
                { transform: 'translateX(64px) rotateY(90deg)', bg: '#151515' },
                { transform: 'translateY(-64px) rotateX(90deg)', bg: '#0f0f0f' },
                { transform: 'translateY(64px) rotateX(-90deg)', bg: '#0f0f0f' }
              ].map((face, index) => (
                <div
                  key={index}
                  className="absolute w-32 h-32 flex items-center justify-center"
                  style={{
                    transform: face.transform,
                    backgroundColor: face.bg,
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <span className="text-white text-4xl opacity-40">PB</span>
                </div>
              ))}
            </motion.div>

            {/* Particules orbitales subtiles */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const orbitRadius = 180;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    rotateY: [0, 360]
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translateZ(${Math.cos(angle) * orbitRadius}px) translateX(${Math.sin(angle) * orbitRadius}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full bg-[#333]"
                    style={{
                      boxShadow: '0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.2)'
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Reflets lumineux dynamiques */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </motion.div>

      {/* Indicateur subtil de l'interaction souris */}
      <motion.div
        animate={{
          opacity: Math.abs(mousePosition.x) > 0.05 || Math.abs(mousePosition.y) > 0.05 ? 0.3 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 right-8 text-[#999] text-xs font-mono tracking-wider"
      >
        INTERACTIVE
      </motion.div>
    </div>
  );
}
