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
                Camille Panazol, entrepreneur individuel (EI)<br />
                Nom commercial : PixelBoost<br />
                SIRET : 990 252 132 00016<br />
                20 rue Louis Denis Mallet, 33130 Bègles, France<br />
                Email : contact@pixelboost.fr<br />
                Téléphone : 07 85 75 90 40
              </p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Directeur de la publication</h2>
              <p>Camille Panazol</p>
            </section>

            <section>
              <h2 className="font-['Chakra_Petch',monospace] text-base text-foreground mb-4">Hébergement</h2>
              <p>
                Netlify, Inc.<br />
                101 2nd Street, San Francisco, CA 94105, États-Unis<br />
                Téléphone : +1 415 323 3482<br />
                Email : support@netlify.com<br />
                Site : <a href="https://www.netlify.com" className="text-foreground underline">www.netlify.com</a>
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
                Les données du formulaire servent à répondre à vos demandes et sont traitées par Netlify
                pour leur transmission. Pour connaître les destinataires, la durée de conservation et vos droits,
                consultez notre <Link to="/politique-confidentialite" className="text-foreground underline">politique de confidentialité</Link>.
                Contact : contact@pixelboost.fr.
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
