import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page introuvable | PixelBoost';
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-[0.3em] uppercase mb-6"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-['Chakra_Petch',monospace] text-4xl md:text-6xl text-foreground mb-4"
      >
        Page introuvable.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-base mb-10 max-w-sm"
      >
        Cette page n'existe pas ou a été déplacée.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
