import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { Mail, Phone, ArrowRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const projectTypes = [
  'Site web',
  'Assistant IA',
  'Site web + Assistant IA',
];

export default function ContactPage() {
  const { search } = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    hasWebsite: '',
    website: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact | PixelBoost';
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const brief = params.get('brief');
    const prestation = params.get('prestation');
    setFormData((current) => ({
      ...current,
      ...(brief ? { message: brief } : {}),
      ...(prestation && projectTypes.includes(prestation) ? { projectType: prestation } : {}),
    }));
  }, [search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      'Bonjour PixelBoost,',
      '',
      'Voici mon besoin :',
      formData.message,
      '',
      `Nom : ${formData.name}`,
      `Entreprise : ${formData.company}`,
      `Email : ${formData.email}`,
      `Téléphone : ${formData.phone || 'Non renseigné'}`,
      `Possède déjà un site : ${formData.hasWebsite || 'Non renseigné'}`,
      `URL du site : ${formData.website || 'Non renseignée'}`,
      `Type de projet : ${formData.projectType}`,
      `Budget indicatif : ${formData.budget || 'Non renseigné'}`,
    ].join('\n');
    window.location.href = `mailto:pixelboost22@gmail.com?subject=${encodeURIComponent('Nouveau projet PixelBoost')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

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
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Chakra_Petch',monospace] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground mb-6 max-w-2xl"
          >
            Parlons de votre projet.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-xl"
          >
            Pas sûr de ce qu'il vous faut ? Décrivez simplement votre activité et votre besoin. Nous revenons vers vous rapidement.
          </motion.p>
        </div>
      </section>

      {/* Formulaire + infos */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {submitted ? (
                <div className="py-20 text-center">
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground tracking-widest uppercase mb-4">Brouillon prêt</p>
                  <h2 className="font-['Chakra_Petch',monospace] text-3xl text-foreground mb-4">Votre demande est prête à envoyer.</h2>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Votre application e-mail a ouvert un brouillon. Envoyez-le pour transmettre votre demande à PixelBoost.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Nom *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Entreprise *
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Téléphone <span className="normal-case text-muted-foreground/50 tracking-normal">(optionnel)</span>
                      </label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground" placeholder="06 12 34 56 78" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground"
                        placeholder="vous@exemple.fr"
                      />
                    </div>
                    <div>
                      <label htmlFor="hasWebsite" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Possédez-vous déjà un site ?
                      </label>
                      <select id="hasWebsite" name="hasWebsite" required value={formData.hasWebsite} onChange={handleChange} className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer">
                        <option value="" disabled>Choisissez une option</option><option value="Oui">Oui</option><option value="Non">Non</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                        Site web <span className="normal-case text-muted-foreground/50 tracking-normal">(optionnel)</span>
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground"
                        placeholder="https://votre-site.fr"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                      Type de projet *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Choisissez une option</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                      Budget indicatif <span className="normal-case text-muted-foreground/50 tracking-normal">(optionnel)</span>
                    </label>
                    <input id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors placeholder:text-muted-foreground" placeholder="Ex. 1 500 € à 3 000 €" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-['JetBrains_Mono',monospace] text-muted-foreground tracking-wider uppercase mb-2">
                      Décrivez votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-foreground/40 transition-colors resize-none placeholder:text-muted-foreground"
                      placeholder="Décrivez votre activité, vos objectifs et ce que vous souhaitez créer ou améliorer..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 font-['Chakra_Petch',monospace] text-sm tracking-wider text-background bg-foreground px-6 py-3.5 hover:bg-foreground/85 transition-colors"
                  >
                    Préparer mon email
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Infos contact */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-5">
                  Contact direct
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:pixelboost22@gmail.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail size={14} className="shrink-0" />
                    pixelboost22@gmail.com
                  </a>
                  <a
                    href="tel:+33785759040"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone size={14} className="shrink-0" />
                    07 85 75 90 40
                  </a>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-5">
                  Délai de réponse
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous répondons sous 24 à 48 heures ouvrées à toutes les demandes.
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-muted-foreground uppercase tracking-widest mb-4">
                  Basé à
                </p>
                <p className="text-sm text-muted-foreground">Bordeaux, France</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
