# Assistant de démonstration Maison Sève

La démonstration est **désactivée par défaut**. Configurer les variables dans Netlify, jamais dans le dépôt :

- `DEMO_ENABLED=true` seulement après validation des tests réels.
- `DEMO_OPENAI_API_KEY` : clé d'un projet OpenAI distinct, réservé aux démonstrations.
- `DEMO_REDIS_URL` et `DEMO_REDIS_TOKEN` : endpoint REST et jeton Upstash Redis dédié aux compteurs partagés.

Modèle : `gpt-6-luna`, coût affiché au 26 novembre 2026 : 0,10 $ / million de tokens en entrée et 0,50 $ / million en sortie. Le serveur réserve 0,002 $ par requête sur le plafond mensuel de 5 $. Ce montant volontairement conservateur évite le dépassement du plafond applicatif, mais peut arrêter la démonstration avant 5 $ de dépense réelle. Plafonds supplémentaires : 8 requêtes par IP par minute, 20 par session de 24 h, 30 globales par minute, 500 caractères par message, 9 messages de contexte, 450 tokens par appel modèle. Les compteurs sont partagés entre instances via Redis ; en cas d'indisponibilité du stockage ou de configuration, l'endpoint refuse les demandes.

La réservation n'écrit aucune donnée et n'envoie aucun courriel. Les visiteurs ne doivent donner aucune véritable coordonnée. La liste des allergènes est fictive et non exhaustive.

Le nombre de messages et les tokens utilisés sont inscrits dans les logs Netlify sous `demo_usage`, sans contenu de conversation ni adresse IP. Pour un suivi durable des coûts réels et des erreurs, ajouter ultérieurement une exportation de métriques. Avant activation publique : configurer un budget de projet OpenAI, puis effectuer un essai complet de réponse et de simulation de réservation avec les identifiants du projet distinct.
