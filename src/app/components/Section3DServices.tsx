import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';

interface Section3DServicesProps {
  scrollProgress: any;
  sectionProgress: any;
}

export function Section3DServices({ scrollProgress, sectionProgress }: Section3DServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const time = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const scrollRotate = useTransform(sectionProgress, [0, 1], [0, 360]);
  const scale = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useAnimationFrame((t) => {
    time.set(t / 2500);
  });

  const idleRotateX = useTransform(time, (latest) => Math.sin(latest * Math.PI * 2) * 15);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(x * 10);
      mouseY.set(-y * 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        style={{
          rotateX: useTransform([rotateX, idleRotateX], ([mouse, idle]: any) => mouse + idle),
          rotateY: useTransform([rotateY, scrollRotate], ([mouse, scroll]: any) => mouse + scroll),
          scale,
          opacity,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-[450px] h-[450px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Pyramide inversée */}
          <motion.div
            animate={{
              rotateY: [0, 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Faces de la pyramide */}
            {[0, 90, 180, 270].map((angle, i) => (
              <div
                key={angle}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '150px solid transparent',
                  borderRight: '150px solid transparent',
                  borderBottom: '300px solid rgba(255,255,255,0.08)',
                  transform: `rotateY(${angle}deg) translateZ(100px)`,
                  transformStyle: 'preserve-3d',
                  filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))'
                }}
              />
            ))}
          </motion.div>

          {/* Anneaux concentriques */}
          {[1, 1.3, 1.6].map((scale, idx) => (
            <motion.div
              key={idx}
              animate={{
                rotateX: [0, 360],
              }}
              transition={{
                duration: 20 + idx * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${200 * scale}px`,
                height: `${200 * scale}px`,
                border: '2px solid rgba(255,255,255,0.12)',
                borderRadius: '50%',
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 30px rgba(255,255,255,0.1)'
              }}
            />
          ))}

          {/* Particules flottantes */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const radius = 180;
            const height = Math.sin(angle * 2) * 100;
            
            return (
              <motion.div
                key={i}
                animate={{
                  y: [height - 20, height + 20, height - 20],
                  rotateY: [0, 360]
                }}
                transition={{
                  y: {
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateY: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translateX(${Math.cos(angle) * radius}px) translateZ(${Math.sin(angle) * radius}px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full bg-white"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,0.6)'
                  }}
                />
              </motion.div>
            );
          })}

          {/* Grille 3D centrale */}
          <motion.div
            animate={{
              rotateY: [0, -360],
              rotateX: [0, 360]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Grille de lignes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute"
                style={{
                  width: '2px',
                  height: '200px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: `translateX(${(i - 4) * 30}px) translateZ(100px)`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute"
                style={{
                  width: '200px',
                  height: '2px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: `translateY(${(i - 4) * 30}px) translateZ(100px)`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
