import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bot } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const conversations = [
  {
    label: "Questions fréquentes",
    messages: [
      { role: 'user', text: "Quels sont vos horaires ?" },
      { role: 'agent', text: "Nous sommes ouverts du lundi au vendredi de 9h à 18h. Le samedi sur rendez-vous uniquement." },
      { role: 'user', text: "Proposez-vous des devis ?" },
      { role: 'agent', text: "Oui. Vous pouvez décrire votre projet via notre formulaire ou me laisser vos coordonnées pour qu'un conseiller vous rappelle." },
    ],
  },
  {
    label: "Qualification d'un prospect",
    messages: [
      { role: 'user', text: "Je cherche quelqu'un pour refaire mon site." },
      { role: 'agent', text: "Avec plaisir. Pour mieux vous orienter : quel type d'activité exercez-vous ?" },
      { role: 'user', text: "Je suis artisan plombier." },
      { role: 'agent', text: "Parfait. Vous avez besoin d'un site vitrine avec prise de contact, ou également d'une gestion de devis en ligne ?" },
    ],
  },
  {
    label: "Disponibilités connectées",
    messages: [
      { role: 'user', text: "Y a-t-il encore des places pour le 15 novembre ?" },
      { role: 'agent', text: "Je consulte les disponibilités… Le créneau du 15 novembre à 14h est encore libre. Souhaitez-vous que je vous aide à réserver ?" },
      { role: 'user', text: "Oui, pour 2 personnes." },
      { role: 'agent', text: "Je vous redirige vers le formulaire de réservation avec ces informations pré-remplies." },
    ],
  },
];

function ConversationBlock({ conv, selected, onClick }: {
  conv: typeof conversations[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-full text-left px-5 py-4 border-b border-border flex items-center justify-between gap-4 transition-colors ${
          selected ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
      >
        <span className="text-sm font-['Chakra_Petch',monospace]">{conv.label}</span>
        <ArrowRight size={13} className={`shrink-0 transition-transform ${selected ? 'rotate-90' : ''}`} />
      </button>
      {selected && (
        <div className="bg-card border-b border-border p-5 space-y-3">
          {conv.messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-foreground text-background'
                    : 'bg-secondary border border-border text-foreground'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const capabilities = [
  { title: "Il sait ce que vous lui apprenez", text: "L'agent connaît vos services, tarifs, règles, horaires et toutes les informations que vous lui transmettez lors de la configuration." },
  { title: "Il consulte certaines données", text: "Selon votre projet, il peut être connecté à des calendriers, bases de données ou formulaires compatibles pour répondre avec des données en temps réel." },
  { title: "Il qualifie vos visiteurs", text: "Avant de transmettre une demande, il peut poser les bonnes questions pour vous faire gagner du temps." },
  { title: "Il sait quand passer la main", text: "Lorsqu'une situation dépasse ses capacités, l'agent l'indique clairement et oriente la personne vers vous ou votre équipe." },
  { title: "Il évolue avec vous", text: "Les informations peuvent être mises à jour à tout moment. L'agent suit l'évolution de votre activité." },
  { title: "Il ne prétend pas être humain", text: "L'agent se présente comme un assistant automatisé. La transparence est une valeur que nous intégrons dès la configuration." },
];

export default function AgentIAPage() {
  const [selectedConv, setSelectedConv] = useState(0);

  useEffect(() => {
    document.title = 'Agent IA pour site web | PixelBoost';
    window.dispatchEvent(new Event('pixelboost:open-agent'));
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
            Agent IA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl"
          >
            Un assistant qui connaît votre entreprise.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
          >
            Un agent web PixelBoost est un programme conversationnel intégré à votre site, formé sur les informations spécifiques à votre activité.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
            >
              Discuter de mon projet
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ce qu'il peut faire */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Capacités
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-16"
          >
            Ce qu'il peut faire. Ce qu'il ne peut pas.
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-background p-8"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Bot size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                  <h3 className="font-['Chakra_Petch',monospace] text-base text-foreground">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mt-8 p-6 bg-secondary border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Important : </span>
              les capacités de l'agent dépendent directement des informations qui lui sont transmises et des intégrations mises en place. Nous ne promettons que ce qui est techniquement réalisable dans votre contexte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exemples de conversations */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            En pratique
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-12"
          >
            Des exemples concrets.
          </motion.h2>

          <div className="border border-border bg-background">
            {conversations.map((conv, i) => (
              <ConversationBlock
                key={i}
                conv={conv}
                selected={selectedConv === i}
                onClick={() => setSelectedConv(selectedConv === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sources de connexion */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Intégrations
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-6"
          >
            Connecté à vos sources.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground leading-relaxed max-w-xl mb-12">
            Selon votre projet, l'agent peut accéder à différentes sources d'information.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
            {['Site web', 'Calendriers', 'Formulaires', 'Bases de données', 'API', 'Email'].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-background p-6 text-center"
              >
                <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground mb-2">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-sm text-foreground">{s}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} transition={{ delay: 0.15 }} className="mt-6 text-xs text-muted-foreground">
            Les connexions disponibles dépendent de votre infrastructure et sont définies lors de l'analyse de votre projet.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-['Chakra_Petch',monospace] text-2xl md:text-3xl text-foreground mb-3">
              Vous voulez voir ça en vrai ?
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Consultez le cas client Les Gîtes du Soulor — un agent en production avec de vrais exemples de conversations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/cas-client"
              className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-5 py-3 hover:bg-foreground/85 transition-colors"
            >
              Voir le cas client
            </Link>
            <a
              href="http://lesgitesdusoulor.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-5 py-3 hover:text-foreground transition-colors"
            >
              Voir le site réel
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
