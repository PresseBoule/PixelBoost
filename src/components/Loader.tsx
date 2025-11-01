import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Animation de progression plus lente et fluide
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        // Progression ralentie avec des paliers
        const increment = prev < 60 ? 0.8 : prev < 90 ? 0.4 : 0.2;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Effet de glitch aléatoire
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Grille de fond animée */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        animate={{ 
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scan lines futuristes */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 20px'],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Hexagones en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.1, 0],
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 - i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Particules flottantes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-100, 100],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        />
      ))}

      {/* Container principal avec effet de glitch */}
      <motion.div 
        className="relative flex flex-col items-center justify-center"
        animate={glitchActive ? {
          x: [0, -2, 2, -2, 0],
          filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
        } : {}}
        transition={{ duration: 0.1 }}
      >
        {/* Cercles de progression multiples */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 -rotate-90" viewBox="0 0 100 100">
          {/* Cercle externe */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.3"
          />
          {/* Cercle de progression principal */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray={301}
            strokeDashoffset={301 - (301 * progress) / 100}
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }}
          />
          {/* Cercle interne animé */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.3"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>

        {/* Logo PixelBoost avec effets holographiques */}
        <div className="relative flex items-center justify-center">
          {/* Effet de glow pulsant */}
          <motion.div
            className="absolute inset-0 blur-2xl bg-white/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo P stylisé avec effet holographique */}
          <div className="relative">
            {/* Ombre colorée pour effet holographique */}
            {glitchActive && (
              <>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="absolute" style={{ filter: 'blur(1px)', opacity: 0.3, transform: 'translate(-2px, 0)' }}>
                  <rect x="20" y="20" width="80" height="80" stroke="cyan" strokeWidth="2" fill="none" />
                  <path d="M 40 35 L 40 85 M 40 35 L 65 35 C 72 35 77 40 77 47 C 77 54 72 59 65 59 L 40 59" stroke="cyan" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="absolute" style={{ filter: 'blur(1px)', opacity: 0.3, transform: 'translate(2px, 0)' }}>
                  <rect x="20" y="20" width="80" height="80" stroke="magenta" strokeWidth="2" fill="none" />
                  <path d="M 40 35 L 40 85 M 40 35 L 65 35 C 72 35 77 40 77 47 C 77 54 72 59 65 59 L 40 59" stroke="magenta" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </>
            )}
            
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="relative z-10">
              {/* Carré externe avec coins accentués */}
              <motion.rect
                x="20"
                y="20"
                width="80"
                height="80"
                stroke="white"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))' }}
              />

              {/* Coins accentués */}
              {[[20, 20], [100, 20], [100, 100], [20, 100]].map(([x, y], i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,1))' }}
                />
              ))}

              {/* Lettre P stylisée */}
              <motion.path
                d="M 40 35 L 40 85 M 40 35 L 65 35 C 72 35 77 40 77 47 C 77 54 72 59 65 59 L 40 59"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }}
              />

              {/* Pixels accent avec animation */}
              <motion.rect
                x="70"
                y="65"
                width="8"
                height="8"
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{ 
                  scale: { duration: 0.3, delay: 2 },
                  opacity: { duration: 1, repeat: Infinity, delay: 2 }
                }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,1))' }}
              />
              <motion.rect
                x="80"
                y="75"
                width="8"
                height="8"
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{ 
                  scale: { duration: 0.3, delay: 2.1 },
                  opacity: { duration: 1, repeat: Infinity, delay: 2.1 }
                }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,1))' }}
              />

              {/* Ligne de scan */}
              <motion.line
                x1="20"
                y1="50"
                x2="100"
                y2="50"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
                animate={{ y1: [20, 100], y2: [20, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>
        </div>

        {/* Texte PixelBoost avec effets */}
        <motion.div
          className="mt-20 text-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.h2 
            className="text-3xl tracking-[0.2em] text-white mb-6 text-center"
            animate={glitchActive ? {
              x: [0, -1, 1, 0],
            } : {}}
          >
            PIXELBOOST
          </motion.h2>
          
          {/* Barre de progression textuelle */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <motion.div 
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white"
              animate={{ scaleX: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 2.5 }}
            />
            <p className="text-sm tracking-[0.3em] text-white tabular-nums">
              {Math.floor(progress)}%
            </p>
            <motion.div 
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white"
              animate={{ scaleX: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 2.5 }}
            />
          </div>

          {/* Status text */}
          <motion.p
            className="text-xs tracking-[0.4em] text-white/30 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          >
            {progress < 30 ? 'INITIALIZING...' : progress < 70 ? 'LOADING ASSETS...' : progress < 95 ? 'FINALIZING...' : 'READY'}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Lignes décoratives multiples */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ marginTop: '2px' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Coins du viewport */}
      {[[20, 20, 'top-4 left-4'], [20, 20, 'top-4 right-4'], [20, 20, 'bottom-4 left-4'], [20, 20, 'bottom-4 right-4']].map(([w, h, pos], i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-${w} h-${h}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.5 + i * 0.1 }}
        >
          <svg width={w as number} height={h as number} className="w-full h-full">
            <polyline
              points={
                i === 0 ? '20,0 0,0 0,20' :
                i === 1 ? '0,0 20,0 20,20' :
                i === 2 ? '0,20 0,0 20,0' :
                '20,0 20,20 0,20'
              }
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
