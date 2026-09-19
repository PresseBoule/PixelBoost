import { useRef, useEffect, useState, Fragment } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CentralObject3D } from './CentralObject3D';
import { DynamicBackground } from './DynamicBackground';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import TikTokIcon from './TikTokIcon';
import HamburgerMenu from './HamburgerMenu';
import MenuOverlay from './MenuOverlay';
import { DecomposingText } from './DecomposingText';
import { PortfolioSection } from './PortfolioSection';
import { PackageSelectionDialog } from './PackageSelectionDialog';
import { PaymentPage } from './PaymentPage';
import { DiscussionForm } from './DiscussionForm';
import { ContactForm } from './ContactForm';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import CGV from './CGV';

export function PixelBoostSite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [showMentionsLegales, setShowMentionsLegales] = useState(false);
  const [showPolitiqueConfidentialite, setShowPolitiqueConfidentialite] = useState(false);
  const [showCGV, setShowCGV] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress - ultra fluide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 40,
    mass: 1.5,
    restDelta: 0.001
  });

  const baseSections = [
    {
      id: 'hero',
      title: 'PixelBoost',
      subtitle: 'Création de sites web',
      align: 'center' as const
    },
    {
      id: 'services',
      title: 'Services',
      items: [
        'Sites vitrine modernes',
        'Sites e-commerce',
        'Applications web sur mesure',
        'Refonte & optimisation',
        'Design responsive & animations'
      ],
      align: 'left' as const
    },
    {
      id: 'portfolio-intro',
      title: 'Portfolio',
      subtitle: 'Découvrez nos réalisations',
      align: 'center' as const
    },
    {
      id: 'tarifs',
      title: 'Tarifs',
      packages: [
        { 
          name: 'Basique', 
          price: '499€', 
          features: ['Site vitrine one-page', 'Design responsive mobile', 'Formulaire de contact', 'SEO optimisé', 'Garantie 30 jours', 'Livraison sous 1 semaine']
        },
        { 
          name: 'Populaire', 
          price: '749€', 
          features: ['Site multi-pages (jusqu\'à 5)', 'Design 100% sur mesure', 'Animations & interactions', 'SEO avancé + Analytics', 'Espace admin intégré', 'Garantie 30 jours', 'Livraison sous 2 semaines'],
          popular: true
        },
        { 
          name: 'Premium', 
          price: '999€', 
          features: ['Pages illimitées', 'Design ultra-personnalisé', 'Animations 3D avancées', 'E-commerce + paiement en ligne', 'CMS sur mesure', 'SEO premium + suivi', 'Formation complète', 'Garantie 30 jours', 'Livraison sous 3 semaines']
        }
      ],
      align: 'right' as const
    },
    {
      id: 'contact',
      title: 'Contact',
      align: 'center' as const
    }
  ];

  // Une seule copie des sections
  const sections = baseSections;

  // Démarrer tout en haut sur le hero
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Masquer l'animation d'entrée après 1.5 secondes (plus rapide)
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Suivre la section actuelle lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionCount = baseSections.length;
      const isMobile = window.innerWidth < 768;
      
      // Le portfolio commence après 3 sections (hero, services, portfolio-intro)
      const portfolioStartScroll = viewportHeight * 3;
      // Le portfolio fait 500vh sur mobile (facilite la sortie), 800vh sur desktop
      const portfolioHeight = viewportHeight * (isMobile ? 5 : 8);
      const portfolioEndScroll = portfolioStartScroll + portfolioHeight;
      
      // Si on est dans le portfolio, rester sur l'index portfolio-intro (2)
      if (scrollTop >= portfolioStartScroll && scrollTop < portfolioEndScroll) {
        setCurrentSection(2);
      } else if (scrollTop < portfolioStartScroll) {
        // Avant le portfolio
        const approximateSection = Math.floor(scrollTop / viewportHeight);
        setCurrentSection(approximateSection);
      } else {
        // Après le portfolio
        // Il y a 2 sections après (tarifs, contact)
        // On calcule la position relative après le portfolio
        const scrollAfterPortfolio = scrollTop - portfolioEndScroll;
        const sectionAfterPortfolio = Math.floor(scrollAfterPortfolio / viewportHeight);
        // Index 3 = tarifs, 4 = contact
        setCurrentSection(Math.min(3 + sectionAfterPortfolio, sectionCount - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [baseSections.length]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a]">
      {/* Animation d'entrée simple et rapide */}
      {showEntrance && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: showEntrance ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9998] bg-black pointer-events-none"
        >
          {/* Simple fade avec une ligne horizontale qui s'ouvre */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Ligne horizontale qui s'étend */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-white top-1/2"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ 
                scaleX: [0, 1, 1],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 1.2,
                times: [0, 0.5, 1],
                ease: [0.76, 0, 0.24, 1]
              }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}
            />

            {/* Logo P minimaliste au centre */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.9, 1, 1, 1.05]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeInOut'
              }}
            >
              <svg width="60" height="60" viewBox="0 0 120 120">
                <motion.rect
                  x="20"
                  y="20"
                  width="80"
                  height="80"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 1] }}
                  transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}
                />
                <motion.path
                  d="M 40 35 L 40 85 M 40 35 L 65 35 C 72 35 77 40 77 47 C 77 54 72 59 65 59 L 40 59"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 1] }}
                  transition={{ duration: 2, times: [0, 0.3, 0.7, 1], delay: 0.2 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,1))' }}
                />
              </svg>
            </motion.div>

            {/* Texte PIXELBOOST qui apparaît */}
            <motion.div
              className="absolute top-2/3 text-white text-2xl tracking-[0.5em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
              transition={{
                duration: 2,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeInOut'
              }}
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
              }}
            >
              PIXELBOOST
            </motion.div>
          </div>

          {/* Grille qui se révèle */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </motion.div>
      )}

      {/* Background animé */}
      <DynamicBackground scrollProgress={smoothProgress} />

      {/* Menu hamburger */}
      <HamburgerMenu isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />

      {/* Menu overlay */}
      <MenuOverlay 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)}
        onOpenMentionsLegales={() => {
          setShowMentionsLegales(true);
          setMenuOpen(false);
        }}
        onOpenPolitiqueConfidentialite={() => {
          setShowPolitiqueConfidentialite(true);
          setMenuOpen(false);
        }}
        onOpenCGV={() => {
          setShowCGV(true);
          setMenuOpen(false);
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 mix-blend-difference"
      >
        {/* Ligne de scan qui traverse la nav */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        />
        
        <div className="flex items-center justify-between">
          <div className="w-12 md:w-14" /> {/* Spacer pour le hamburger menu */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white text-base md:text-lg lg:text-xl tracking-tight"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '-0.025em' }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            PixelBoost
          </motion.button>
          <div className="w-12 md:w-14" /> {/* Spacer pour équilibrer */}
        </div>
      </motion.nav>

      {/* Navigation dots - cachés sur mobile */}
      <div className="hidden md:flex fixed right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 mix-blend-difference">
        {baseSections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => window.scrollTo({ top: window.innerHeight * index, behavior: 'smooth' })}
            className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
              currentSection === index ? 'bg-white scale-150' : 'bg-white/30'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: currentSection === index ? 1 : 0.3, x: 0 }}
            transition={{ delay: 1.8 + index * 0.08, duration: 0.4 }}
          />
        ))}
      </div>

      {/* Spirale 3D centrale qui descend avec le scroll */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <CentralObject3D 
          scrollProgress={smoothProgress} 
          currentSection={currentSection}
        />
      </div>

      {/* Sections content */}
      {sections.map((section, index) => {
        const sectionStart = index / sections.length;
        const sectionEnd = (index + 1) / sections.length;
        
        // Insérer PortfolioSection après portfolio-intro (index 2)
        const isAfterPortfolioIntro = section.id === 'portfolio-intro' && index === 2;
        
        return (
          <Fragment key={`${section.id}-${index}`}>
            <section
              id={section.id}
              className={`relative flex items-center ${
                section.id === 'tarifs' || section.id === 'contact' 
                  ? 'min-h-[150vh] md:min-h-screen py-16 md:py-20' 
                  : 'h-screen'
              }`}
            >
            <motion.div
              style={{
                y: section.id === 'hero'
                  ? useTransform(
                      smoothProgress,
                      [0, sectionEnd + 0.15],
                      [0, -80]
                    )
                  : useTransform(
                      smoothProgress,
                      [sectionStart - 0.15, sectionEnd + 0.15],
                      [80, -80]
                    )
              }}
              className={`z-20 px-8 md:px-16 w-full ${
                section.align === 'center' 
                  ? 'text-center flex flex-col items-center' 
                  : section.align === 'left'
                  ? 'text-left max-w-3xl'
                  : 'text-right max-w-3xl ml-auto'
              }`}
            >
              {/* Hero Section */}
              {section.id === 'hero' && (
                <div className="relative">
                  <motion.h1 
                    className="text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] tracking-tighter text-white mb-4 relative"
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 1.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <DecomposingText text={section.title} />
                  </motion.h1>
                  
                  {/* Ligne séparatrice animée */}
                  <motion.div
                    className="w-32 h-[2px] bg-gradient-to-r from-white via-white/50 to-transparent mx-auto mb-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  />

                  <motion.p 
                    className="text-2xl md:text-3xl lg:text-4xl text-white/40 tracking-wide relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {section.subtitle}
                  </motion.p>
                </div>
              )}

              {/* Portfolio Intro Section */}
              {section.id === 'portfolio-intro' && (
                <div className="relative">
                  {/* Grille qui apparaît en arrière-plan */}
                  <motion.div
                    className="absolute -inset-32 opacity-[0.02]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.02, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '80px 80px',
                    }}
                  />

                  <motion.h2 
                    className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tighter text-white mb-8 relative z-10"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    viewport={{ once: true }}
                  >
                    <DecomposingText text={section.title} />
                  </motion.h2>

                  <motion.p 
                    className="text-2xl md:text-3xl lg:text-4xl text-white/40 tracking-wide mb-12 relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {section.subtitle}
                  </motion.p>

                  {/* Indicateur de scroll avec flèches */}
                  <motion.div
                    className="flex flex-col items-center gap-4 relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-white/30 text-sm uppercase tracking-widest">
                      Continuez à scroller
                    </div>
                    
                    {/* Flèches animées */}
                    <div className="relative h-16 w-6">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 -translate-x-1/2"
                          animate={{ 
                            y: [0, 20, 0],
                            opacity: [0.2, 0.8, 0.2]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Services Section */}
              {section.id === 'services' && (
                <div className="relative">
                  <motion.h2 
                    className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tighter text-white mb-12 relative"
                    initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    viewport={{ once: true }}
                  >
                    <DecomposingText text={section.title} />
                  </motion.h2>
                  
                  <div className="space-y-6 relative">
                    {section.items?.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: i * 0.1,
                          duration: 0.6,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 group relative"
                      >
                        {/* Ligne de connexion avant le point */}
                        <motion.div
                          className="absolute left-0 w-8 h-[1px] bg-gradient-to-r from-white/0 to-white/20"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                          viewport={{ once: true }}
                        />
                        
                        {/* Point lumineux avec glow */}
                        <motion.div 
                          className="relative z-10"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 rounded-full bg-white/50 relative">
                            <motion.div 
                              className="absolute inset-0 w-2 h-2 rounded-full bg-white/30 blur-sm"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                          </div>
                        </motion.div>

                        {/* Texte avec effet de matérialisation */}
                        <motion.span 
                          className="text-xl md:text-2xl text-white/70 relative transition-colors duration-300 group-hover:text-white/90"
                          initial={{ opacity: 0, filter: 'blur(5px)' }}
                          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {item}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tarifs Section */}
              {section.id === 'tarifs' && (
                <div className="relative w-full">
                  {/* Hexagone en arrière-plan */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.02]"
                    initial={{ rotate: 0, scale: 0 }}
                    whileInView={{ rotate: 360, scale: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    viewport={{ once: true }}
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

                  <motion.h2 
                    className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tighter text-white mb-8 relative"
                    initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    viewport={{ once: true }}
                  >
                    <DecomposingText text={section.title} />
                  </motion.h2>
                  
                  {/* Paiement info avec effet de matérialisation */}
                  <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12 max-w-4xl ml-auto relative"
                  >
                    {/* Ligne animée */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/0 via-white/20 to-white/0"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                    
                    <div className="border-l-2 border-white/20 pl-6 py-2">
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        Paiement en deux fois : <span className="text-white">30% d'acompte</span> au démarrage du projet, 
                        <span className="text-white"> 70% à la livraison</span> du site finalisé.
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ml-auto">
                    {section.packages?.map((pkg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, rotateX: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ 
                          delay: i * 0.2,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: pkg.popular ? 1.02 : 1.01, y: -5 }}
                        className="relative group text-left"
                        style={{ transformPerspective: 1000 }}
                      >
                        {/* Particules de matérialisation */}
                        {[...Array(6)].map((_, pi) => (
                          <motion.div
                            key={pi}
                            className="absolute w-1 h-1 bg-white/40 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                            transition={{ 
                              delay: i * 0.2 + pi * 0.05,
                              duration: 0.8
                            }}
                            viewport={{ once: true }}
                          />
                        ))}

                        {/* Glow effect background */}
                        <motion.div 
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            pkg.popular 
                              ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-100' 
                              : 'bg-gradient-to-br from-white/5 via-white/2 to-transparent opacity-0 group-hover:opacity-100'
                          }`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: pkg.popular ? 1 : 0 }}
                          transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                          viewport={{ once: true }}
                        />
                        
                        {/* Border glow */}
                        <div className={`absolute inset-0 transition-all duration-500 ${
                          pkg.popular 
                            ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                            : 'shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                        }`} />

                        {/* Card content */}
                        <div className={`relative border backdrop-blur-sm p-6 md:p-8 transition-all duration-300 ${
                          pkg.popular 
                            ? 'border-white/30' 
                            : 'border-white/10 group-hover:border-white/20'
                        }`}>
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                          
                          {/* Badge populaire */}
                          {pkg.popular && (
                            <div className="absolute -top-3 left-8">
                              <div className="bg-white text-black px-4 py-1 text-[10px] uppercase tracking-[0.2em] shadow-lg">
                                Plus choisie
                              </div>
                            </div>
                          )}

                          {/* Header */}
                          <div className="mb-8 pb-6 border-b border-white/10">
                            <h3 className="text-xs text-white/90 mb-3 tracking-widest uppercase">{pkg.name}</h3>
                            <div className="flex items-baseline gap-1">
                              <span className="text-5xl text-white tracking-tight">{pkg.price.replace('€', '')}</span>
                              <span className="text-2xl text-white/40">€</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="space-y-4 mb-8">
                            {pkg.features.map((feature, j) => (
                              <motion.div 
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + j * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <div className="relative mt-1.5">
                                  <div className="w-1 h-1 rounded-full bg-white/60" />
                                  <div className="absolute inset-0 w-1 h-1 rounded-full bg-white/40 blur-sm" />
                                </div>
                                <span className="text-[13px] text-white/60 leading-relaxed">{feature}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <div className="flex justify-center">
                            <motion.button
                              onClick={() => setSelectedPackage({ name: pkg.name, price: pkg.price })}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative group/btn w-full overflow-hidden border border-white/20 hover:border-white/40 px-6 py-3 transition-all duration-300"
                            >
                              {/* Background gradient animé */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                              />
                              
                              <span className="relative z-10 text-sm text-white uppercase tracking-wider">
                                Choisir
                              </span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {section.id === 'contact' && (
                <div className="relative w-full">
                  {/* Cercles concentriques en arrière-plan */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (360 / 12) * i;
                    const length = 400;
                    const x1 = Math.cos((angle * Math.PI) / 180) * length;
                    const y1 = Math.sin((angle * Math.PI) / 180) * length;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-[1px] bg-gradient-to-r from-white/0 via-white/5 to-white/0 origin-left"
                        style={{
                          width: `${length}px`,
                          transform: `rotate(${angle}deg)`,
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    );
                  })}

                  <motion.h2 
                    className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tighter text-white mb-8 relative z-10"
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    viewport={{ once: true }}
                  >
                    <DecomposingText text={section.title} />
                  </motion.h2>
                  
                  <div className="w-full max-w-5xl mx-auto relative z-10">
                    <motion.p 
                      className="text-xl md:text-2xl text-white/50 mb-8 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      Discutons de votre projet
                    </motion.p>

                    {/* Formulaire de contact avec effet de levitation */}
                    <motion.div 
                      className="mb-8 flex justify-center"
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      viewport={{ once: true }}
                    >
                      <ContactForm />
                    </motion.div>

                    {/* Coordonnées avec apparition en cascade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto pb-8">
                      <motion.a
                        href="mailto:pixelboost22@gmail.com"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 hover:border-white/40 p-5 rounded-sm transition-colors relative overflow-hidden group"
                      >
                        {/* Effet de scan au hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <Mail className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">pixelboost22@gmail.com</span>
                      </motion.a>

                      <motion.a
                        href="tel:+33785759040"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 hover:border-white/40 p-5 rounded-sm transition-colors relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <Phone className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">07 85 75 90 40</span>
                      </motion.a>

                      <motion.a
                        href="https://www.instagram.com/pixel.boost.web/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 hover:border-white/40 p-5 rounded-sm transition-colors relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <Instagram className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">@pixel.boost.web</span>
                      </motion.a>

                      <motion.a
                        href="https://www.facebook.com/profile.php?id=61579858910169&locale=fr_FR"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 hover:border-white/40 p-5 rounded-sm transition-colors relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <Facebook className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">PixelBoost</span>
                      </motion.a>

                      <motion.a
                        href="https://www.tiktok.com/@pixelboost2"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 hover:border-white/40 p-5 rounded-sm transition-colors relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <TikTokIcon className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">@pixelboost2</span>
                      </motion.a>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center gap-3 text-white border border-white/20 p-5 rounded-sm relative overflow-hidden"
                      >
                        <MapPin className="w-5 h-5 relative z-10" />
                        <span className="text-sm text-white/70 relative z-10">Bordeaux, FR</span>
                      </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.div
                      className="text-center text-white/30 text-xs mt-16"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      © 2025 PixelBoost. Tous droits réservés.
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </section>
          
          {/* Insérer PortfolioSection après Portfolio Intro */}
          {isAfterPortfolioIntro && (
            <>
              <PortfolioSection />
              
              {/* Overlay de transition lumineuse après le portfolio */}
              <div className="relative h-screen pointer-events-none">
                <div className="sticky top-0 h-screen flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      opacity: useTransform(smoothProgress, [0.42, 0.52, 0.62], [0.3, 0.15, 0]),
                      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)',
                      filter: 'blur(80px)',
                    }}
                  />
                  
                  {/* Particules résiduelles */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={`residual-${i}`}
                      className="absolute w-1 h-1 bg-white/50 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        opacity: useTransform(smoothProgress, [0.42, 0.48, 0.56, 0.62], [0, 0.6, 0.3, 0]),
                        filter: 'blur(1px)',
                      }}
                      animate={{
                        y: [0, -100 - Math.random() * 100],
                        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </Fragment>
        );
      })}

      {/* Dialogs et overlays */}
      {selectedPackage && !showPaymentPage && !showDiscussionForm && (
        <PackageSelectionDialog
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
          onClose={() => setSelectedPackage(null)}
          onSelectPayNow={() => setShowPaymentPage(true)}
          onSelectDiscussion={() => setShowDiscussionForm(true)}
        />
      )}

      {showPaymentPage && selectedPackage && (
        <PaymentPage
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
          onClose={() => {
            setShowPaymentPage(false);
            setSelectedPackage(null);
          }}
        />
      )}

      {showDiscussionForm && selectedPackage && (
        <DiscussionForm
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
          onClose={() => {
            setShowDiscussionForm(false);
            setSelectedPackage(null);
          }}
        />
      )}

      {/* Pages légales */}
      {showMentionsLegales && (
        <MentionsLegales onClose={() => setShowMentionsLegales(false)} />
      )}

      {showPolitiqueConfidentialite && (
        <PolitiqueConfidentialite onClose={() => setShowPolitiqueConfidentialite(false)} />
      )}

      {showCGV && (
        <CGV onClose={() => setShowCGV(false)} />
      )}
    </div>
  );
}
