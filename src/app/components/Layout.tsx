import { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Mail, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import TikTokIcon from './TikTokIcon';

const navLinks = [
  { to: '/agent-ia', label: 'Agent IA' },
  { to: '/fonctionnement', label: 'Fonctionnement' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/cas-client', label: 'Cas client' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground font-['DM_Sans',sans-serif]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border'
            : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link
            to="/"
            className="font-['Chakra_Petch',monospace] text-base md:text-lg tracking-tight text-foreground hover:text-foreground/70 transition-colors"
          >
            PixelBoost
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/agent-ia"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-['Chakra_Petch',monospace] tracking-wider text-background bg-foreground px-5 py-2.5 hover:bg-foreground/85 transition-colors"
            >
              Tester l'agent
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-foreground p-2 -mr-2"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-1 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-3xl font-['Chakra_Petch',monospace] text-foreground border-b border-border hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                className="w-full mt-8"
              >
                <Link
                  to="/agent-ia"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center text-lg font-['Chakra_Petch',monospace] text-background bg-foreground py-4 hover:bg-foreground/90 transition-colors"
                >
                  Tester l'agent
                </Link>
              </motion.div>
            </div>
            <div className="px-6 pb-8 flex items-center gap-6">
              <a href="mailto:pixelboost22@gmail.com" className="text-xs text-muted-foreground hover:text-foreground transition-colors">pixelboost22@gmail.com</a>
              <a href="tel:+33785759040" className="text-xs text-muted-foreground hover:text-foreground transition-colors">07 85 75 90 40</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-32 py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="font-['Chakra_Petch',monospace] text-xl text-foreground"
              >
                PixelBoost
              </Link>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Agents IA & expériences web.<br />
                Bordeaux, France.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.instagram.com/pixel.boost.web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579858910169&locale=fr_FR"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@pixelboost2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-['Chakra_Petch',monospace] text-muted-foreground uppercase tracking-widest mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-['Chakra_Petch',monospace] text-muted-foreground uppercase tracking-widest mb-5">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:pixelboost22@gmail.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Mail size={13} />
                    pixelboost22@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33785759040"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Phone size={13} />
                    07 85 75 90 40
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-['Chakra_Petch',monospace] text-muted-foreground uppercase tracking-widest mb-5">
                Démarrer
              </h4>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-foreground border border-border px-4 py-3 hover:bg-secondary transition-colors"
              >
                Parler de mon projet
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 PixelBoost. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/mentions-legales"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
