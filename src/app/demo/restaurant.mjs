// Données exclusivement fictives, affichées par le mini-site et utilisées par l'assistant.
export const restaurant = {
  name: 'Maison Sève', city: 'Bordeaux',
  description: 'Restaurant fictif de cuisine de saison imaginé par PixelBoost.',
  hours: 'Démonstration : mardi à samedi, 12 h–14 h et 19 h–22 h.',
  allergenGuide: {
    note: 'Ingrédients et allergènes fictifs déclarés dans les recettes de démonstration. Ils ne couvrent ni les traces possibles, ni les substitutions, ni la contamination croisée. Aucun plat ne peut être garanti sans allergène.',
    categories: ['gluten', 'crustacés', 'œuf', 'poisson', 'arachides', 'soja', 'lait', 'fruits à coque', 'céleri', 'moutarde', 'sésame', 'sulfites', 'lupin', 'mollusques'],
    aliases: { cacahuètes: 'arachides', cacahuète: 'arachides', noisettes: 'fruits à coque', noisette: 'fruits à coque', amandes: 'fruits à coque', lactose: 'lait', fromage: 'lait', blé: 'gluten', farine: 'gluten', tahini: 'sésame' },
  },
  menu: [
    { id: 'veloute', ingredients: ['courge', 'crème', 'noisettes', 'huile de noisette', 'herbes fraîches'], category: 'Entrées', name: 'Velouté de courge, noisettes torréfiées', description: 'Courge rôtie, huile de noisette et herbes fraîches.', price: 9, vegetarian: true, allergens: ['fruits à coque', 'lait'] },
    { id: 'betterave', ingredients: ['betteraves', 'fromage de chèvre', 'miel', 'huile d’olive', 'vinaigre'], category: 'Entrées', name: 'Betteraves, chèvre frais et miel', description: 'Betteraves de saison, fromage frais et vinaigrette douce.', price: 11, vegetarian: true, allergens: ['lait'] },
    { id: 'oeuf', ingredients: ['œuf', 'champignons', 'crème', 'pain de blé'], category: 'Entrées', name: 'Œuf parfait, champignons et pain grillé', description: 'Crème de champignons et mouillettes de campagne.', price: 12, vegetarian: true, allergens: ['œuf', 'gluten', 'lait'] },
    { id: 'legumes', ingredients: ['légumes de saison', 'pois chiches', 'tahini (sésame)', 'huile d’olive'], category: 'Plats', name: 'Légumes rôtis, crème de pois chiches', description: 'Légumes du moment et sauce au tahini.', price: 16, vegetarian: true, allergens: ['sésame'] },
    { id: 'nouilles', ingredients: ['nouilles de blé', 'légumes', 'cacahuètes', 'sauce soja'], category: 'Plats', name: 'Nouilles de blé, légumes et sauce cacahuète', description: 'Nouilles sautées, légumes croquants, sauce aux arachides et soja.', price: 18, vegetarian: true, allergens: ['gluten', 'arachides', 'soja'] },
    { id: 'poisson', ingredients: ['poisson blanc', 'riz', 'citron', 'légumes verts', 'huile d’olive'], category: 'Plats', name: 'Poisson du marché, riz citronné', description: 'Poisson selon arrivage et légumes verts.', price: 24, vegetarian: false, allergens: ['poisson'] },
    { id: 'volaille', ingredients: ['volaille', 'pommes de terre', 'jus de volaille', 'huile d’olive'], category: 'Plats', name: 'Volaille fermière, pommes grenaille', description: 'Jus réduit et pommes de terre rôties.', price: 22, vegetarian: false, allergens: [] },
    { id: 'risotto', ingredients: ['riz', 'champignons', 'parmesan', 'beurre', 'bouillon de légumes'], category: 'Plats', name: 'Risotto de champignons et parmesan', description: 'Riz crémeux, champignons et copeaux de parmesan.', price: 19, vegetarian: true, allergens: ['lait'] },
    { id: 'tarte', ingredients: ['pommes', 'farine de blé', 'beurre', 'sucre'], category: 'Desserts', name: 'Tarte aux pommes', description: 'Pommes caramélisées et pâte croustillante.', price: 8, vegetarian: true, allergens: ['gluten', 'lait'] },
    { id: 'chocolat', ingredients: ['chocolat noir', 'œufs', 'noisettes', 'sucre'], category: 'Desserts', name: 'Mousse au chocolat noir', description: 'Chocolat intense et éclats de noisette.', price: 9, vegetarian: true, allergens: ['œuf', 'fruits à coque'] },
    { id: 'fraises', category: 'Desserts', name: 'Fraises fraîches et crème vanillée', description: 'Fraises, crème légère à la vanille et éclats de biscuit.', ingredients: ['fraises', 'crème', 'vanille', 'biscuit de blé'], price: 9, vegetarian: true, allergens: ['lait', 'gluten'] },
    { id: 'poire', ingredients: ['poire', 'eau', 'sucre', 'cannelle', 'agrumes'], category: 'Desserts', name: 'Poire pochée aux épices', description: 'Poire au sirop épicé et zestes d’agrumes.', price: 8, vegetarian: true, allergens: [] },
    { id: 'limonade', ingredients: ['eau gazeuse', 'citron', 'menthe', 'sucre'], category: 'Boissons', name: 'Limonade maison', description: 'Citron et menthe.', price: 5, vegetarian: true, allergens: [] },
    { id: 'jus', ingredients: ['jus de pomme'], category: 'Boissons', name: 'Jus de pomme artisanal', description: 'Servi frais.', price: 4, vegetarian: true, allergens: [] },
    { id: 'cafe', ingredients: ['café ou plantes pour infusion', 'eau'], category: 'Boissons', name: 'Café ou infusion', description: 'Selon la sélection du moment.', price: 3, vegetarian: true, allergens: [] },
  ],
  booking: { slots: ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30'], maxGuests: 6 },
};
