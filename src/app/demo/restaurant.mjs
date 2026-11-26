export const restaurant = {
  name: 'Maison Sève', city: 'Bordeaux',
  description: 'Restaurant fictif de cuisine de saison imaginé par PixelBoost.',
  hours: 'Démonstration : mardi à samedi, 12 h–14 h et 19 h–22 h.',
  menu: [
    { id: 'legumes', name: 'Légumes rôtis, crème de pois chiches', price: 16, vegetarian: true, allergens: ['sésame'] },
    { id: 'poisson', name: 'Poisson du marché, riz citronné', price: 24, vegetarian: false, allergens: ['poisson'] },
    { id: 'volaille', name: 'Volaille fermière, pommes grenaille', price: 22, vegetarian: false, allergens: [] },
    { id: 'tarte', name: 'Tarte aux pommes', price: 8, vegetarian: true, allergens: ['gluten', 'lait'] },
  ],
  booking: { slots: ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30'], maxGuests: 6 },
};
