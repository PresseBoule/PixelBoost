import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from './RealisationsPage';

export default function ProjetPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} — Réalisation PixelBoost`;
    } else {
      document.title = 'Projet introuvable | PixelBoost';
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-widest uppercase mb-4">404</p>
        <h1 className="font-['Chakra_Petch',monospace] text-3xl text-foreground mb-6">Projet introuvable</h1>
        <Link
          to="/realisations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Retour aux réalisations
        </Link>
      </div>
    );
  }

  const nextIndex = (projects.indexOf(project) + 1) % projects.length;
  const nextProject = projects[nextIndex];

  return (
    <div className="overflow-x-hidden">
      {/* Back link */}
      <div className="px-6 md:px-10 pt-8 pb-0">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} />
            Réalisations
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-baseline gap-4 mb-6"
          >
            <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">{project.year}</span>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">{project.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8"
          >
            {project.fullDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground border border-border px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {project.url && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
              >
                Voir le site
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Détail du projet */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-12"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-6">
                Problématique
              </p>
              <p className="text-base text-foreground leading-relaxed">{project.problem}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-secondary p-8 md:p-12"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-6">
                Solution
              </p>
              <p className="text-base text-foreground leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projet suivant */}
      <section className="border-t border-border">
        <Link
          to={`/realisations/${nextProject.slug}`}
          className="group flex items-center justify-between gap-6 px-6 md:px-10 py-10 hover:bg-secondary transition-colors"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div>
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground mb-2">Projet suivant</p>
              <p className="font-['Chakra_Petch',monospace] text-xl text-foreground group-hover:text-foreground/80 transition-colors">
                {nextProject.name}
              </p>
            </div>
            <ArrowUpRight
              size={20}
              className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}
