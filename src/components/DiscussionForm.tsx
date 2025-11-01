import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface DiscussionFormProps {
  packageName: string;
  packagePrice: string;
  onBack: () => void;
}

export const DiscussionForm = ({ packageName, packagePrice, onBack }: DiscussionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: '',
    deadline: '',
    websiteType: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le contenu de l'email
    const emailSubject = `Demande de devis - Formule ${packageName}`;
    const emailBody = `
Bonjour,

Je suis intéressé(e) par la formule ${packageName} (${packagePrice}) et j'aimerais discuter de mon projet avec vous avant de commencer.

INFORMATIONS CLIENT
-------------------
Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone}

DESCRIPTION DU PROJET
---------------------
${formData.projectDescription}

Type de site : ${formData.websiteType}
Deadline souhaitée : ${formData.deadline}

Informations supplémentaires :
${formData.additionalInfo}

-------------------
J'attends votre retour pour discuter des détails, du planning et de la faisabilité du projet.

Cordialement,
${formData.name}
    `.trim();

    // Ouvrir le client mail
    window.location.href = `mailto:pixelboost22@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest">Retour</span>
            </button>

            <h1 className="text-5xl md:text-7xl text-white tracking-tight mb-4">
              Discutons de votre projet
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-white/60 text-sm uppercase tracking-widest">
                Formule {packageName}
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white text-2xl">{packagePrice}</span>
            </div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 border-l-2 border-white/20 pl-6 py-2"
          >
            <p className="text-white/70 leading-relaxed">
              Remplissez ce formulaire pour me présenter votre projet. Je reviendrai vers vous sous <span className="text-white">24h</span> pour discuter des détails, du planning et vous donner une estimation précise.
            </p>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border border-white/20 p-6 md:p-8">
              <h2 className="text-2xl text-white mb-6 tracking-tight">
                Votre projet
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70 text-xs uppercase tracking-widest">
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="Jean Dupont"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-widest">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="jean@example.com"
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/70 text-xs uppercase tracking-widest">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                {/* Type de site */}
                <div className="space-y-2">
                  <Label htmlFor="websiteType" className="text-white/70 text-xs uppercase tracking-widest">
                    Type de site *
                  </Label>
                  <Input
                    id="websiteType"
                    required
                    value={formData.websiteType}
                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="Ex: Site vitrine restaurant, E-commerce mode..."
                  />
                </div>

                {/* Description du projet */}
                <div className="space-y-2">
                  <Label htmlFor="projectDescription" className="text-white/70 text-xs uppercase tracking-widest">
                    Description du projet *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    required
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40 min-h-[120px]"
                    placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, inspiration..."
                  />
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-white/70 text-xs uppercase tracking-widest">
                    Deadline souhaitée
                  </Label>
                  <Input
                    id="deadline"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="Ex: Fin février 2025"
                  />
                </div>

                {/* Informations supplémentaires */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-white/70 text-xs uppercase tracking-widest">
                    Informations supplémentaires
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="bg-white/5 border-white/20 text-white focus:border-white/40"
                    placeholder="Références, maquettes existantes, budget précis, contraintes particulières..."
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black py-4 text-sm uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer ma demande
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Info complémentaire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-white/40 text-sm">
              Je vous répondrai sous 24h pour discuter de votre projet, 
              du planning et vous proposer un devis personnalisé.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
