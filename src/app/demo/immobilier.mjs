// Catalogue entièrement fictif, partagé entre le mini-site et l'assistant.
export const immobilier = {
  name: 'Perspective',
  area: 'Bordeaux Métropole',
  properties: [
    { id: 'P-101', title: 'Appartement des Chartrons', type: 'Appartement', city: 'Bordeaux', neighborhood: 'Chartrons', price: 285000, area: 54, rooms: 2, bedrooms: 1, outdoor: 'balcon', energy: 'D', status: 'disponible', description: 'Pièce de vie lumineuse, balcon et tram à proximité.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85' },
    { id: 'P-102', title: 'Maison Jardin', type: 'Maison', city: 'Bègles', neighborhood: 'Centre', price: 425000, area: 105, rooms: 4, bedrooms: 3, outdoor: 'jardin', energy: 'C', status: 'disponible', description: 'Maison familiale avec séjour traversant et jardin.', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85' },
    { id: 'P-103', title: 'Loft des Bassins', type: 'Appartement', city: 'Bordeaux', neighborhood: 'Bassins à flot', price: 345000, area: 72, rooms: 3, bedrooms: 2, outdoor: 'terrasse', energy: 'C', status: 'disponible', description: 'Volume ouvert, deux chambres et terrasse.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85' },
    { id: 'P-104', title: 'Échoppe des Arts', type: 'Maison', city: 'Talence', neighborhood: 'Barrière Saint-Genès', price: 515000, area: 120, rooms: 5, bedrooms: 4, outdoor: 'cour', energy: 'D', status: 'disponible', description: 'Échoppe rénovée avec quatre chambres et cour.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85' },
    { id: 'P-105', title: 'Atelier Bastide', type: 'Appartement', city: 'Bordeaux', neighborhood: 'La Bastide', price: 219000, area: 42, rooms: 2, bedrooms: 1, outdoor: 'aucun', energy: 'E', status: 'disponible', description: 'Deux pièces aux lignes sobres, proche des commerces.', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=900&q=85' },
    { id: 'P-106', title: 'Maison des Pins', type: 'Maison', city: 'Mérignac', neighborhood: 'Arlac', price: 390000, area: 88, rooms: 4, bedrooms: 3, outdoor: 'jardin', energy: 'D', status: 'indisponible', description: 'Maison de plain-pied avec jardin arboré.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85' },
  ],
  visits: 'Visites proposées du mardi au samedi sur des créneaux indicatifs. Aucune visite réelle ni réservation enregistrée.',
  qualification: ['ville ou quartier', 'budget maximal', 'type de bien', 'surface minimale', 'nombre de chambres', 'extérieur souhaité'],
};
