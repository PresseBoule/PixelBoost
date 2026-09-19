import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface PaymentPageProps {
  packageName: string;
  packagePrice: string;
  onBack: () => void;
}

export const PaymentPage = ({ packageName, packagePrice, onBack }: PaymentPageProps) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: '',
    deadline: '',
    websiteType: '',
    additionalInfo: ''
  });

  // Coordonnées bancaires
  const ribDetails = {
    iban: 'FR76 2823 3000 0195 4085 4128 691',
    bic: 'REVOFRP2',
    titulaire: 'PixelBoost'
  };

  const depositAmount = Math.floor(parseInt(packagePrice.replace('€', '')) * 0.3);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le contenu de l'email
    const emailSubject = `Nouveau projet - Formule ${packageName}`;
    const emailBody = `
Formule choisie : ${packageName} (${packagePrice})
Acompte à régler : ${depositAmount}€

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
Paiement : L'acompte de ${depositAmount}€ sera effectué par virement bancaire.
    `.trim();

    // Ouvrir le client mail
    window.location.href = `mailto:pixelboost22@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
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
              Paiement
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-white/60 text-sm uppercase tracking-widest">
                Formule {packageName}
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white text-2xl">{packagePrice}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
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
                      placeholder="Ex: Fin janvier 2025"
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
                      placeholder="Références, maquettes existantes, contraintes particulières..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black py-4 text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
                  >
                    Envoyer le projet
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* RIB et instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Montant de l'acompte */}
              <div className="border border-white/30 p-6 md:p-8 bg-white/5">
                <h3 className="text-xs text-white/60 mb-3 tracking-widest uppercase">
                  Acompte à régler
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl text-white tracking-tight">{depositAmount}</span>
                  <span className="text-3xl text-white/40">€</span>
                </div>
                <p className="text-white/50 text-sm mt-3">
                  30% du montant total • Solde à la livraison
                </p>
              </div>

              {/* Coordonnées bancaires */}
              <div className="border border-white/20 p-6 md:p-8">
                <h3 className="text-xl text-white mb-6 tracking-tight">
                  Coordonnées bancaires
                </h3>

                <div className="space-y-4">
                  {/* IBAN */}
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
                      IBAN
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-white text-sm font-mono flex-1 bg-white/5 p-3 border border-white/10">
                        {ribDetails.iban}
                      </code>
                      <button
                        onClick={() => copyToClipboard(ribDetails.iban)}
                        className="p-3 border border-white/20 hover:border-white/40 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/60" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* BIC */}
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
                      BIC
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-white text-sm font-mono flex-1 bg-white/5 p-3 border border-white/10">
                        {ribDetails.bic}
                      </code>
                      <button
                        onClick={() => copyToClipboard(ribDetails.bic)}
                        className="p-3 border border-white/20 hover:border-white/40 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/60" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Titulaire */}
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
                      Titulaire
                    </p>
                    <p className="text-white text-sm bg-white/5 p-3 border border-white/10">
                      {ribDetails.titulaire}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="border-l-2 border-white/20 pl-6 py-2">
                <h4 className="text-white text-sm mb-3 tracking-wide">
                  Instructions
                </h4>
                <ol className="space-y-2 text-white/60 text-sm leading-relaxed list-decimal list-inside">
                  <li>Remplissez le formulaire avec les détails de votre projet</li>
                  <li>Cliquez sur "Envoyer le projet" (email pré-rempli)</li>
                  <li>Effectuez le virement de {depositAmount}€</li>
                  <li>Je démarre dès réception du paiement !</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
