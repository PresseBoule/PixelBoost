import { useState } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
}

export function GlitchText({ text }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchVariants = {
    normal: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    glitch: {
      x: [-2, 2, -2, 2, 0],
      opacity: [1, 0.8, 1, 0.9, 1],
      filter: ['blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'],
    }
  };

  return (
    <div 
      className="relative inline-block cursor-pointer select-none"
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Texte principal */}
      <motion.h1
        variants={glitchVariants}
        animate={isGlitching ? 'glitch' : 'normal'}
        transition={{
          duration: 0.3,
          repeat: isGlitching ? Infinity : 0,
          repeatDelay: 0.1
        }}
        className="relative z-10 text-7xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        {text}
      </motion.h1>

      {/* Couches de glitch - Rouge */}
      <motion.div
        animate={isGlitching ? {
          x: [-5, 5, -3, 3, -1, 1, 0],
          opacity: [0, 0.7, 0, 0.5, 0, 0.3, 0],
        } : {
          opacity: 0
        }}
        transition={{
          duration: 0.4,
          repeat: isGlitching ? Infinity : 0,
          repeatDelay: 0.05
        }}
        className="absolute top-0 left-0 text-7xl text-red-500 opacity-0 mix-blend-screen"
        style={{ textShadow: '2px 0 0 rgba(239, 68, 68, 0.8)' }}
      >
        {text}
      </motion.div>

      {/* Couches de glitch - Cyan */}
      <motion.div
        animate={isGlitching ? {
          x: [5, -5, 3, -3, 1, -1, 0],
          opacity: [0, 0.7, 0, 0.5, 0, 0.3, 0],
        } : {
          opacity: 0
        }}
        transition={{
          duration: 0.4,
          repeat: isGlitching ? Infinity : 0,
          repeatDelay: 0.08,
          delay: 0.05
        }}
        className="absolute top-0 left-0 text-7xl text-cyan-400 opacity-0 mix-blend-screen"
        style={{ textShadow: '-2px 0 0 rgba(6, 182, 212, 0.8)' }}
      >
        {text}
      </motion.div>

      {/* Couches de glitch - Violet */}
      <motion.div
        animate={isGlitching ? {
          x: [3, -3, 5, -5, 2, -2, 0],
          y: [-1, 1, -2, 2, -1, 1, 0],
          opacity: [0, 0.6, 0, 0.4, 0, 0.2, 0],
        } : {
          opacity: 0
        }}
        transition={{
          duration: 0.4,
          repeat: isGlitching ? Infinity : 0,
          repeatDelay: 0.06,
          delay: 0.1
        }}
        className="absolute top-0 left-0 text-7xl text-purple-500 opacity-0 mix-blend-screen"
        style={{ textShadow: '0 2px 0 rgba(168, 85, 247, 0.8)' }}
      >
        {text}
      </motion.div>

      {/* Lignes de scan */}
      {isGlitching && (
        <>
          <motion.div
            animate={{
              y: ['-100%', '200%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 h-1 bg-cyan-400/50 blur-sm"
          />
          <motion.div
            animate={{
              y: ['200%', '-100%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.3
            }}
            className="absolute inset-0 h-0.5 bg-pink-400/50 blur-sm"
          />
        </>
      )}

      {/* Fragments de texte qui se détachent */}
      {isGlitching && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -20, -40],
                x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                opacity: [0, 0.6, 0],
                rotate: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: index * 0.03,
                repeatDelay: 0.5
              }}
              className="absolute text-7xl text-cyan-400/50"
              style={{
                left: `${(index / text.length) * 100}%`,
                top: 0
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      )}

      {/* Effet de distorsion du fond */}
      {isGlitching && (
        <motion.div
          animate={{
            scaleX: [1, 1.02, 0.98, 1.01, 1],
            scaleY: [1, 0.98, 1.02, 0.99, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity
          }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
        />
      )}
    </div>
  );
}
