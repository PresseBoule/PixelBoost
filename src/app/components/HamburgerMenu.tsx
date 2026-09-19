import { motion } from 'motion/react';
import { useState } from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 left-4 md:top-8 md:left-8 z-[9997] w-12 h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex flex-col items-center justify-center gap-1.5 hover:scale-110 transition-all group touch-manipulation"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}
    >
      {/* Ligne 1 */}
      <motion.div
        animate={
          isOpen
            ? { rotate: 45, y: 8, width: '18px' }
            : { rotate: 0, y: 0, width: '18px' }
        }
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="h-[2px] bg-white rounded-full origin-center"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
      />

      {/* Ligne 2 */}
      <motion.div
        animate={isOpen ? { opacity: 0, width: '18px' } : { opacity: 1, width: '18px' }}
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="h-[2px] bg-white rounded-full"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
      />

      {/* Ligne 3 */}
      <motion.div
        animate={
          isOpen
            ? { rotate: -45, y: -8, width: '18px' }
            : { rotate: 0, y: 0, width: '18px' }
        }
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="h-[2px] bg-white rounded-full origin-center"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
      />

      {/* Cercle animé au survol */}
      <motion.div
        className="absolute inset-0 border border-white/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
}
