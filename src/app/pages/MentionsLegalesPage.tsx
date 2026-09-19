import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function MentionsLegalesPage() {
  useEffect(() => {
    document.title = 'Mentions légales | PixelBoost';
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
            Mentions légales
          </h1>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Éditeur du site</h2>
              <p>
                PixelBoost<br />
                Micro-entreprise<br />
                Bordeaux, France<br />
                Email : pixelboost22@gmail.com<br />
                Téléphone : 07 85 75 90 40
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Directeur de la publication</h2>
              <p>Le responsable de la publication est le gérant de la micro-entreprise PixelBoost.</p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par un prestataire tiers. Pour toute question relative à l'hébergement,
                veuillez nous contacter directement.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, design, code) est la propriété exclusive
                de PixelBoost, sauf mention contraire. Toute reproduction, même partielle, est interdite
                sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Données personnelles</h2>
              <p>
                Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre
                à vos demandes. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous
                disposez d'un droit d'accès, de rectification et de suppression de vos données.
                Contactez-nous à pixelboost22@gmail.com pour exercer ces droits.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Cookies</h2>
              <p>
                Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun
                cookie publicitaire ou de traçage tiers n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Responsabilité</h2>
              <p>
                PixelBoost s'efforce de maintenir les informations de ce site à jour et exactes. Cependant,
                nous déclinons toute responsabilité quant aux erreurs ou omissions éventuelles.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
