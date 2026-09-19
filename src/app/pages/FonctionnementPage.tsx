import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const steps = [
  {
    n: '01',
    title: 'Analyse',
    text: "Nous étudions votre activité, votre site, vos services et les demandes fréquentes de vos clients. L'objectif est de comprendre ce que l'agent devra savoir et faire.",
    duration: '1 à 2 jours',
  },
  {
    n: '02',
    title: 'Configuration',
    text: "Nous créons l'agent et lui transmettons les informations spécifiques à votre entreprise : services, tarifs, règles, produits, horaires, conditions.",
    duration: '2 à 5 jours',
  },
  {
    n: '03',
    title: 'Connexions',
    text: "Selon vos besoins, nous connectons certaines sources : site web, calendriers, bases de données, formulaires, outils compatibles.",
    duration: 'Variable selon le projet',
  },
  {
    n: '04',
    title: 'Tests',
    text: "Nous testons les réponses, corrigeons les imprécisions et définissons les cas où l'agent doit transmettre la demande à un humain.",
    duration: '1 à 3 jours',
  },
  {
    n: '05',
    title: 'Installation',
    text: "L'agent est intégré directement sur votre site. Le déploiement est rapide et n'interrompt pas votre activité.",
    duration: 'Quelques heures',
  },
  {
    n: '06',
    title: 'Suivi',
    text: "Les informations peuvent être mises à jour à tout moment. L'agent peut évoluer avec les besoins de votre entreprise.",
    duration: 'Continu',
  },
];

const faq = [
  {
    q: "Qu'est-ce que je dois fournir ?",
    a: "Principalement des informations sur votre activité : services, tarifs, règles, horaires, produits. Nous vous guidons pour structurer ces informations efficacement.",
  },
  {
    q: "Est-ce compliqué à mettre en place ?",
    a: "Non. Vous n'avez pas besoin de compétences techniques. Nous gérons l'intégralité du processus technique. Votre rôle est de nous fournir les informations sur votre activité.",
  },
  {
    q: "Dois-je donner mes mots de passe ?",
    a: "Non. Nous ne demandons jamais les mots de passe personnels de nos clients. Lorsqu'une intégration nécessite un accès, nous utilisons des clés API ou des comptes dédiés avec des autorisations limitées.",
  },
  {
    q: "Comment l'agent apprend-il mes informations ?",
    a: "Lors de la configuration, nous lui transmettons vos informations sous forme structurée. L'agent les intègre et les utilise pour répondre aux questions de vos visiteurs.",
  },
  {
    q: "Comment modifier les informations ensuite ?",
    a: "Vous nous signalez les informations à mettre à jour. Nous effectuons les modifications et les appliquons à l'agent. Des mises à jour régulières sont incluses dans l'abonnement.",
  },
  {
    q: "Que se passe-t-il quand il ne connaît pas la réponse ?",
    a: "L'agent indique clairement qu'il ne peut pas répondre à cette question et oriente la personne vers vous. Il ne fabrique pas de réponses.",
  },
  {
    q: "Comment fonctionne la maintenance ?",
    a: "L'abonnement mensuel inclut la maintenance technique, les mises à jour des informations et le suivi du bon fonctionnement de l'agent.",
  },
  {
    q: "De quels accès PixelBoost a-t-il besoin ?",
    a: "Cela dépend du projet. Pour l'intégration de base, un accès à votre site suffit. Pour les connexions à des outils tiers, nous utilisons des accès adaptés et limités.",
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
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FonctionnementPage() {
  useEffect(() => {
    document.title = 'Comment installer un agent IA sur son site | PixelBoost';
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
            Fonctionnement
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl"
          >
            De votre brief à l'agent opérationnel.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl"
          >
            Un processus en six étapes, conçu pour être simple de votre côté et rigoureux du nôtre.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-px bg-border">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-background grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 p-6 md:p-10 group hover:bg-secondary transition-colors"
              >
                <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground self-start pt-1">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-['Chakra_Petch',monospace] text-xl text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
                <div className="md:text-right">
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground whitespace-nowrap">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sécurité & accès */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Accès & sécurité
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-12"
          >
            Vos données restent les vôtres.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { title: "Pas de mot de passe personnel", text: "Nous ne demandons jamais vos identifiants personnels. Les accès nécessaires sont obtenus via des mécanismes dédiés." },
              { title: "Accès limités", text: "Lorsque des intégrations sont nécessaires, nous utilisons des clés API, des comptes de service ou des autorisations restreintes." },
              { title: "Transparence totale", text: "Vous savez exactement à quels systèmes l'agent accède et pourquoi. Rien n'est fait sans votre accord explicite." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-secondary p-8"
              >
                <h3 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Questions fréquentes
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-12"
          >
            Ce que vous demandez souvent.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {faq.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-['Chakra_Petch',monospace] text-2xl md:text-3xl text-foreground mb-3">
              Prêt à démarrer ?
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Décrivez-nous votre activité. Nous analysons ensemble ce qu'un agent peut faire pour vous.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors shrink-0"
          >
            Parler de mon projet
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
