import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Facebook, Mail } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMentionsLegales: () => void;
  onOpenPolitiqueConfidentialite: () => void;
  onOpenCGV: () => void;
}

export default function MenuOverlay({ isOpen, onClose, onOpenMentionsLegales, onOpenPolitiqueConfidentialite, onOpenCGV }: MenuOverlayProps) {
  const menuItems = [
    { title: 'Accueil', href: '#hero' },
    { title: 'Services', href: '#services' },
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Tarifs', href: '#tarifs' },
    { title: 'Contact', href: '#contact' },
  ];

  const legalItems = [
    { title: 'Mentions légales', action: onOpenMentionsLegales },
    { title: 'Politique de confidentialité', action: onOpenPolitiqueConfidentialite },
    { title: 'CGV', action: onOpenCGV },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/pixel.boost.web/' },
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579858910169&locale=fr_FR' },
    { icon: Mail, label: 'Email', href: 'mailto:pixelboost22@gmail.com' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop avec effet de flou */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9998] bg-black/80"
            onClick={onClose}
          />

          {/* Menu overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Grille de fond */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />
              </div>

              {/* Bouton de fermeture */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={onClose}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
                style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}
              >
                <X size={24} />
              </motion.button>

              {/* Contenu du menu */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 overflow-hidden">
                {/* Effet de glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />

                {/* Navigation principale */}
                <div className="mb-16">
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/40 text-xs tracking-[0.3em] uppercase mb-8"
                  >
                    Navigation
                  </motion.p>
                  <nav className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        onClick={() => handleLinkClick(item.href)}
                        className="block w-full text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-all group-hover:w-12" />
                          <span className="text-4xl md:text-6xl text-white tracking-tight group-hover:translate-x-2 transition-transform">
                            {item.title}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* Séparateur */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
                />

                {/* Grid pour légal et réseaux sociaux */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Mentions légales */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6"
                    >
                      Légal
                    </motion.p>
                    <nav className="space-y-3">
                      {legalItems.map((item, index) => (
                        <motion.button
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                          className="block text-white/60 hover:text-white text-sm transition-colors"
                        >
                          {item.title}
                        </motion.button>
                      ))}
                    </nav>
                  </div>

                  {/* Réseaux sociaux */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6"
                    >
                      Suivez-nous
                    </motion.p>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.button
                          key={social.label}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                          onClick={() => handleLinkClick(social.href)}
                          className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          aria-label={social.label}
                        >
                          <social.icon size={20} className="text-white" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coins décoratifs */}
                {[[0, 0], [0, 1], [1, 0], [1, 1]].map(([x, y], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="absolute w-8 h-8"
                    style={{
                      [x === 0 ? 'left' : 'right']: '1rem',
                      [y === 0 ? 'top' : 'bottom']: '1rem',
                    }}
                  >
                    <svg width="32" height="32" className="w-full h-full">
                      <polyline
                        points={
                          x === 0 && y === 0
                            ? '32,0 0,0 0,32'
                            : x === 1 && y === 0
                            ? '0,0 32,0 32,32'
                            : x === 0 && y === 1
                            ? '0,32 0,0 32,0'
                            : '32,0 32,32 0,32'
                        }
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
