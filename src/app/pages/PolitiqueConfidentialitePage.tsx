import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function PolitiqueConfidentialitePage() {
  useEffect(() => {
    document.title = 'Politique de confidentialité | PixelBoost';
  }, []);

  return (
    <div className="py-20 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={12} />
            Accueil
          </Link>

          <h1 className="font-['Chakra_Petch',monospace] text-3xl md:text-4xl text-foreground mb-12">
            Politique de confidentialité
          </h1>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Responsable du traitement</h2>
              <p>
                PixelBoost, micro-entreprise basée à Bordeaux, France.<br />
                Contact : pixelboost22@gmail.com
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Données collectées</h2>
              <p>Nous collectons les données suivantes via le formulaire de contact :</p>
              <ul className="list-none space-y-2 mt-3">
                {['Nom et prénom', "Nom de l'entreprise", 'Adresse email', 'Site web (optionnel)', 'Type de projet', 'Description du besoin'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Finalité du traitement</h2>
              <p>
                Les données collectées sont utilisées exclusivement pour :<br />
                — Répondre à vos demandes de contact et de devis ;<br />
                — Vous proposer une offre adaptée à votre besoin ;<br />
                — Vous contacter dans le cadre d'un projet en cours.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Base légale</h2>
              <p>
                Le traitement est fondé sur votre consentement, exprimé lors de la soumission du formulaire
                de contact, conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Conservation des données</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire à la relation commerciale, et au
                maximum 3 ans après le dernier contact. Elles sont ensuite supprimées.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Partage des données</h2>
              <p>
                Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
                Elles peuvent être partagées avec des prestataires techniques dans le cadre de la
                réalisation de votre projet, sous contrat de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-none space-y-2 mt-3">
                {["Droit d'accès à vos données", 'Droit de rectification', 'Droit à l\'effacement (droit à l\'oubli)', "Droit à la limitation du traitement", "Droit à la portabilité", "Droit d'opposition"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:pixelboost22@gmail.com" className="text-foreground hover:text-foreground/70 transition-colors">
                  pixelboost22@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Cookies</h2>
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
                Aucune donnée n'est transmise à des régies publicitaires ou à des outils de traçage tiers.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Réclamation</h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation
                à la CNIL (Commission Nationale de l'Informatique et des Libertés) :{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-foreground/70 transition-colors"
                >
                  www.cnil.fr
                </a>.
              </p>
            </section>

            <p className="border-t border-border pt-6 text-xs text-muted-foreground">
              Dernière mise à jour : novembre 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
