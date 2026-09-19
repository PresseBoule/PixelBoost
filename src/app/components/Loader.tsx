import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 120 120"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.rect
            x="20"
            y="20"
            width="80"
            height="80"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' }}
          />
          <motion.path
            d="M 40 35 L 40 85 M 40 35 L 65 35 C 72 35 77 40 77 47 C 77 54 72 59 65 59 L 40 59"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' }}
          />
        </motion.svg>

        <div className="relative w-20 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
