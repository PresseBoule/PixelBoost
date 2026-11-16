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
      { role: 'agent', text: "Nous proposons quatre gîtes : Le Soum, Le Tech, Le Suyen et L’Estaing. Chacun accueille 3 personnes maximum. Lequel vous intéresse ?" },
    ],
  },
  {
    label: 'Règles & conditions',
    messages: [
      { role: 'user', text: 'Les animaux sont-ils acceptés ?' },
      { role: 'agent', text: "Les animaux ne sont pas admis dans les gîtes." },
    ],
  },
  {
    label: 'Disponibilités',
    messages: [
      { role: 'user', text: 'Le Suyen est-il disponible du 12 au 14 octobre ?' },
      { role: 'agent', text: "Pour vérifier les disponibilités du Suyen, pouvez-vous préciser l’année du séjour ?" },
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
  { title: "Présentation des hébergements", text: "Le Soum, Le Tech, Le Suyen et L’Estaing : quatre gîtes pour 3 personnes maximum chacun." },
  { title: "Tarifs & conditions", text: "Tarifs selon la saison de chaque nuit, conditions d’annulation et règles de l’établissement." },
  { title: "Disponibilités connectées", text: "L’agent consulte les calendriers du site et d’Airbnb pour la période demandée. Si une source est indisponible, il ne confirme pas de disponibilité." },
  { title: "Équipements & prestations", text: "Équipements de cuisine, literie, wifi, espace bien-être, accès extérieur, parkings." },
  { title: "Informations pratiques", text: "Accès, horaires d’arrivée et de départ, coordonnées du gérant et informations locales." },
  { title: "Orientation & qualification", text: "L’agent oriente le visiteur vers la page de réservation ou le gérant. Il ne confirme pas de réservation dans le chat." },
];

export default function CasClientPage() {
  useEffect(() => {
    document.title = "Site web et assistant IA — Les Gîtes du Soulor | PixelBoost";
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
            Cas client · Site web + assistant IA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl"
          >
            Les Gîtes du Soulor — un site web avec son assistant IA.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
          >
            Pour ces hébergements touristiques du Val d'Azun, PixelBoost a créé le site web et intégré un assistant IA : une solution complète pour présenter les gîtes, accompagner les visiteurs et faciliter leurs demandes de réservation.
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
                Quatre gîtes de 3 personnes maximum chacun, situés à Arrens-Marsous, dans le Val d’Azun, Hautes-Pyrénées.
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
              <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">Présenter les gîtes et faciliter les échanges</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Permettre aux visiteurs de découvrir les hébergements et les prestations, de trouver les informations utiles et d'obtenir des réponses à leurs questions avant de réserver.
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
              <h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">Un site web et un assistant IA</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Création du site et intégration d'un assistant configuré avec les informations des gîtes, pour répondre aux questions fréquentes et orienter les visiteurs vers la réservation ou le propriétaire.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le site web */}
      <section className="py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">Création du site web</motion.p>
          <motion.h2 {...fadeUp} className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-6">Une vitrine pour découvrir et préparer son séjour.</motion.h2>
          <motion.p {...fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-12">PixelBoost a conçu le site des Gîtes du Soulor pour présenter l'établissement, ses hébergements et son espace bien-être, tout en guidant les visiteurs vers les informations pratiques et les demandes de réservation.</motion.p>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { title: 'Découvrir les gîtes', text: 'Présentation des hébergements, de leurs équipements et du cadre du Val d’Azun.' },
              { title: 'Préparer son séjour', text: 'Informations pratiques, tarifs, activités et présentation du bain nordique et du sauna.' },
              { title: 'Passer à la réservation', text: 'Accès aux calendriers et aux formulaires de réservation du site.' },
            ].map((item) => <div key={item.title} className="bg-background p-8"><h3 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-3">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p></div>)}
          </div>
        </div>
      </section>

      {/* Ce que l'agent sait */}
      <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p {...fadeUp} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">
            Assistant IA intégré
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="font-['Chakra_Petch',monospace] text-[clamp(1.6rem,3.5vw,2.8rem)] leading-tight text-foreground mb-16"
          >
            Un assistant pour accompagner les visiteurs.
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
            Exemples illustratifs de conversations
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
            Décrivez votre activité. Nous étudions ensemble votre besoin de site web, d'assistant IA ou d'une solution combinée, sans engagement.
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
              Demander un devis gratuit
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
