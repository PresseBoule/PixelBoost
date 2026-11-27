// Prestations et conditions fictives, communes au site et à l'assistant.
export const beaute = {
  name: 'Studio Alba',
  location: 'Bordeaux',
  hours: 'Du mardi au samedi, de 10 h à 19 h. Fermé dimanche et lundi.',
  services: [
    { name: 'Soin visage Éclat', category: 'Visage', duration: 45, price: 65, description: 'Nettoyage doux, masque hydratant et massage du visage.' },
    { name: 'Rituel visage Signature', category: 'Visage', duration: 75, price: 95, description: 'Diagnostic de confort, nettoyage, masque et massage prolongé.' },
    { name: 'Massage Détente', category: 'Corps', duration: 60, price: 80, description: 'Massage relaxant à pression modulable.' },
    { name: 'Massage Dos', category: 'Corps', duration: 30, price: 45, description: 'Massage ciblé du dos et des épaules.' },
    { name: 'Beauté des mains', category: 'Mains', duration: 45, price: 40, description: 'Mise en forme des ongles et soin des mains, sans pose de gel.' },
    { name: 'Rituel Alba', category: 'Signature', duration: 90, price: 120, description: 'Soin visage Éclat suivi d’un massage du dos.' },
  ],
  appointments: 'Créneaux fictifs sur les 30 prochains jours. Consultation et demande de rendez-vous simulées ; aucun créneau réellement réservé.',
  advice: 'Les soins proposés sont des prestations de confort. En cas de grossesse, allergie, lésion cutanée ou problème de santé, demander un avis médical avant tout soin ; ne pas poser de diagnostic.',
};
