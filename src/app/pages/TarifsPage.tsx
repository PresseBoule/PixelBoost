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
    name: 'Assistant IA',
    tagline: "Un assistant personnalisé pour votre site existant compatible.",
    price: 'Sur devis',
    priceSub: 'Installation + abonnement mensuel',
    projectType: 'Assistant IA',
    features: [
      'Agent conversationnel personnalisé',
      'Réponses aux questions fréquentes',
      'Configuration avec vos informations',
      'Intégration sur un site compatible',
      'Orientation vers un contact humain',
      'Connexions possibles après étude',
    ],
  },
  {
    name: 'Site web',
    tagline: "Un site professionnel pour présenter votre activité et recevoir des demandes.",
    price: 'Sur devis',
    priceSub: 'Projet adapté à votre activité',
    projectType: 'Site web',
    features: [
      'Site professionnel personnalisé',
      'Affichage adapté aux mobiles',
      'Présentation de vos services',
      'Parcours de prise de contact',
      'Optimisation SEO technique de base',
      'Fonctionnalités supplémentaires après étude',
    ],
  },
  {
    name: 'Site web + assistant IA',
    tagline: 'Un site professionnel et son assistant, conçus ensemble.',
    price: 'Sur devis',
    priceSub: "Création du site + installation de l'assistant",
    projectType: 'Site web + Assistant IA',
    featured: true,
    features: [
      'Site professionnel adapté aux mobiles',
      'Assistant IA personnalisé intégré au site',
      'Réponses aux questions fréquentes',
      'Orientation vers un contact humain',
      'Parcours de contact cohérent',
      'Intégrations possibles après étude',
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
    document.title = 'Offres sites web et assistants IA | PixelBoost';
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
            Offres
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
            Site web, assistant IA ou les deux : choisissez le point de départ adapté à votre projet. Chaque prestation est proposée sur devis.
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
                    Solution combinée
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
                  to={`/contact?prestation=${encodeURIComponent(tier.projectType)}`}
                  className={`inline-flex items-center justify-center gap-2 text-sm py-3.5 px-5 transition-colors ${
                    tier.featured
                      ? 'font-["Chakra_Petch",monospace] tracking-wider text-background bg-foreground hover:bg-foreground/85'
                      : 'text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  Demander un devis gratuit
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mt-8 p-6 bg-secondary border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">Un besoin particulier ?</span>{' '}
              Les fonctionnalités et connexions sont définies selon votre activité et la compatibilité de vos outils.
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
