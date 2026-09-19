import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const tiers = [
  {
    name: 'Agent Essentiel',
    tagline: "L'essentiel pour répondre à vos visiteurs.",
    price: 'Sur devis',
    priceSub: 'Installation + abonnement mensuel',
    features: [
      'Agent conversationnel personnalisé',
      'Réponses aux questions fréquentes',
      'Formation sur vos informations spécifiques',
      'Intégration directe sur votre site',
      'Fallback vers vos coordonnées',
      'Mises à jour incluses',
      'Maintenance mensuelle',
    ],
  },
  {
    name: 'Agent Connecté',
    tagline: "Pour les entreprises souhaitant aller plus loin.",
    price: 'Sur devis',
    priceSub: 'Installation + abonnement mensuel',
    featured: true,
    features: [
      'Tout ce qui est inclus dans Essentiel',
      'Connexion aux calendriers',
      'Connexion aux formulaires',
      'Bases de données ou sources de données',
      'Automatisations simples',
      'Qualification des prospects',
      "Rapport mensuel d'utilisation",
    ],
  },
  {
    name: 'Agent Sur mesure',
    tagline: 'Pour les besoins complexes ou multi-canaux.',
    price: 'Sur devis',
    priceSub: 'Projet personnalisé',
    features: [
      'Tout ce qui est inclus dans Connecté',
      'Workflows personnalisés avancés',
      'Intégrations API sur mesure',
      'Automatisations complexes',
      'Email ou autres canaux (si compatible)',
      'Architecture spécifique à votre métier',
      'Accompagnement renforcé',
    ],
  },
];

const faqItems = [
  {
    q: "Y a-t-il des frais d'installation ?",
    a: "Oui. L'installation de l'agent implique un travail d'analyse, de configuration et d'intégration qui est facturé une seule fois au démarrage du projet.",
  },
  {
    q: "L'abonnement mensuel est-il obligatoire ?",
    a: "Oui. L'abonnement couvre la maintenance technique de l'agent, les mises à jour de ses informations et le suivi de son bon fonctionnement. Il garantit que l'agent reste opérationnel et à jour.",
  },
  {
    q: "Peut-on modifier l'agent après l'installation ?",
    a: "Oui. Vous pouvez nous signaler à tout moment les informations à mettre à jour. Les modifications sont incluses dans l'abonnement.",
  },
  {
    q: "Que comprend la maintenance ?",
    a: "La maintenance inclut la surveillance du bon fonctionnement de l'agent, les corrections éventuelles, les mises à jour des informations et le support technique.",
  },
  {
    q: "Les coûts d'API sont-ils inclus ?",
    a: "Les coûts liés aux API de modèles de langage sont facturés au coût réel. Ils sont variables selon l'usage. Nous vous informons de ces coûts lors de la présentation du projet.",
  },
  {
    q: "Peut-on ajouter des intégrations plus tard ?",
    a: "Oui. Il est possible de faire évoluer l'agent et d'ajouter des connexions après l'installation initiale. Cela peut nécessiter des frais supplémentaires selon la complexité.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base text-foreground">{q}</span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

export default function TarifsPage() {
  useEffect(() => {
    document.title = 'Tarifs agents IA | PixelBoost';
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
            Tarifs
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-2xl"
          >
            Ce qui est réellement utile. Pas plus.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl"
          >
            Chaque entreprise n'a pas besoin du même niveau d'automatisation. Nous définissons ensemble ce qui est réellement adapté à votre situation.
          </motion.p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col p-8 md:p-10 ${tier.featured ? 'bg-card' : 'bg-background'}`}
              >
                {tier.featured && (
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-widest uppercase mb-6">
                    Le plus demandé
                  </p>
                )}
                <h2 className="font-['Chakra_Petch',monospace] text-xl text-foreground mb-2">
                  {tier.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{tier.tagline}</p>

                <div className="mb-8 pb-8 border-b border-border">
                  <p className="font-['Chakra_Petch',monospace] text-2xl text-foreground mb-1">{tier.price}</p>
                  <p className="text-xs text-muted-foreground">{tier.priceSub}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-10">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={13} className="text-foreground/50 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 text-sm py-3.5 px-5 transition-colors ${
                    tier.featured
                      ? 'font-["Chakra_Petch",monospace] tracking-wider text-background bg-foreground hover:bg-foreground/85'
                      : 'text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  Discuter de mon projet
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mt-8 p-6 bg-secondary border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">Besoin également d'un site ?</span>{' '}
              PixelBoost peut concevoir ou moderniser votre site avant d'y intégrer votre agent. Mentionnez-le lors de votre prise de contact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ tarifaire */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Questions sur les tarifs
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-12"
          >
            Ce que vous voulez savoir avant de démarrer.
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {faqItems.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-foreground mb-4"
          >
            Parlons de ce dont vous avez besoin.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base mb-8 max-w-sm mx-auto"
          >
            Décrivez simplement votre activité. Nous vous proposons la solution adaptée.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-8 py-4 hover:bg-foreground/85 transition-colors"
            >
              Parler de mon projet
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
