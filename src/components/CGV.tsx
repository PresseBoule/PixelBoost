import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface CGVProps {
  onClose: () => void;
}

export default function CGV({ onClose }: CGVProps) {
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
          Conditions Générales de Vente
        </motion.h1>

        <motion.div
          className="space-y-12 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Préambule */}
          <section>
            <p className="leading-relaxed text-lg">
              Les présentes Conditions Générales de Vente (CGV) régissent la relation contractuelle entre PixelBoost, 
              micro-entreprise spécialisée dans la création de sites web, et ses clients. 
              Toute commande implique l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          {/* Article 1 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 1 - Champ d'application</h2>
            <p className="leading-relaxed">
              Les présentes CGV s'appliquent à toutes les prestations de création de sites web proposées par PixelBoost, 
              qu'il s'agisse du forfait Basique (499€), Populaire (749€) ou Premium (999€).
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 2 - Description des forfaits</h2>
            
            <div className="space-y-4 mt-4">
              <div className="border border-white/10 p-6 rounded-sm">
                <h3 className="text-xl text-white mb-3">Forfait Basique - 499€</h3>
                <p className="leading-relaxed">
                  Site vitrine moderne et responsive, design sur-mesure, optimisation SEO de base, formulaire de contact.
                </p>
                <p className="mt-2"><strong className="text-white/90">Délai de livraison :</strong> 1 semaine</p>
              </div>

              <div className="border border-white/10 p-6 rounded-sm">
                <h3 className="text-xl text-white mb-3">Forfait Populaire - 749€</h3>
                <p className="leading-relaxed">
                  Inclut le forfait Basique + fonctionnalités avancées, animations personnalisées, intégration CMS, 
                  optimisation des performances.
                </p>
                <p className="mt-2"><strong className="text-white/90">Délai de livraison :</strong> 2 semaines</p>
              </div>

              <div className="border border-white/10 p-6 rounded-sm">
                <h3 className="text-xl text-white mb-3">Forfait Premium - 999€</h3>
                <p className="leading-relaxed">
                  Solution complète incluant design ultra-personnalisé, fonctionnalités sur-mesure, 
                  e-commerce, tableau de bord admin, support prioritaire.
                </p>
                <p className="mt-2"><strong className="text-white/90">Délai de livraison :</strong> 3 semaines</p>
              </div>
            </div>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 3 - Commande et devis</h2>
            <p className="leading-relaxed">
              Toute commande doit faire l'objet d'un devis préalable envoyé par PixelBoost. 
              Le devis est valable 30 jours à compter de sa date d'émission. 
              La commande devient ferme et définitive après signature du devis et réception de l'acompte.
            </p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 4 - Prix et modalités de paiement</h2>
            
            <h3 className="text-xl text-white mb-3 mt-6">4.1 Prix et TVA</h3>
            <p className="leading-relaxed">
              Les prix sont indiqués en euros (€), hors taxes. <strong className="text-white/90">TVA non applicable, article 293 B du Code général des impôts.</strong>
            </p>

            <h3 className="text-xl text-white mb-3 mt-6">4.2 Acompte et paiement</h3>
            <p className="leading-relaxed mb-4">
              Un acompte de <strong className="text-white/90">30 %</strong> est demandé à la commande pour confirmer le projet.
            </p>
            <p className="leading-relaxed mb-4">
              Le versement de cet acompte engage les deux parties : il <strong className="text-white/90">n'est ni remboursable en cas d'annulation 
              du client</strong>, ni exigible avant la signature du devis.
            </p>
            <p className="leading-relaxed mb-4">
              Le solde est dû à la livraison du site ou selon l'échéancier convenu entre les parties.
            </p>
            <p className="leading-relaxed text-white/90">
              En cas de retard de paiement, des pénalités légales pourront être appliquées.
            </p>

            <h3 className="text-xl text-white mb-3 mt-6">4.3 Moyens de paiement acceptés</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Virement bancaire (méthode privilégiée)</li>
              <li>PayPal</li>
            </ul>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 5 - Délais de réalisation</h2>
            <p className="leading-relaxed mb-4">
              Les délais de réalisation indiqués sont donnés à titre indicatif et peuvent varier selon la réactivité du client 
              à fournir les éléments nécessaires (textes, images, accès, etc.).
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white/90">Forfait Basique :</strong> 1 semaine (indicatif)</li>
              <li><strong className="text-white/90">Forfait Populaire :</strong> 2 semaines (indicatif)</li>
              <li><strong className="text-white/90">Forfait Premium :</strong> 3 semaines (indicatif)</li>
            </ul>
            <p className="leading-relaxed mt-4">
              <strong className="text-white/90">PixelBoost ne pourra être tenu responsable d'un retard dû à un manque de communication 
              ou de contenu de la part du client.</strong>
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 6 - Révisions et modifications</h2>
            
            <h3 className="text-xl text-white mb-3 mt-6">6.1 Pendant la phase de conception</h3>
            <p className="leading-relaxed">
              Le client peut demander <strong className="text-white/90">autant de modifications qu'il le souhaite pendant la phase de conception</strong>, 
              jusqu'à la validation finale du projet. Cette flexibilité permet d'assurer que le résultat final corresponde parfaitement aux attentes.
            </p>

            <h3 className="text-xl text-white mb-3 mt-6">6.2 Après la validation définitive</h3>
            <p className="leading-relaxed mb-4">
              Après la validation définitive du site (livraison ou mise en ligne), <strong className="text-white/90">deux (2) révisions sont incluses 
              sans frais</strong> pour tous les forfaits, permettant d'effectuer d'éventuels ajustements mineurs.
            </p>

            <h3 className="text-xl text-white mb-3 mt-6">6.3 Modifications supplémentaires</h3>
            <p className="leading-relaxed">
              Toute demande de modification supplémentaire, ou toute modification majeure du site (ajout de pages, refonte, 
              nouvelles fonctionnalités, etc.) fera l'objet d'une <strong className="text-white/90">facturation complémentaire selon le tarif 
              en vigueur ou un nouveau devis</strong>.
            </p>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 7 - Propriété intellectuelle</h2>
            <p className="leading-relaxed mb-4">
              Le site et l'ensemble de ses éléments (textes, images, code, design, etc.) <strong className="text-white/90">restent la propriété 
              de PixelBoost tant que la facture finale n'a pas été réglée dans son intégralité</strong>.
            </p>
            <p className="leading-relaxed mb-4">
              Une fois le paiement complet reçu, les droits d'utilisation et de diffusion du site sont transférés au client.
            </p>
            <p className="leading-relaxed">
              PixelBoost se réserve le droit de mentionner le projet dans son portfolio à des fins de présentation commerciale.
            </p>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 8 - Garantie et maintenance</h2>
            <p className="leading-relaxed mb-4">
              PixelBoost garantit le bon fonctionnement du site livré pendant <strong className="text-white/90">30 jours à compter de sa mise en ligne</strong>.
            </p>
            <p className="leading-relaxed mb-4">
              Durant cette période, toute anomalie technique liée au développement initial sera corrigée sans frais.
            </p>
            <p className="leading-relaxed mb-4">
              Cette garantie ne couvre pas :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>les modifications ou suppressions effectuées par le client,</li>
              <li>les erreurs d'utilisation,</li>
              <li>les interventions d'un tiers,</li>
              <li>ou les problèmes liés à l'hébergeur ou à des services externes.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Passé ce délai, toute intervention fera l'objet d'une facturation ou d'un contrat de maintenance distinct.
            </p>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 9 - Annulation et résiliation</h2>
            
            <h3 className="text-xl text-white mb-3 mt-6">9.1 Annulation par le client</h3>
            <p className="leading-relaxed mb-4">
              En cas d'annulation de la commande par le client, <strong className="text-white/90">l'acompte versé reste intégralement 
              acquis à PixelBoost</strong> et ne sera pas remboursé, quelle que soit l'étape d'avancement du projet.
            </p>
            <p className="leading-relaxed">
              Cette disposition compense le temps de travail déjà effectué et la réservation du créneau de production.
            </p>

            <h3 className="text-xl text-white mb-3 mt-6">9.2 Annulation par PixelBoost</h3>
            <p className="leading-relaxed">
              PixelBoost se réserve le droit d'annuler la commande en cas de non-paiement de l'acompte dans les 7 jours suivant l'émission du devis, 
              ou en cas de fourniture tardive ou incomplète des éléments nécessaires par le client (au-delà de 30 jours). 
              Dans ce cas, l'acompte sera remboursé intégralement.
            </p>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 10 - Obligations du client</h2>
            <p className="leading-relaxed mb-4">Le client s'engage à :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fournir tous les éléments nécessaires à la réalisation du projet (textes, images, logos, etc.) dans les délais convenus</li>
              <li>S'assurer que les contenus fournis ne portent pas atteinte aux droits de tiers</li>
              <li>Respecter les délais de paiement</li>
              <li>Communiquer clairement ses besoins et attentes</li>
            </ul>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 11 - Responsabilités</h2>
            <p className="leading-relaxed mb-4">
              PixelBoost s'engage à livrer un site conforme au devis validé.
            </p>
            <p className="leading-relaxed mb-4">
              Toutefois, PixelBoost ne saurait être tenu responsable :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>des contenus fournis par le client,</li>
              <li>des pertes de données liées à une mauvaise manipulation,</li>
              <li>des défaillances de l'hébergeur, ou</li>
              <li>de l'indisponibilité temporaire du site liée à des facteurs externes.</li>
            </ul>
          </section>

          {/* Article 12 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 12 - Protection des données personnelles</h2>
            <p className="leading-relaxed">
              Les données personnelles collectées dans le cadre de la prestation font l'objet d'un traitement conforme au RGPD. 
              Pour plus d'informations, consultez notre 
              <span className="text-white"> Politique de Confidentialité</span>.
            </p>
          </section>

          {/* Article 13 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 13 - Droit applicable et litiges</h2>
            <p className="leading-relaxed mb-4">
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. 
              À défaut, le litige sera porté devant les tribunaux compétents de Bordeaux.
            </p>
          </section>

          {/* Article 14 */}
          <section>
            <h2 className="text-2xl text-white mb-4">Article 14 - Modifications des CGV</h2>
            <p className="leading-relaxed">
              PixelBoost se réserve le droit de modifier les présentes CGV à tout moment. 
              Les CGV applicables sont celles en vigueur à la date de signature du devis.
            </p>
            <p className="leading-relaxed mt-4 text-white/50">
              Dernière mise à jour : 27 octobre 2025
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-2xl text-white mb-4">Contact</h2>
            <p className="leading-relaxed mb-4">
              Pour toute question concernant ces Conditions Générales de Vente :
            </p>
            <div className="space-y-2">
              <p><strong className="text-white/90">PixelBoost</strong></p>
              <p>71 cours Gambetta, 33400 Talence, France</p>
              <p>Email : pixelboost22@gmail.com</p>
              <p>Téléphone : 07 85 75 90 40</p>
              <p>SIRET : 990 252 132 00016</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
