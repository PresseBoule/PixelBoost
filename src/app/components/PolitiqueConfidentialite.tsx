import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PolitiqueConfidentialiteProps {
  onClose: () => void;
}

export default function PolitiqueConfidentialite({ onClose }: PolitiqueConfidentialiteProps) {
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
          Politique de Confidentialité
        </motion.h1>

        <motion.div
          className="space-y-12 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Introduction */}
          <section>
            <p className="leading-relaxed text-lg">
              PixelBoost s'engage à protéger la confidentialité de vos données personnelles. 
              Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations.
            </p>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl text-white mb-4">Données collectées</h2>
            <p className="leading-relaxed mb-4">
              Nous collectons uniquement les données que vous nous fournissez volontairement via nos formulaires de contact :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Message ou description de votre projet</li>
              <li>Informations relatives au forfait sélectionné</li>
            </ul>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-2xl text-white mb-4">Utilisation des données</h2>
            <p className="leading-relaxed">
              Les données personnelles collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous fournir un devis personnalisé</li>
              <li>Assurer le suivi de votre projet</li>
              <li>Vous informer sur l'avancement de votre commande</li>
            </ul>
            <p className="leading-relaxed mt-4">
              <strong className="text-white/90">Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers.</strong>
            </p>
          </section>

          {/* Stockage des données */}
          <section>
            <h2 className="text-2xl text-white mb-4">Stockage et sécurité des données</h2>
            <p className="leading-relaxed">
              Les données saisies dans les formulaires (nom, e-mail, message, etc.) sont transmises par e-mail à PixelBoost 
              et stockées de façon sécurisée sur les serveurs de l'hébergeur du site, Netlify, situés aux États-Unis.
            </p>
            <p className="leading-relaxed mt-4">
              Ces données ne sont utilisées que pour répondre aux demandes des utilisateurs et ne sont jamais cédées à des tiers. 
              Conformément au RGPD, vous pouvez demander la suppression ou la modification de vos données à l'adresse suivante : 
              <a href="mailto:pixelboost22@gmail.com" className="text-white hover:underline ml-1">pixelboost22@gmail.com</a>
            </p>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl text-white mb-4">Durée de conservation</h2>
            <p className="leading-relaxed">
              Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Pour les demandes de contact : jusqu'à 3 ans après le dernier contact</li>
              <li>Pour les projets en cours : durée du projet + 5 ans (obligations comptables)</li>
            </ul>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl text-white mb-4">Vos droits (RGPD)</h2>
            <p className="leading-relaxed mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white/90">Droit d'accès :</strong> vous pouvez demander une copie de vos données personnelles</li>
              <li><strong className="text-white/90">Droit de rectification :</strong> vous pouvez demander la correction de données inexactes</li>
              <li><strong className="text-white/90">Droit à l'effacement :</strong> vous pouvez demander la suppression de vos données</li>
              <li><strong className="text-white/90">Droit d'opposition :</strong> vous pouvez vous opposer au traitement de vos données</li>
              <li><strong className="text-white/90">Droit à la portabilité :</strong> vous pouvez récupérer vos données dans un format structuré</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : 
              <a href="mailto:pixelboost22@gmail.com" className="text-white hover:underline ml-1">pixelboost22@gmail.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl text-white mb-4">Cookies et technologies similaires</h2>
            <p className="leading-relaxed mb-4">
              Ce site utilise des cookies nécessaires à son bon fonctionnement.
            </p>
            
            <h3 className="text-xl text-white mb-3 mt-6">Cookies Google</h3>
            <p className="leading-relaxed mb-4">
              Le site peut utiliser des services Google qui déposent des cookies pour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white/90">Google Analytics :</strong> analyse d'audience et statistiques de visite (si activé)</li>
              <li><strong className="text-white/90">Google Fonts :</strong> amélioration de l'affichage typographique</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Ces cookies Google ne collectent aucune donnée personnelle identifiable et sont utilisés uniquement à des fins d'analyse 
              et d'amélioration de l'expérience utilisateur.
            </p>
            
            <h3 className="text-xl text-white mb-3 mt-6">Gestion des cookies</h3>
            <p className="leading-relaxed">
              Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, cela peut affecter certaines fonctionnalités du site.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl text-white mb-4">Modifications de la politique</h2>
            <p className="leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Toute modification sera publiée sur cette page avec une date de mise à jour.
            </p>
            <p className="leading-relaxed mt-4 text-white/50">
              Dernière mise à jour : 27 octobre 2025
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl text-white mb-4">Contact</h2>
            <p className="leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles, vous pouvez nous contacter :
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-white/90">Email :</strong> pixelboost22@gmail.com</p>
              <p><strong className="text-white/90">Téléphone :</strong> 07 85 75 90 40</p>
              <p><strong className="text-white/90">Adresse :</strong> 71 cours Gambetta, 33400 Talence, France</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
