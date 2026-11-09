import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const services = [
  ['Site vitrine professionnel', 'Une présentation claire de votre activité, de vos services et de vos moyens de contact.'],
  ['Responsive par défaut', 'Une expérience pensée pour les téléphones, tablettes et ordinateurs.'],
  ['Design sur mesure', "Un site cohérent avec l'identité de votre entreprise, sans modèle générique."],
  ['Parcours de contact', 'Des appels à l’action et des formulaires conçus pour faciliter la prise de contact.'],
  ['SEO technique de base', 'Structure, performance et balises essentielles pour donner une base saine au référencement.'],
  ['Fonctionnalités après étude', 'Réservation, catalogue, espace client ou connexion à vos outils, lorsque cela est adapté.'],
];

const steps = ['Échange sur votre activité et vos objectifs', 'Conception de la structure et du design', 'Validation des contenus et des parcours', 'Mise en ligne puis accompagnement'];

export default function SitesWebPage() {
  useEffect(() => { document.title = 'Création de sites web professionnels | PixelBoost'; }, []);

  return <div className="overflow-x-hidden">
    <section className="py-24 px-6 md:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-8">Création de sites web</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl">Un site professionnel qui rend votre activité plus claire.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10">PixelBoost conçoit des sites rapides, lisibles et adaptés à votre activité — avec un parcours pensé pour transformer les visiteurs en demandes sérieuses.</motion.p>
        <Link to="/contact" className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors">Demander un devis gratuit <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">Ce qui est inclus</p>
        <h2 className="font-['Chakra_Petch',monospace] text-[clamp(1.7rem,4vw,3rem)] text-foreground mb-14">Un site utile avant d’être décoratif.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map(([title, text]) => <div key={title} className="bg-background p-8"><Check size={16} className="text-muted-foreground mb-5" /><h3 className="font-['Chakra_Petch',monospace] text-lg text-foreground mb-3">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}
        </div>
      </div>
    </section>

    <section className="py-28 px-6 md:px-10 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16">
        <div><p className="text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-[0.2em] uppercase mb-4">Méthode</p><h2 className="font-['Chakra_Petch',monospace] text-3xl text-foreground">Un processus simple, des choix expliqués.</h2></div>
        <ol className="space-y-px bg-border">{steps.map((step, index) => <li key={step} className="bg-secondary flex gap-5 p-6"><span className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground">0{index + 1}</span><span className="text-sm text-foreground">{step}</span></li>)}</ol>
      </div>
    </section>

    <section className="py-24 px-6 md:px-10 border-t border-border text-center"><div className="max-w-2xl mx-auto"><h2 className="font-['Chakra_Petch',monospace] text-3xl text-foreground mb-4">Tarification : sur devis.</h2><p className="text-muted-foreground mb-8">Le périmètre dépend de votre activité, de vos contenus et des fonctionnalités réellement nécessaires.</p><Link to="/contact" className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors">Demander un devis <ArrowRight size={15} /></Link></div></section>
  </div>;
}
