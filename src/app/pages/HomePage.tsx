import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const chatMessages = [
  { role: 'user', text: 'Avez-vous des disponibilités ce week-end ?' },
  {
    role: 'agent',
    text: "Oui. Le Gîte Le Soum est disponible du vendredi au dimanche. Souhaitez-vous que je vous donne les détails tarifaires ?",
  },
  { role: 'user', text: 'Quels sont les tarifs ?' },
  {
    role: 'agent',
    text: "Le Soum est à 120 €/nuit pour 2 personnes. Je peux vous aider à initier une réservation si vous le souhaitez.",
  },
];

function ChatDemo() {
  const [visible, setVisible] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setVisible([]);
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    const delays = [400, 1600, 2800, 4000];
    delays.forEach((d, i) => {
      const t = setTimeout(() => setVisible((prev) => [...prev, i]), d);
      timerRef.current.push(t);
    });
    const loop = setTimeout(
      () => {
        setVisible([]);
        timerRef.current.forEach(clearTimeout);
        timerRef.current = [];
        const delays2 = [400, 1600, 2800, 4000];
        delays2.forEach((d, i) => {
          const t = setTimeout(() => setVisible((prev) => [...prev, i]), d);
          timerRef.current.push(t);
        });
      },
      6500
    );
    timerRef.current.push(loop);
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-card border border-border p-5 space-y-4 w-full max-w-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-foreground/30" />
        <span className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider">
          Agent PixelBoost — Les Gîtes du Soulor
        </span>
      </div>
      <div className="space-y-3 min-h-[180px]">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={visible.includes(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground border border-border'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {visible.length > 0 && visible.length < 4 && (
          <div className="flex justify-start">
            <div className="bg-secondary border border-border px-3.5 py-2.5">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-muted-foreground"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const benefits = [
  'Moins de questions répétitives',
  'Réponses instantanées, 24h/24',
  'Prospects mieux qualifiés',
  'Moins de demandes perdues',
  'Expérience client plus fluide',
  'Votre site travaille pendant votre sommeil',
];

const capabilities = [
  {
    n: '01',
    title: 'Répondre instantanément',
    text: "Réponses automatiques aux questions fréquentes de vos visiteurs, disponibles en permanence.",
  },
  {
    n: '02',
    title: 'Connaître votre entreprise',
    text: "Services, tarifs, horaires, règles, produits : l'agent sait ce que vous lui apprenez.",
  },
  {
    n: '03',
    title: 'Consulter certaines données',
    text: "Possibilité de connecter des calendriers, formulaires ou bases de données compatibles.",
  },
  {
    n: '04',
    title: 'Qualifier vos prospects',
    text: "L'agent peut collecter des informations importantes avant une prise de contact.",
  },
  {
    n: '05',
    title: 'Automatiser certaines demandes',
    text: "Demandes simples, formulaires et processus répétitifs partiellement automatisés.",
  },
  {
    n: '06',
    title: 'Transmettre à un humain',
    text: "Lorsque la situation l'exige, l'agent oriente la personne vers votre équipe.",
  },
];

const steps = [
  { n: '01', title: 'Analyse', text: "Nous étudions votre activité, vos clients et vos demandes fréquentes." },
  { n: '02', title: 'Configuration', text: "Nous créons et formons l'agent avec vos informations spécifiques." },
  { n: '03', title: 'Installation', text: "L'agent est intégré directement sur votre site, opérationnel immédiatement." },
];

const tiers = [
  {
    name: 'Agent Essentiel',
    desc: "Réponses aux questions fréquentes, personnalisation complète, intégration au site.",
    cta: 'Discuter de ce projet',
  },
  {
    name: 'Agent Connecté',
    desc: "Tout l'Essentiel, plus la connexion à vos calendriers, formulaires et bases de données.",
    cta: 'Discuter de ce projet',
    featured: true,
  },
  {
    name: 'Agent Sur mesure',
    desc: "Workflows avancés, intégrations API, automatisations complexes, canaux multiples.",
    cta: 'Discuter de ce projet',
  },
];

export default function HomePage() {
  useEffect(() => {
    document.title = 'Agents IA pour entreprises | PixelBoost';
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ───── HERO ───── */}
      <section className="min-h-[90vh] flex items-center px-6 md:px-10 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-8"
              >
                PixelBoost — Agents IA pour entreprises
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-['Chakra_Petch',monospace] text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] tracking-tight text-foreground mb-6"
              >
                Des agents IA qui répondent<br className="hidden md:block" /> à vos clients 24h/24.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
              >
                PixelBoost installe des agents intelligents personnalisés pour répondre à vos visiteurs,
                automatiser certaines demandes et transformer votre site en assistant commercial.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link
                  to="/agent-ia"
                  className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
                >
                  Tester l'agent
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/fonctionnement"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-6 py-3.5 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  Voir comment ça fonctionne
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-xs text-muted-foreground tracking-wide"
              >
                Installation personnalisée · Aucune compétence technique nécessaire
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hidden lg:block"
            >
              <ChatDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile chat demo */}
      <section className="lg:hidden px-6 md:px-10 pb-20">
        <div className="max-w-sm mx-auto">
          <ChatDemo />
        </div>
      </section>

      {/* ───── DEMO CTA ───── */}
      <section className="border-t border-border py-20 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-['Chakra_Petch',monospace] text-2xl md:text-3xl text-foreground mb-3">
              Ne nous croyez pas sur parole. Testez-le.
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              Posez une question à notre agent et découvrez directement ce que vos propres clients pourraient utiliser sur votre site.
            </p>
          </div>
          <Link
            to="/agent-ia"
            className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors shrink-0"
          >
            Parler avec l'agent PixelBoost
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* ───── BÉNÉFICES ───── */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Pourquoi un agent IA
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-16"
          >
            Ce que ça change, concrètement.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-background p-8 flex items-start gap-4"
              >
                <CheckCircle2 size={16} className="text-foreground/40 mt-0.5 shrink-0" />
                <span className="text-foreground text-base leading-snug">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CAPACITÉS ───── */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Ce que l'agent peut faire
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-16"
          >
            Ses capacités principales.
          </motion.h2>

          <div className="space-y-px bg-border">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-secondary grid grid-cols-[auto_1fr_1fr] md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-10 p-6 md:p-8 group hover:bg-card transition-colors"
              >
                <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground self-start pt-1">
                  {cap.n}
                </span>
                <span className="font-['Chakra_Petch',monospace] text-lg text-foreground self-start">
                  {cap.title}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed col-start-2 col-span-2 md:col-start-auto md:col-span-1">
                  {cap.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-10 flex justify-start"
          >
            <Link
              to="/agent-ia"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              En savoir plus sur l'agent
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───── AVANT / APRÈS ───── */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Le changement
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-16"
          >
            Avant. Après.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary p-8 md:p-12"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-widest uppercase mb-8">
                Avant
              </p>
              <div className="space-y-6 text-sm text-muted-foreground">
                {['Visiteur arrive sur votre site', 'Cherche une information', "Ne la trouve pas facilement", "Repart, ou appelle"].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-['JetBrains_Mono',monospace] text-xs opacity-40 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span className={i === 2 || i === 3 ? 'text-foreground/40 line-through' : ''}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 md:p-12 border-l-0 md:border-l border-border"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-foreground tracking-widest uppercase mb-8">
                Après
              </p>
              <div className="space-y-6 text-sm">
                {["Visiteur arrive sur votre site", "Pose sa question à l'agent", "Obtient une réponse immédiate", "Poursuit sa réservation ou sa demande"].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── CAS CLIENT ───── */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Cas client
          </motion.p>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-6"
              >
                Les Gîtes du Soulor — un agent en production.
              </motion.h2>
              <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground leading-relaxed mb-8">
                Hébergements touristiques dans le Val d'Azun. L'agent répond aux questions des visiteurs sur les disponibilités, les tarifs et les règles de l'établissement — directement sur le site, à toute heure.
              </motion.p>
              <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-wrap gap-4">
                <Link
                  to="/cas-client"
                  className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-5 py-3 hover:bg-foreground/85 transition-colors"
                >
                  Voir le cas complet
                </Link>
                <a
                  href="http://lesgitesdusoulor.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  Voir le site réel
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border p-6 space-y-4"
            >
              {[
                { u: 'Les animaux sont-ils acceptés ?', a: "Les chiens sont acceptés dans certains gîtes sous conditions. Le Soum et Le Suyen les acceptent, avec un supplément de 5 €/nuit. Souhaitez-vous des précisions ?" },
                { u: 'Le Suyen est-il disponible du 12 au 14 octobre ?', a: "Je vérifie les disponibilités… Le Suyen est libre sur ces dates. Souhaitez-vous que je vous indique comment réserver ?" },
              ].map((msg, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-foreground text-background text-sm px-3.5 py-2.5 max-w-[80%] leading-relaxed">
                      {msg.u}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary border border-border text-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed text-foreground">
                      {msg.a}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── FONCTIONNEMENT RÉSUMÉ ───── */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Comment ça marche
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-16"
          >
            De votre brief à l'agent opérationnel.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-px bg-border mb-10">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8"
              >
                <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground mb-6">{s.n}</p>
                <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <Link
              to="/fonctionnement"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Voir le processus complet en 6 étapes
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───── OFFRES RÉSUMÉES ───── */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Offres
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-4"
          >
            Choisissez votre niveau.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-sm mb-16 max-w-lg">
            Chaque entreprise n'a pas les mêmes besoins. Nous définissons ensemble ce qui est réellement utile.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-px bg-border mb-10">
            {tiers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-8 flex flex-col justify-between gap-8 ${t.featured ? 'bg-card' : 'bg-secondary'}`}
              >
                <div>
                  {t.featured && (
                    <p className="text-xs font-['JetBrains_Mono',monospace] text-foreground tracking-widest uppercase mb-4">
                      Le plus choisi
                    </p>
                  )}
                  <h3 className="font-['Chakra_Petch',monospace] text-xl text-foreground mb-3">{t.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
                <Link
                  to="/tarifs"
                  className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground border border-border px-4 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  Voir les détails
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <Link
              to="/tarifs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Voir toutes les offres en détail
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───── RÉALISATIONS PREVIEW ───── */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Réalisations
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.05 }}
              className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground"
            >
              Ce que nous avons construit.
            </motion.h2>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Link
                to="/realisations"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir toutes les réalisations
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="space-y-px bg-border">
            {[
              { slug: 'les-gites-du-soulor', name: 'Les Gîtes du Soulor', cat: 'Site web + Agent IA', year: '2025' },
              { slug: 'portfolio-pixelboost', name: 'Portfolio PixelBoost', cat: 'Site vitrine', year: '2025' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/realisations/${p.slug}`}
                  className="flex items-center justify-between gap-6 p-6 md:p-8 bg-background hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-8">
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">{p.year}</span>
                    <span className="font-['Chakra_Petch',monospace] text-lg text-foreground">{p.name}</span>
                    <span className="hidden md:block text-sm text-muted-foreground">{p.cat}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="py-32 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4rem)] leading-tight text-foreground mb-6"
          >
            Parlons de votre projet.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-10 max-w-md mx-auto"
          >
            Décrivez-nous votre activité. Nous définissons ensemble ce qu'un agent peut faire pour vous.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
