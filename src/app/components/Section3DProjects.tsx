import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'motion/react';

interface Section3DProjectsProps {
  scrollProgress: any;
  sectionProgress: any;
}

export function Section3DProjects({ scrollProgress, sectionProgress }: Section3DProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const time = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const scrollRotateZ = useTransform(sectionProgress, [0, 1], [0, 360]);
  const scale = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useAnimationFrame((t) => {
    time.set(t / 3000);
  });

  const idleRotateY = useTransform(time, (latest) => Math.sin(latest * Math.PI * 2) * 20);

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
          rotateX,
          rotateY: useTransform([rotateY, idleRotateY], ([mouse, idle]: any) => mouse + idle),
          rotateZ: scrollRotateZ,
          scale,
          opacity,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-[500px] h-[500px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Cubes multiples en formation */}
          {[
            { x: 0, y: 0, z: 0, size: 120, delay: 0 },
            { x: -80, y: -80, z: 80, size: 80, delay: 0.5 },
            { x: 80, y: -80, z: 80, size: 80, delay: 1 },
            { x: -80, y: 80, z: 80, size: 80, delay: 1.5 },
            { x: 80, y: 80, z: 80, size: 80, delay: 2 }
          ].map((cube, idx) => (
            <motion.div
              key={idx}
              animate={{
                rotateY: [0, 360],
                y: [0, -20, 0]
              }}
              transition={{
                rotateY: {
                  duration: 20 + idx * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: cube.delay
                },
                y: {
                  duration: 3 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cube.delay
                }
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${cube.size}px`,
                height: `${cube.size}px`,
                transform: `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Faces du cube */}
              {[
                { transform: `translateZ(${cube.size / 2}px)`, opacity: 0.15 },
                { transform: `translateZ(-${cube.size / 2}px) rotateY(180deg)`, opacity: 0.1 },
                { transform: `translateX(-${cube.size / 2}px) rotateY(-90deg)`, opacity: 0.12 },
                { transform: `translateX(${cube.size / 2}px) rotateY(90deg)`, opacity: 0.12 },
                { transform: `translateY(-${cube.size / 2}px) rotateX(90deg)`, opacity: 0.08 },
                { transform: `translateY(${cube.size / 2}px) rotateX(-90deg)`, opacity: 0.08 }
              ].map((face, faceIdx) => (
                <div
                  key={faceIdx}
                  className="absolute"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    transform: face.transform,
                    backgroundColor: `rgba(255,255,255,${face.opacity})`,
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1)',
                    backfaceVisibility: 'hidden'
                  }}
                />
              ))}
            </motion.div>
          ))}

          {/* Lignes de connexion entre cubes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(0)' }}>
            <motion.g
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <line x1="250" y1="250" x2="170" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="250" y1="250" x2="330" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="250" y1="250" x2="170" y2="330" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="250" y1="250" x2="330" y2="330" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </motion.g>
          </svg>

          {/* Anneaux tournants */}
          {[0, 45, 90, 135].map((angle, idx) => (
            <motion.div
              key={angle}
              animate={{
                rotateZ: [angle, angle + 360]
              }}
              transition={{
                duration: 15 + idx * 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '350px',
                height: '350px',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transformStyle: 'preserve-3d',
                transform: `rotateX(70deg) rotateZ(${angle}deg)`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
