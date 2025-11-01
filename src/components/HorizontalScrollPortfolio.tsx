import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Luxe',
    category: 'Site E-Commerce',
    description: 'Boutique en ligne haut de gamme avec animations 3D et expérience utilisateur premium.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    link: '#',
    year: '2025'
  },
  {
    id: 2,
    title: 'Restaurant Gastronomique',
    category: 'Site Vitrine',
    description: 'Site vitrine élégant pour un restaurant étoilé avec réservation en ligne intégrée.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    link: '#',
    year: '2024'
  },
  {
    id: 3,
    title: 'Portfolio Architecte',
    category: 'Portfolio',
    description: 'Portfolio minimaliste avec galerie immersive et présentation de projets architecturaux.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    github: '#',
    year: '2024'
  },
  {
    id: 4,
    title: 'Application SaaS',
    category: 'Application Web',
    description: 'Dashboard complexe avec data visualization et interface utilisateur moderne.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    link: '#',
    year: '2025'
  },
  {
    id: 5,
    title: 'Agence Créative',
    category: 'Site Vitrine',
    description: 'Site d\'agence avec animations audacieuses et portfolio de projets créatifs.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    link: '#',
    year: '2024'
  }
];

export function HorizontalScrollPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Largeur totale nécessaire pour afficher tous les projets
  const projectWidth = typeof window !== 'undefined' ? window.innerWidth * 0.7 : 1000;
  const totalWidth = projectWidth * projects.length + (typeof window !== 'undefined' ? window.innerWidth * 0.3 : 300);

  // Transformer le scroll vertical en mouvement horizontal
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - (typeof window !== 'undefined' ? window.innerWidth : 1000))]
  );

  return (
    <div 
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Conteneur sticky qui reste visible pendant le scroll */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Wrapper pour le mouvement horizontal */}
        <motion.div
          style={{ x }}
          className="flex items-center gap-0"
        >
          {/* Titre de la section - fixe à gauche */}
          <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-16">
            <div>
              <h2 className="text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] tracking-tighter text-white mb-6">
                Portfolio
              </h2>
              <p className="text-2xl md:text-3xl text-white/40">Projets réalisés</p>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-xs text-white/30 uppercase tracking-widest">Scroll pour découvrir</span>
              </div>
            </div>
          </div>

          {/* Projets */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 h-screen flex items-center justify-center px-8"
              style={{ width: `${projectWidth}px` }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
                className="relative w-full h-[80vh] group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                {/* Carte de projet */}
                <div className="relative w-full h-full border border-white/10 overflow-hidden bg-black">
                  {/* Image de fond */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                  </div>

                  {/* Contenu */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    {/* Numéro */}
                    <div className="absolute top-12 right-12 text-[20vw] md:text-[15vw] opacity-[0.03] leading-none pointer-events-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Catégorie et année */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs text-white/50 uppercase tracking-[0.3em]">
                        {project.category}
                      </span>
                      <span className="text-xs text-white/30 tracking-widest">
                        {project.year}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-none">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                      {project.description}
                    </p>

                    {/* Liens */}
                    <div className="flex items-center gap-4">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm text-white uppercase tracking-widest"
                        >
                          <span>Voir le projet</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <Github className="w-6 h-6 text-white" />
                        </motion.a>
                      )}
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-white/40" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-white/40" />
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(255,255,255,0.05)]" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Écran de fin */}
          <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-16">
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-white/40 mb-8">Fin du portfolio</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-xs text-white/30 uppercase tracking-widest">Continuez à scroller</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress bar horizontal */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 z-50">
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: 'left'
            }}
            className="h-full bg-white/30"
          />
        </div>
      </div>
    </div>
  );
}
