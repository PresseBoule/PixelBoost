import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const conversations = [
  {
    label: 'Découverte des gîtes',
    messages: [
      { role: 'user', text: 'Quels gîtes proposez-vous ?' },
      { role: 'agent', text: "Nous proposons plusieurs hébergements dans le Val d'Azun : Le Soum (4 pers.), Le Suyen (6 pers.), et Le Pibeste (2 pers.). Lequel vous intéresse ?" },
    ],
  },
  {
    label: 'Règles & conditions',
    messages: [
      { role: 'user', text: 'Les animaux sont-ils acceptés ?' },
      { role: 'agent', text: "Les chiens sont acceptés au Soum et au Suyen, avec un supplément de 5 €/nuit et sous conditions. Les chats ne sont pas acceptés dans les gîtes. Souhaitez-vous d'autres précisions ?" },
    ],
  },
  {
    label: 'Disponibilités',
    messages: [
      { role: 'user', text: 'Le Suyen est-il disponible du 12 au 14 octobre ?' },
      { role: 'agent', text: "Je consulte les disponibilités… Le Suyen est libre sur ces dates. Le tarif pour 2 nuits est de 280 €. Souhaitez-vous que je vous aide à initier une réservation ?" },
    ],
  },
  {
    label: 'Activités & environnement',
    messages: [
      { role: 'user', text: "Quelles activités peut-on faire dans la région ?" },
      { role: 'agent', text: "Le Val d'Azun offre de nombreuses randonnées, dont l'accès au lac d'Estaing et aux cols pyrénéens. Il y a aussi des activités équestres et des lacs de montagne à proximité. Vous souhaitez que je vous précise quelque chose ?" },
    ],
  },
];

function ConvBlock({ conv }: { conv: typeof conversations[0] }) {
  return (
    <div className="border border-border p-5 bg-background">
      <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-wider mb-4">{conv.label}</p>
      <div className="space-y-2.5">
        {conv.messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
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
    </div>
  );
}

const agentInfo = [
  { title: "Présentation des hébergements", text: "Le Soum, Le Suyen, Le Pibeste — l'agent connaît les capacités, équipements et spécificités de chaque gîte." },
  { title: "Tarifs & conditions", text: "Tarifs par nuit selon la saison, conditions d'annulation, règles de l'établissement, suppléments." },
  { title: "Disponibilités connectées", text: "Lorsque les calendriers sont synchronisés, l'agent peut indiquer en temps réel si un hébergement est libre." },
  { title: "Équipements & prestations", text: "Équipements de cuisine, literie, wifi, espace bien-être, accès extérieur, parkings." },
  { title: "Informations pratiques", text: "Accès, horaires d'arrivée et de départ, contacts d'urgence, informations locales." },
  { title: "Orientation & qualification", text: "L'agent aide le visiteur à choisir le bon gîte selon ses besoins et recueille les informations avant contact." },
];

export default function CasClientPage() {
  useEffect(() => {
    document.title = "Agent IA pour hébergement touristique — Les Gîtes du Soulor | PixelBoost";
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
            Cas client
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl"
          >
            Les Gîtes du Soulor — un agent en production.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
          >
            Hébergements touristiques situés dans le Val d'Azun, Pyrénées. Un cas réel qui montre concrètement ce qu'un agent PixelBoost peut faire pour une activité d'accueil.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="http://lesgitesdusoulor.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
            >
              Voir le site des Gîtes du Soulor
              <ExternalLink size={14} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-6 py-3.5 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Je veux la même chose
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contexte */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-px bg-border">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-background p-8"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-4">Le client</p>
              <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">Les Gîtes du Soulor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hébergements touristiques dans le Val d'Azun, Hautes-Pyrénées. Plusieurs gîtes ruraux accueillant des familles et des randonneurs tout au long de l'année.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="bg-background p-8"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-4">Le besoin</p>
              <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">Moins de sollicitations directes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les visiteurs posaient souvent les mêmes questions sur les disponibilités, les tarifs et les règles — des questions auxquelles le propriétaire devait répondre manuellement, même en dehors des heures d'ouverture.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="bg-background p-8"
            >
              <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-4">La solution</p>
              <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">Un agent conversationnel dédié</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Un agent formé sur toutes les informations spécifiques des gîtes, capable de répondre aux questions fréquentes et d'orienter les visiteurs vers la réservation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ce que l'agent sait */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Connaissance de l'agent
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-16"
          >
            Ce qu'il sait.
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {agentInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-secondary p-8"
              >
                <h3 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-3">{info.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{info.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversations */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Exemples de conversations
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-12"
          >
            Ce que les visiteurs demandent. Ce que l'agent répond.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            {conversations.map((conv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <ConvBlock conv={conv} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground mb-6"
          >
            Vous voulez la même chose pour votre entreprise ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base mb-10 max-w-lg"
          >
            Décrivez votre activité. Nous analysons ensemble ce qu'un agent peut faire pour vous, sans engagement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
            >
              Je veux la même chose pour mon entreprise
              <ArrowRight size={15} />
            </Link>
            <a
              href="http://lesgitesdusoulor.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-6 py-3.5 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Voir le site réel
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
