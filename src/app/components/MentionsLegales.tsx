import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface MentionsLegalesProps {
  onClose: () => void;
}

export default function MentionsLegales({ onClose }: MentionsLegalesProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[101] text-white/50 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        <motion.h1
          className="text-6xl md:text-8xl tracking-tighter text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Mentions Légales
        </motion.h1>

        <motion.div
          className="space-y-12 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl text-white mb-4">Éditeur du site</h2>
            <div className="space-y-2">
              <p><strong className="text-white/90">Nom de l'entreprise :</strong> PixelBoost</p>
              <p><strong className="text-white/90">Forme juridique :</strong> Micro-entreprise</p>
              <p><strong className="text-white/90">Directeur de publication :</strong> Panazol Camille</p>
              <p><strong className="text-white/90">SIRET :</strong> 990 252 132 00016</p>
              <p><strong className="text-white/90">TVA :</strong> Non applicable, article 293 B du CGI</p>
              <p><strong className="text-white/90">Adresse du siège social :</strong><br />
              71 cours Gambetta<br />
              33400 Talence, France</p>
              <p><strong className="text-white/90">Email :</strong> pixelboost22@gmail.com</p>
              <p><strong className="text-white/90">Téléphone :</strong> 07 85 75 90 40</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-2xl text-white mb-4">Hébergeur du site</h2>
            <div className="space-y-2">
              <p><strong className="text-white/90">Nom :</strong> Netlify, Inc.</p>
              <p><strong className="text-white/90">Adresse :</strong><br />
              2325 3rd Street, Suite 296<br />
              San Francisco, CA 94107<br />
              États-Unis</p>
              <p><strong className="text-white/90">Site web :</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">www.netlify.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl text-white mb-4">Propriété intellectuelle</h2>
            <p className="leading-relaxed">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="leading-relaxed mt-4">
              La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite 
              sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-2xl text-white mb-4">Protection des données personnelles</h2>
            <p className="leading-relaxed">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="leading-relaxed mt-4">
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse : pixelboost22@gmail.com
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl text-white mb-4">Cookies</h2>
            <p className="leading-relaxed">
              Ce site n'utilise pas de cookies de tracking ou de publicité. Aucune donnée personnelle n'est collectée sans votre consentement explicite via les formulaires de contact.
            </p>
          </section>

          {/* Crédits */}
          <section>
            <h2 className="text-2xl text-white mb-4">Crédits</h2>
            <p className="leading-relaxed">
              Site web conçu et développé par PixelBoost.
            </p>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
