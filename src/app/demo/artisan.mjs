// Données fictives communes au mini-site Atelier Volt et à son assistant.
export const artisan = {
  name: 'Atelier Volt',
  location: 'Bordeaux',
  disclaimer: 'Entreprise fictive créée par PixelBoost à des fins de démonstration. Aucun devis ni intervention réelle.',
  services: [
    { name: 'Installation électrique', details: 'Création de circuits, prises et éclairage pour un logement ou un local.' },
    { name: 'Rénovation', details: 'Modernisation de tableaux, remplacement de câblage et adaptation des équipements.' },
    { name: 'Diagnostic', details: 'Analyse des besoins et repérage des points à vérifier avant travaux.' },
    { name: 'Dépannage', details: 'Recherche de panne et remise en fonctionnement après diagnostic.' },
  ],
  serviceArea: ['Bordeaux', 'Bègles', 'Talence', 'Mérignac', 'Pessac', 'Le Bouscat'],
  hours: 'Du lundi au vendredi, de 8 h 30 à 18 h (horaires fictifs).',
  quoteFields: ['type de prestation', 'commune', 'type de bâtiment', 'description du besoin', 'délai souhaité'],
};
