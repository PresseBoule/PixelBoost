// Catalogue et conditions entièrement fictifs, partagés entre le site et l'assistant.
export const boutique = {
  name: 'Forma Objects',
  products: [
    { id: 'lampe', name: 'Lampe Sillage', category: 'Éclairage', price: 89, material: 'céramique et lin', color: 'écru', dimensions: 'H 32 × Ø 18 cm', description: 'Lampe de chevet à lumière douce.', style: 'minimaliste', stock: 'disponible' },
    { id: 'vase', name: 'Vase Terre', category: 'Décoration', price: 39, material: 'grès', color: 'sable', dimensions: 'H 24 × Ø 14 cm', description: 'Vase texturé pour fleurs séchées.', style: 'naturel', stock: 'disponible' },
    { id: 'plaid', name: 'Plaid Rivage', category: 'Textile', price: 69, material: 'coton', color: 'vert sauge', dimensions: '130 × 170 cm', description: 'Plaid léger pour canapé ou fauteuil.', style: 'chaleureux', stock: 'disponible' },
    { id: 'etagere', name: 'Étagère Ligne', category: 'Mobilier', price: 129, material: 'chêne', color: 'bois clair', dimensions: 'L 60 × P 18 × H 20 cm', description: 'Étagère murale pour livres et objets.', style: 'minimaliste', stock: 'disponible' },
    { id: 'table', name: 'Table basse Halo', category: 'Mobilier', price: 249, material: 'chêne et métal', color: 'bois clair et noir', dimensions: 'L 80 × P 50 × H 38 cm', description: 'Table basse aux lignes simples.', style: 'contemporain', stock: 'indisponible' },
    { id: 'coussin', name: 'Coussin Dune', category: 'Textile', price: 29, material: 'lin', color: 'terracotta', dimensions: '45 × 45 cm', description: 'Coussin décoratif avec housse amovible.', style: 'chaleureux', stock: 'disponible' },
  ],
  shipping: { area: 'France métropolitaine', standard: '4 à 6 jours ouvrés', fee: '6 €', freeFrom: 100, largeItems: 'Les meubles volumineux nécessitent un devis de transport : tarif et délai non renseignés.' },
  returns: 'Retour demandé dans les 14 jours après réception. Produit non utilisé, dans son emballage d’origine. Frais de retour à la charge du client. Conditions fictives de démonstration.',
  payment: 'Aucun paiement ni commande réels sur ce site de démonstration.',
};
