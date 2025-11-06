import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Salon Moderne',
    category: 'Vitrine',
    description: 'Site vitrine élégant pour un salon de coiffure moderne.',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2Njg4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://salonmoderne.netlify.app/',
    year: '2025',
  },
  {
    id: 2,
    title: 'Ailleurs Voyage',
    category: 'Vitrine',
    description: 'Site d\'agence de voyage moderne avec destinations inspirantes.',
    image: 'https://images.unsplash.com/photo-1739315014260-b581f8fdfa7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NjE2NDU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://ailleurs-voyage.netlify.app/',
    year: '2025',
  },
  {
    id: 3,
    title: 'Console Nexus',
    category: 'Application',
    description: 'Plateforme interactive pour passionnés de gaming.',
    image: 'https://images.unsplash.com/photo-1700155007323-1e4f4e58d627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE3NDk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://console-nexus.netlify.app/',
    year: '2025',
  },
  {
    id: 4,
    title: 'Les Gîtes du Soulor',
    category: 'Vitrine',
    description: 'Site vitrine authentique pour des gîtes de montagne dans les Pyrénées.',
    image: 'https://images.unsplash.com/photo-1509973372076-d88f6f8ba1b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxvZGdlJTIwY2hhbGV0fGVufDF8fHx8MTc2MjEwMjgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: 'http://lesgitesdusoulor.fr/',
    year: '2025',
  }
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0); // -1 pour gauche, 1 pour droite
  const manualNavigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring ultra optimisé pour performances
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 25,
    mass: 2,
    restDelta: 0.001
  });

  // Détecter le scroll manuel pour bloquer le listener automatique
  useEffect(() => {
    const handleScroll = () => {
      // Annuler le timeout précédent
      if (isScrollingRef.current) {
        clearTimeout(isScrollingRef.current);
      }

      // Bloquer le listener automatique pendant le scroll manuel
      isScrollingRef.current = setTimeout(() => {
        isScrollingRef.current = null;
      }, 200); // Débounce de 200ms
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (isScrollingRef.current) {
        clearTimeout(isScrollingRef.current);
      }
    };
  }, []);

  // Suivre le projet actuel basé sur le scroll (UNIQUEMENT si pas de navigation manuelle active)
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      // Ne rien faire si une navigation manuelle est en cours
      if (manualNavigationTimeoutRef.current || isScrollingRef.current) return;
      
      // Zone active étendue de 0.1 à 0.90 pour plus d'espace avant la fermeture
      if (latest > 0.1 && latest < 0.90) {
        const projectProgress = (latest - 0.1) / 0.80;
        const index = Math.floor(projectProgress * projects.length);
        setCurrentProject(Math.max(0, Math.min(index, projects.length - 1)));
      }
    });
  }, [smoothProgress]);

  // Navigation avec les flèches
  const scrollToProject = (projectIndex: number) => {
    if (!containerRef.current) return;
    
    // Annuler tout timeout précédent
    if (manualNavigationTimeoutRef.current) {
      clearTimeout(manualNavigationTimeoutRef.current);
    }
    
    const container = containerRef.current;
    // Détecter si on est sur mobile ou desktop
    const isMobile = window.innerWidth < 768;
    const totalHeight = isMobile ? 500 : 800; // 500vh mobile, 800vh desktop
    const viewportHeight = window.innerHeight;
    const totalScrollHeight = (totalHeight / 100) * viewportHeight;
    
    // Zone active étendue de 0.1 à 0.90
    const projectProgressStart = 0.1 + (projectIndex / projects.length) * 0.80;
    const projectProgressMiddle = projectProgressStart + (0.80 / projects.length) / 2;
    
    // Convertir en position de scroll absolue
    const targetScrollProgress = projectProgressMiddle;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const targetScroll = containerTop + (targetScrollProgress * totalScrollHeight);
    
    // Mettre à jour IMMÉDIATEMENT le projet
    setCurrentProject(projectIndex);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Bloquer le listener automatique pendant un temps suffisamment long
    // pour couvrir le smooth scroll ET le smoothing du spring
    manualNavigationTimeoutRef.current = setTimeout(() => {
      manualNavigationTimeoutRef.current = null;
    }, 2500); // Augmenté à 2500ms pour plus de stabilité
  };

  const nextProject = () => {
    if (currentProject >= projects.length - 1) return;
    
    const nextIndex = currentProject + 1;
    setDirection(1);
    scrollToProject(nextIndex);
  };

  const prevProject = () => {
    if (currentProject <= 0) return;
    
    const prevIndex = currentProject - 1;
    setDirection(-1);
    scrollToProject(prevIndex);
  };

  // Animation fluide en 3 phases :
  // Phase 1 (0-0.1): ENTRÉE FUTURISTE - Cadre se matérialise avec effets holographiques
  // Phase 2 (0.1-0.90): Cadre rectangulaire PLEIN ÉCRAN, projets défilent un par un (TRÈS LENT)
  // Phase 3 (0.90-1): Cadre rétrécit avec effets de départ PROGRESSIFS ET LENTS
  
  const frameWidth = useTransform(
    smoothProgress,
    [0, 0.03, 0.08, 0.1, 0.90, 0.94, 0.97, 1],
    ['10vw', '40vw', '80vw', '100vw', '100vw', '80vw', '40vw', '10vw']
  );

  const frameHeight = useTransform(
    smoothProgress,
    [0, 0.03, 0.08, 0.1, 0.90, 0.94, 0.97, 1],
    ['10vh', '40vh', '80vh', '100vh', '100vh', '80vh', '40vh', '10vh']
  );

  const frameOpacity = useTransform(
    smoothProgress,
    [0, 0.03, 0.08, 0.90, 0.96, 1],
    [0, 0.7, 1, 1, 0.4, 0]
  );

  // Rotation pour l'entrée
  const frameRotate = useTransform(
    smoothProgress,
    [0, 0.1, 0.90, 1],
    [180, 0, 0, -180]
  );

  // Effets d'entrée futuriste
  const scanLineProgress = useTransform(
    smoothProgress,
    [0, 0.1],
    [0, 100]
  );

  const glowIntensity = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.90, 0.96, 1],
    [0, 1, 0.5, 0.5, 1, 0]
  );

  const cornerAssembly = useTransform(
    smoothProgress,
    [0, 0.05, 0.1],
    [0, 0.5, 1]
  );

  return (
    <div 
      ref={containerRef}
      id="portfolio"
      className="relative portfolio-container"
      data-section="portfolio"
    >
      {/* Container sticky plein écran */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" data-section="portfolio">
        
        {/* Particules convergentes lors de l'entrée */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1, 0.15], [1, 0.5, 0])
          }}
        >
          {Array.from({ length: 50 }).map((_, i) => {
            const angle = (360 / 50) * i;
            const startX = 50 + Math.cos((angle * Math.PI) / 180) * 60;
            const startY = 50 + Math.sin((angle * Math.PI) / 180) * 60;

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                  left: useTransform(smoothProgress, [0, 0.1], [`${startX}%`, '50%']),
                  top: useTransform(smoothProgress, [0, 0.1], [`${startY}%`, '50%']),
                  opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [0, 1, 0]),
                }}
              />
            );
          })}
        </motion.div>

        {/* Ondes d'énergie lors de l'entrée */}
        {[0, 1, 2, 3].map((wave) => (
          <motion.div
            key={wave}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(
                smoothProgress,
                [wave * 0.02, wave * 0.02 + 0.05, wave * 0.02 + 0.1],
                [0, 0.3, 0]
              ),
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-sm"
              style={{
                width: useTransform(smoothProgress, [wave * 0.02, wave * 0.02 + 0.1], ['0vw', '120vw']),
                height: useTransform(smoothProgress, [wave * 0.02, wave * 0.02 + 0.1], ['0vh', '120vh']),
                filter: 'blur(2px)',
              }}
            />
          </motion.div>
        ))}

        {/* Cadre principal qui grandit jusqu'à plein écran */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            opacity: frameOpacity,
            rotate: frameRotate,
            filter: useTransform(
              glowIntensity,
              [0, 1],
              ['drop-shadow(0 0 0px rgba(255,255,255,0))', 'drop-shadow(0 0 60px rgba(255,255,255,0.9))']
            ),
          }}
        >
          {/* Forme principale */}
          <motion.div 
            className="relative bg-white/98 backdrop-blur-md overflow-hidden"
            style={{
              width: frameWidth,
              height: frameHeight,
              boxShadow: useTransform(
                glowIntensity,
                [0, 1],
                [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 100px rgba(255,255,255,0.8), inset 0 0 80px rgba(255,255,255,0.2)'
                ]
              ),
            }}
          >
            {/* Bordure animée ultra-tech */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 100 }}>
              {/* Bordure principale */}
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="white"
                strokeWidth="4"
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [0, 1, 1]),
                }}
              />
              
              {/* Lignes de traçage animées */}
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="3"
                strokeDasharray="20 10"
                style={{
                  strokeDashoffset: useTransform(smoothProgress, [0, 1], [1000, 0]),
                  opacity: useTransform(smoothProgress, [0, 0.06, 0.12, 0.85, 0.93, 1], [0, 1, 0.5, 0.5, 1, 0]),
                }}
              />

              {/* Dégradé pour les lignes */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Corners qui s'assemblent */}
            {/* Top-left corner */}
            <motion.div
              className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white"
              style={{
                opacity: useTransform(cornerAssembly, [0, 1], [0, 1]),
                x: useTransform(cornerAssembly, [0, 1], [-50, 0]),
                y: useTransform(cornerAssembly, [0, 1], [-50, 0]),
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
              }}
            />
            {/* Top-right corner */}
            <motion.div
              className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-white"
              style={{
                opacity: useTransform(cornerAssembly, [0, 1], [0, 1]),
                x: useTransform(cornerAssembly, [0, 1], [50, 0]),
                y: useTransform(cornerAssembly, [0, 1], [-50, 0]),
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
              }}
            />
            {/* Bottom-left corner */}
            <motion.div
              className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-white"
              style={{
                opacity: useTransform(cornerAssembly, [0, 1], [0, 1]),
                x: useTransform(cornerAssembly, [0, 1], [-50, 0]),
                y: useTransform(cornerAssembly, [0, 1], [50, 0]),
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
              }}
            />
            {/* Bottom-right corner */}
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-white"
              style={{
                opacity: useTransform(cornerAssembly, [0, 1], [0, 1]),
                x: useTransform(cornerAssembly, [0, 1], [50, 0]),
                y: useTransform(cornerAssembly, [0, 1], [50, 0]),
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
              }}
            />

            {/* Scan lines verticales lors de l'entrée */}
            <motion.div
              className="absolute top-0 bottom-0 w-full pointer-events-none"
              style={{
                left: useTransform(scanLineProgress, (v) => `${v}%`),
                opacity: useTransform(smoothProgress, [0, 0.03, 0.1, 0.12], [0, 1, 1, 0]),
              }}
            >
              <div 
                className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  filter: 'blur(1px)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.8)',
                }}
              />
              <div 
                className="absolute inset-y-0 -left-2 w-4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  filter: 'blur(4px)',
                }}
              />
            </motion.div>

            {/* Effet holographique - lignes horizontales fines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                opacity: useTransform(smoothProgress, [0.08, 0.12], [0, 1]),
              }}
            />

            {/* Grid holographique */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: useTransform(smoothProgress, [0.08, 0.12], [0, 1]),
              }}
            />

            {/* Reflets lumineux qui traversent */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  opacity: useTransform(
                    smoothProgress,
                    [0.03 + i * 0.015, 0.05 + i * 0.015, 0.1 + i * 0.015],
                    [0, 1, 0]
                  ),
                  x: useTransform(smoothProgress, [0.03 + i * 0.015, 0.1 + i * 0.015], ['-100%', '100%']),
                }}
              />
            ))}

            {/* Contenu rotaté pour compenser la rotation du parent */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                rotate: useTransform(frameRotate, (r) => -r),
              }}
            >
              {/* Scanlines technologiques */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)',
                }}
              />

              {/* Header fixe - TEXTES TOUJOURS À 100% D'OPACITÉ */}
              <motion.div 
                className="absolute top-0 left-0 right-0 p-8 md:p-12 z-30 bg-gradient-to-b from-white/80 to-transparent"
                style={{
                  opacity: useTransform(smoothProgress, [0.08, 0.12, 0.87, 0.92], [0, 1, 1, 0])
                }}
              >
                <h2 className="text-6xl md:text-8xl lg:text-9xl text-black tracking-tighter mb-2">
                  Portfolio
                </h2>
                <p className="text-lg md:text-xl text-black">
                  Projets réalisés
                </p>
              </motion.div>

              {/* Compteur fixe - TEXTES TOUJOURS À 100% D'OPACITÉ */}
              <motion.div 
                className="absolute top-8 md:top-12 right-8 md:right-12 z-30"
                style={{
                  opacity: useTransform(smoothProgress, [0.08, 0.12, 0.87, 0.92], [0, 1, 1, 0])
                }}
              >
                <div className="text-right">
                  <div className="text-6xl md:text-8xl text-black font-mono leading-none mb-2">
                    {String(currentProject + 1).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-black uppercase tracking-widest font-mono">
                    / {String(projects.length).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>

              {/* Boutons de navigation futuristes */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 z-30"
                style={{
                  opacity: useTransform(smoothProgress, [0.08, 0.12, 0.87, 0.92], [0, 1, 1, 0])
                }}
              >
                <motion.button
                  onClick={prevProject}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                >
                  {/* Bordure externe qui pulse */}
                  <div className="absolute inset-0 border-2 border-black animate-pulse" />
                  
                  {/* Corners futuristes */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-black" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-black" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-black" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-black" />
                  
                  {/* Bouton principal */}
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-black/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  {/* Ligne animée */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-[2px] bg-white"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </motion.div>

              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-30"
                style={{
                  opacity: useTransform(smoothProgress, [0.08, 0.12, 0.87, 0.92], [0, 1, 1, 0])
                }}
              >
                <motion.button
                  onClick={nextProject}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                >
                  {/* Bordure externe qui pulse */}
                  <div className="absolute inset-0 border-2 border-black animate-pulse" />
                  
                  {/* Corners futuristes */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-black" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-black" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-black" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-black" />
                  
                  {/* Bouton principal */}
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-black/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  {/* Ligne animée */}
                  <motion.div
                    className="absolute top-0 right-0 h-full w-[2px] bg-white"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </motion.div>

              {/* Container des projets - navigation manuelle avec scroll horizontal */}
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 overflow-hidden">
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                  {/* Projets empilés avec effet de scroll horizontal */}
                  {projects.map((project, index) => {
                    const isActive = index === currentProject;
                    const isPrev = index === currentProject - 1 || (currentProject === 0 && index === projects.length - 1);
                    const isNext = index === currentProject + 1 || (currentProject === projects.length - 1 && index === 0);
                    
                    // Position basée sur la direction
                    let xPosition = '0%';
                    if (isActive) {
                      xPosition = '0%';
                    } else if (isPrev) {
                      xPosition = '-120%';
                    } else if (isNext) {
                      xPosition = '120%';
                    } else if (index < currentProject) {
                      xPosition = '-120%';
                    } else {
                      xPosition = '120%';
                    }

                    return (
                      <motion.div
                        key={project.id}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={false}
                        animate={{
                          x: xPosition,
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.85,
                        }}
                        transition={{
                          type: "tween",
                          duration: 0.35,
                          ease: "easeInOut"
                        }}
                        style={{
                          willChange: 'transform, opacity'
                        }}
                      >
                        <a
                          href={project.link || project.github || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group cursor-pointer w-full max-w-5xl"
                        >
                          <div className="relative border-4 border-black overflow-hidden bg-white transition-all duration-500 hover:border-black hover:shadow-[0_0_80px_rgba(0,0,0,0.3)] hover:scale-[1.02]">
                            
                            {/* Layout en grid responsive */}
                            <div className="grid md:grid-cols-2 gap-0">
                              
                              {/* Image côté gauche */}
                              <div className="relative h-[300px] md:h-[500px] overflow-hidden order-2 md:order-1">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/50 via-transparent to-transparent" />
                                
                                {/* Année en filigrane */}
                                <div className="absolute bottom-8 right-8 text-[120px] md:text-[180px] text-white/20 leading-none pointer-events-none select-none">
                                  {project.year}
                                </div>
                              </div>

                              {/* Contenu côté droit - TOUS LES TEXTES BIEN VISIBLES */}
                              <div className="relative p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
                                
                                {/* Badge catégorie */}
                                <div className="inline-flex items-center px-6 py-3 bg-black mb-6 self-start">
                                  <span className="text-[10px] text-white uppercase tracking-[0.3em]">
                                    {project.category}
                                  </span>
                                </div>

                                {/* Numéro */}
                                <div className="text-[10px] text-black uppercase tracking-[0.35em] mb-4">
                                  Projet {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Titre - NOIR PUR */}
                                <h3 className="text-4xl md:text-6xl lg:text-7xl text-black mb-6 tracking-tight leading-[0.95]">
                                  {project.title}
                                </h3>

                                {/* Description - NOIR PUR */}
                                <p className="text-base md:text-lg text-black mb-8 leading-relaxed max-w-md">
                                  {project.description}
                                </p>

                                {/* Ligne décorative */}
                                <div className="w-24 h-[2px] bg-black mb-8" />

                                {/* Actions */}
                                <div className="flex items-center gap-4">
                                  {project.link && (
                                    <span className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-[10px] uppercase tracking-[0.25em] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                      <span>Voir le projet</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </span>
                                  )}
                                  {project.github && (
                                    <span className="inline-flex items-center justify-center w-14 h-14 border-2 border-black transition-all duration-300 group-hover:bg-black group-hover:border-black">
                                      <Github className="w-5 h-5 text-black group-hover:text-white" />
                                    </span>
                                  )}
                                </div>

                                {/* Corners décoratifs */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black transition-all duration-300 group-hover:w-12 group-hover:h-12" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black transition-all duration-300 group-hover:w-12 group-hover:h-12" />
                              </div>
                            </div>

                            {/* Ligne animée en haut */}
                            <motion.div
                              className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black/80 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 0.5
                              }}
                            />
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Barre de progression en bas */}
              <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-96 z-30"
                style={{
                  opacity: useTransform(smoothProgress, [0.08, 0.12, 0.87, 0.92], [0, 1, 1, 0])
                }}
              >
                <div className="relative h-1 bg-black/30 overflow-hidden">
                  <motion.div
                    className="absolute h-full bg-black"
                    style={{
                      width: useTransform(smoothProgress, [0.15, 0.87], ['0%', '100%'])
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Points lumineux aux coins externes qui pulsent */}
          {[
            { x: -30, y: -30 },
            { x: 30, y: -30 },
            { x: -30, y: 30 },
            { x: 30, y: 30 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-white"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                opacity: useTransform(smoothProgress, [0, 0.1, 0.2, 0.8, 0.9, 1], [0, 1, 0.6, 0.6, 1, 0]),
                scale: useTransform(smoothProgress, [0, 0.1, 0.2], [0, 1.5, 1]),
                filter: 'blur(2px)',
                boxShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </motion.div>

        {/* Particules blanches qui continuent (spirale) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Indicateur de scroll pour sortir du portfolio - Mobile uniquement */}
        <motion.div
          className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(smoothProgress, [0.75, 0.80, 0.90, 0.94], [0, 1, 1, 0])
          }}
        >
          <div className="text-white/60 text-xs uppercase tracking-widest mb-2">
            Continuez à scroller
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
          </motion.div>
        </motion.div>
      </div>

      {/* Transition lumineuse qui se prolonge après la fermeture du cadre */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(smoothProgress, [0.90, 0.96, 1], [0.8, 0.4, 0]),
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Éclats de lumière dispersés pour transition douce */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (360 / 12) * i;
        const distance = 40 + (i % 3) * 10;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * distance;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={`glow-${i}`}
            className="absolute w-2 h-2 rounded-full bg-white/80"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              opacity: useTransform(smoothProgress, [0.9, 0.94, 0.98, 1], [0, 1, 0.3, 0]),
              scale: useTransform(smoothProgress, [0.9, 0.95, 1], [0, 1.5, 2]),
              filter: 'blur(3px)',
              boxShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)',
            }}
          />
        );
      })}
    </div>
  );
}
