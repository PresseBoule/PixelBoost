import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';

interface Section3DContactProps {
  scrollProgress: any;
  sectionProgress: any;
}

export function Section3DContact({ scrollProgress, sectionProgress }: Section3DContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const time = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const scale = useTransform(sectionProgress, [0, 0.3, 1], [0.7, 1, 1]);
  const opacity = useTransform(sectionProgress, [0, 0.2, 1], [0, 1, 1]);

  useAnimationFrame((t) => {
    time.set(t / 2000);
  });

  const idleRotateY = useTransform(time, (latest) => latest * 360);
  const idlePulse = useTransform(time, (latest) => 1 + Math.sin(latest * Math.PI * 2) * 0.1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(x * 15);
      mouseY.set(-y * 15);
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
          rotateX,
          rotateY: useTransform([rotateY, idleRotateY], ([mouse, idle]: any) => mouse + idle),
          scale: useTransform([scale, idlePulse], ([s, pulse]: any) => s * pulse),
          opacity,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-[400px] h-[400px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Torus (anneau épais) */}
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Créer un torus avec plusieurs anneaux */}
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i / 32) * Math.PI * 2;
              const majorRadius = 150;
              const minorRadius = 40;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    rotateY: [0, 360]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.03
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${minorRadius * 2}px`,
                    height: `${minorRadius * 2}px`,
                    transform: `translateX(${Math.cos(angle) * majorRadius}px) translateZ(${Math.sin(angle) * majorRadius}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 0 30px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1)'
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Sphère centrale */}
          <motion.div
            animate={{
              rotateY: [0, -360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotateY: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
              boxShadow: '0 0 60px rgba(255,255,255,0.3), inset 0 0 40px rgba(255,255,255,0.2)',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* Particules orbitales rapides */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 180;
            
            return (
              <motion.div
                key={i}
                animate={{
                  rotateY: [0, 360]
                }}
                transition={{
                  duration: 8 + i * 0.3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translateZ(${Math.cos(angle) * radius}px) translateX(${Math.sin(angle) * radius}px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div 
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                  className="w-2 h-2 rounded-full bg-white"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,0.8)'
                  }}
                />
              </motion.div>
            );
          })}

          {/* Rayons lumineux */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.div
              key={angle}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: angle / 100
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left"
              style={{
                width: '200px',
                height: '2px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.3), transparent)',
                transform: `rotate(${angle}deg)`,
                boxShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
