import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const projects = [
  {
    slug: 'les-gites-du-soulor',
    name: 'Les Gîtes du Soulor',
    category: 'Site web + Agent IA',
    year: '2025',
    url: 'http://lesgitesdusoulor.fr/',
    shortDesc: "Hébergements touristiques dans le Val d'Azun. Site vitrine et agent conversationnel pour répondre aux visiteurs.",
    fullDesc: "Les Gîtes du Soulor proposent plusieurs hébergements ruraux dans les Hautes-Pyrénées. Le projet comprenait la création d'un site vitrine moderne et l'intégration d'un agent IA capable de répondre aux questions des visiteurs sur les disponibilités, les tarifs et les règles de l'établissement.",
    problem: "Le propriétaire passait un temps considérable à répondre aux mêmes questions par email et téléphone — souvent en dehors des heures d'ouverture.",
    solution: "Création du site vitrine et installation d'un agent conversationnel formé sur toutes les informations spécifiques des gîtes. L'agent répond 24h/24 aux questions fréquentes et oriente les visiteurs vers la réservation.",
    tags: ['Site vitrine', 'Agent IA', 'Hébergement', 'Tourisme'],
  },
  {
    slug: 'portfolio-pixelboost',
    name: 'Portfolio PixelBoost',
    category: 'Site vitrine',
    year: '2025',
    shortDesc: 'Site commercial PixelBoost — présentation des offres agents IA et réalisations.',
    fullDesc: "Refonte complète du site PixelBoost. Passage d'un portfolio personnel one-page à un site commercial multi-page centré sur l'offre d'agents IA pour les entreprises.",
    problem: "Le site existant donnait l'impression d'un portfolio personnel et ne communiquait pas clairement l'offre commerciale.",
    solution: "Architecture multi-page avec un positionnement clair autour des agents IA. Design noir et blanc, animations légères, contenu orienté conversion.",
    tags: ['Site commercial', 'Multi-page', 'React', 'Dark design'],
  },
];

export default function RealisationsPage() {
  useEffect(() => {
    document.title = 'Réalisations web & IA | PixelBoost';
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 px-6 md:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-8"
          >
            Réalisations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-2xl"
          >
            Ce que nous avons construit.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl"
          >
            Sites web et agents IA — des projets réels, pour des clients réels.
          </motion.p>
        </div>
      </section>

      {/* Projets */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-px bg-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/realisations/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-6 p-8 md:p-10 bg-background hover:bg-secondary transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-4 mb-3">
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">
                      {project.year}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="font-['Chakra_Petch',monospace] text-2xl md:text-3xl text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {project.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground border border-border px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Note création de sites */}
      <section className="py-20 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Besoin d'un site ?
            </p>
            <h2 className="font-['Chakra_Petch',monospace] text-xl text-foreground mb-4">
              Besoin également d'un nouveau site ?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              PixelBoost peut concevoir ou moderniser votre site avant d'y intégrer votre agent. La création de sites reste un service que nous proposons, en complément de l'offre agents IA.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Discuter de mon projet
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
