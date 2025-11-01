import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', index: 0 },
    { label: 'Services', index: 1 },
    { label: 'Projets', index: 2 },
    { label: 'Contact', index: 3 }
  ];

  return (
    <>
      {/* Navigation desktop */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => onNavigate(0)}
            >
              <span className="text-xl text-white tracking-wider">PixelBoost</span>
            </motion.div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.index}
                  onClick={() => onNavigate(item.index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 transition-colors ${
                    currentSection === item.index
                      ? 'text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentSection === item.index && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Bouton CTA desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(3)}
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white"
            >
              Démarrer
            </motion.button>

            {/* Menu burger mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 right-0 bottom-0 w-64 bg-[#0a0a0f]/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
      >
        <div className="flex flex-col gap-4 p-8 mt-20">
          {navItems.map((item) => (
            <motion.button
              key={item.index}
              onClick={() => {
                onNavigate(item.index);
                setIsOpen(false);
              }}
              whileHover={{ x: 10 }}
              className={`text-left px-4 py-3 rounded-lg transition-colors ${
                currentSection === item.index
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onNavigate(3);
              setIsOpen(false);
            }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white"
          >
            Démarrer un projet
          </motion.button>
        </div>
      </motion.div>

      {/* Overlay mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Indicateurs de section */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {navItems.map((item) => (
          <motion.button
            key={item.index}
            onClick={() => onNavigate(item.index)}
            whileHover={{ scale: 1.5 }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSection === item.index
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 w-4 h-4'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            title={item.label}
          />
        ))}
      </div>
    </>
  );
}
