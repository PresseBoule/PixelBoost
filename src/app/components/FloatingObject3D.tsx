import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimationFrame } from 'motion/react';

export function FloatingObject3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Valeurs de mouvement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Animation idle (rotation lente continue)
  const idleRotation = useMotionValue(0);

  // Spring pour des mouvements fluides
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  // Scroll pour rotation supplémentaire
  const { scrollYProgress } = useScroll();
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Animation idle continue
  useAnimationFrame((time) => {
    // Rotation lente continue quand pas d'interaction
    idleRotation.set((time / 50) % 360);
  });

  // Suivi de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcul de la position relative (de -1 à 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setMousePosition({ x, y });
      
      // Rotation basée sur la position de la souris
      mouseX.set(x * 20); // Max 20 degrés
      mouseY.set(-y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
      {/* Lueur de fond */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
      />

      {/* Objet 3D principal */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ: idleRotation,
        }}
        className="relative preserve-3d"
      >
        {/* Structure géométrique complexe */}
        <div className="relative w-64 h-64">
          {/* Octaèdre central */}
          <motion.div
            animate={{
              rotateX: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 preserve-3d"
          >
            {/* Faces de l'octaèdre */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotateY(${i * 45}deg) translateZ(80px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/40 to-blue-600/40 backdrop-blur-sm border border-cyan-400/30 triangle-shape" />
              </div>
            ))}
          </motion.div>

          {/* Anneaux orbitaux */}
          {[0, 60, 120].map((rotation, index) => (
            <motion.div
              key={rotation}
              animate={{
                rotateZ: [rotation, rotation + 360],
              }}
              transition={{
                duration: 15 + index * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 preserve-3d"
            >
              <div
                className="absolute left-1/2 top-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gradient-ring"
                style={{
                  borderImage: `linear-gradient(${rotation}deg, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5)) 1`,
                  transform: `rotateX(${60 + index * 30}deg)`
                }}
              />
            </motion.div>
          ))}

          {/* Particules orbitales */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 150;
            return (
              <motion.div
                key={i}
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1
                }}
                className="absolute left-1/2 top-1/2 preserve-3d"
                style={{
                  transform: `translateZ(${Math.cos(angle) * radius}px) translateX(${Math.sin(angle) * radius}px)`
                }}
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50" />
              </motion.div>
            );
          })}

          {/* Cube central lumineux */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotateX: [0, 360],
              rotateY: [0, -360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 preserve-3d"
          >
            {/* Faces du cube */}
            {[
              { transform: 'translateZ(32px)', gradient: 'from-cyan-400 to-blue-500' },
              { transform: 'translateZ(-32px) rotateY(180deg)', gradient: 'from-purple-400 to-pink-500' },
              { transform: 'translateX(-32px) rotateY(-90deg)', gradient: 'from-blue-400 to-purple-500' },
              { transform: 'translateX(32px) rotateY(90deg)', gradient: 'from-pink-400 to-rose-500' },
              { transform: 'translateY(-32px) rotateX(90deg)', gradient: 'from-cyan-400 to-purple-500' },
              { transform: 'translateY(32px) rotateX(-90deg)', gradient: 'from-blue-400 to-pink-500' },
            ].map((face, index) => (
              <div
                key={index}
                className={`absolute w-16 h-16 bg-gradient-to-br ${face.gradient} backface-hidden border border-white/20`}
                style={{ transform: face.transform }}
              />
            ))}
          </motion.div>

          {/* Lignes de connexion lumineuses */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(50px)' }}>
            <motion.g
              animate={{
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const x1 = 128 + Math.cos(angle) * 60;
                const y1 = 128 + Math.sin(angle) * 60;
                const x2 = 128 + Math.cos(angle) * 120;
                const y2 = 128 + Math.sin(angle) * 120;
                
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    className="drop-shadow-glow-cyan"
                  />
                );
              })}
            </motion.g>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Indicateurs de distance avec la souris */}
      <motion.div
        animate={{
          opacity: Math.abs(mousePosition.x) > 0.1 || Math.abs(mousePosition.y) > 0.1 ? 1 : 0
        }}
        className="absolute bottom-4 right-4 text-cyan-400/60 text-xs font-mono"
      >
        X: {mousePosition.x.toFixed(2)} | Y: {mousePosition.y.toFixed(2)}
      </motion.div>
    </div>
  );
}
