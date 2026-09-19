import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';

interface Section3DLogoProps {
  scrollProgress: any;
  sectionProgress: any;
}

export function Section3DLogo({ scrollProgress, sectionProgress }: Section3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const time = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const scrollRotateY = useTransform(sectionProgress, [0, 1], [0, 180]);
  const scale = useTransform(sectionProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  // Animation idle
  useAnimationFrame((t) => {
    time.set(t / 2000);
  });

  const idleRotateY = useTransform(time, (latest) => latest * 360);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(x * 12);
      mouseY.set(-y * 12);
      setMousePosition({ x, y });
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
          rotateY: useTransform(
            [rotateY, idleRotateY, scrollRotateY],
            ([mouse, idle, scroll]: any) => mouse + idle + scroll
          ),
          scale,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-[500px] h-[500px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Sphère segmentée */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const radius = 150;
            
            return (
              <motion.div
                key={i}
                animate={{
                  rotateY: [0, 360]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.05
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotateY(${(i * 360) / 24}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="w-20 h-96 rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 0 40px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)'
                  }}
                />
              </motion.div>
            );
          })}

          {/* Anneaux orbitaux */}
          {[0, 60, 120].map((rotation, idx) => (
            <motion.div
              key={rotation}
              animate={{
                rotateZ: [rotation, rotation + 360]
              }}
              transition={{
                duration: 25 + idx * 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[2px]"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  transform: `rotateX(${75 + idx * 15}deg)`,
                  boxShadow: '0 0 30px rgba(255,255,255,0.1)'
                }}
              />
            </motion.div>
          ))}

          {/* Cube central avec logo */}
          <motion.div
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {[
              { transform: 'translateZ(56px)', color: 'rgba(255,255,255,0.1)' },
              { transform: 'translateZ(-56px) rotateY(180deg)', color: 'rgba(255,255,255,0.08)' },
              { transform: 'translateX(-56px) rotateY(-90deg)', color: 'rgba(255,255,255,0.09)' },
              { transform: 'translateX(56px) rotateY(90deg)', color: 'rgba(255,255,255,0.09)' },
              { transform: 'translateY(-56px) rotateX(90deg)', color: 'rgba(255,255,255,0.07)' },
              { transform: 'translateY(56px) rotateX(-90deg)', color: 'rgba(255,255,255,0.07)' }
            ].map((face, index) => (
              <div
                key={index}
                className="absolute w-28 h-28 flex items-center justify-center backdrop-blur-sm"
                style={{
                  transform: face.transform,
                  backgroundColor: face.color,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <span className="text-white text-3xl opacity-60 font-light">PB</span>
              </div>
            ))}
          </motion.div>

          {/* Particules orbitales */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const orbitRadius = 200;
            
            return (
              <motion.div
                key={i}
                animate={{
                  rotateY: [0, 360]
                }}
                transition={{
                  duration: 20 + i * 1.5,
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
                  className="w-2 h-2 rounded-full bg-white"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
