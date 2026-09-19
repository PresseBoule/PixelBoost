import { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le contenu de l'email
    const emailSubject = formData.subject || 'Question depuis le site PixelBoost';
    const emailBody = `
Bonjour,

Vous avez reçu un nouveau message depuis votre site web PixelBoost.

INFORMATIONS DE CONTACT
------------------------
Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone || 'Non renseigné'}

SUJET
-----
${formData.subject}

MESSAGE
-------
${formData.message}

------------------------
Merci de répondre à cette demande.
    `.trim();

    // Ouvrir le client mail
    window.location.href = `mailto:pixelboost22@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Réinitialiser le formulaire après envoi
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl"
    >
      <div className="border border-white/20 p-6 md:p-8 backdrop-blur-sm bg-white/[0.02]">
        <h3 className="text-2xl text-white mb-2 tracking-tight">
          Envoyez-moi un message
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Une question ? Un projet en tête ? Je vous réponds sous 24h.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-white/70 text-xs uppercase tracking-widest">
              Nom *
            </Label>
            <Input
              id="contact-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/20 text-white focus:border-white/40"
              placeholder="Votre nom"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-white/70 text-xs uppercase tracking-widest">
              Email *
            </Label>
            <Input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/20 text-white focus:border-white/40"
              placeholder="votre@email.com"
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-white/70 text-xs uppercase tracking-widest">
              Téléphone
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/20 text-white focus:border-white/40"
              placeholder="06 12 34 56 78"
            />
          </div>

          {/* Sujet */}
          <div className="space-y-2">
            <Label htmlFor="contact-subject" className="text-white/70 text-xs uppercase tracking-widest">
              Sujet *
            </Label>
            <Input
              id="contact-subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="bg-white/5 border-white/20 text-white focus:border-white/40"
              placeholder="Ex: Question sur vos tarifs"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="contact-message" className="text-white/70 text-xs uppercase tracking-widest">
              Message *
            </Label>
            <Textarea
              id="contact-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-white/5 border-white/20 text-white focus:border-white/40 min-h-[120px]"
              placeholder="Votre message..."
            />
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Envoyer le message
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
