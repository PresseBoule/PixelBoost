import { immobilier } from '../../../src/app/demo/immobilier.mjs';

const parisDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const addDays = (date, count) => { const d = new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + count); return d.toISOString().slice(0, 10); };
export function findProperties({ city = '', maxPrice = 0, minArea = 0, minBedrooms = 0, type = 'any', outdoor = false } = {}) {
  if (!Number.isFinite(maxPrice) || maxPrice < 0 || !Number.isFinite(minArea) || minArea < 0 || !Number.isFinite(minBedrooms) || minBedrooms < 0 || !['any', 'Maison', 'Appartement'].includes(type)) return [];
  return immobilier.properties.filter(p => p.status === 'disponible' && (!city || `${p.city} ${p.neighborhood}`.toLocaleLowerCase('fr').includes(city.toLocaleLowerCase('fr'))) && (!maxPrice || p.price <= maxPrice) && (!minArea || p.area >= minArea) && (!minBedrooms || p.bedrooms >= minBedrooms) && (type === 'any' || p.type === type) && (!outdoor || p.outdoor !== 'aucun'));
}
export function visitSlots({ propertyId = '', date = '' } = {}) {
  const property = immobilier.properties.find(p => p.id === propertyId && p.status === 'disponible');
  if (!property) return { slots: [], message: 'Référence indisponible ou inconnue : précisez un bien disponible du catalogue.' };
  const parsed = date ? new Date(`${date}T12:00:00Z`) : null;
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date)) return { slots: [], message: 'Date invalide : indiquez AAAA-MM-JJ.' };
  const slots = [];
  for (let offset = 1; offset <= 30; offset++) {
    const day = addDays(parisDate(), offset);
    const weekday = new Date(`${day}T12:00:00Z`).getUTCDay();
    if (weekday === 0 || weekday === 1 || offset % 8 === 0 || (date && date !== day)) continue;
    slots.push({ date: day, time: offset % 2 ? '11:00' : '16:00' });
    if (slots.length === 5) break;
  }
  return { slots, message: slots.length ? null : 'Aucun créneau proposé à cette date dans le planning simulé.' };
}
export const propertyTools = [
  { type: 'function', name: 'search_properties', description: 'Filtrer exclusivement le catalogue Perspective selon des critères. À appeler avant de recommander des biens.', parameters: { type: 'object', properties: { city: { type: 'string', description: 'Ville ou quartier, vide si sans préférence' }, maxPrice: { type: 'number', description: 'Budget maximal en euros, zéro si inconnu' }, minArea: { type: 'number', description: 'Surface minimale m², zéro si inconnue' }, minBedrooms: { type: 'number', description: 'Chambres minimum, zéro si inconnues' }, type: { type: 'string', enum: ['any', 'Maison', 'Appartement'] }, outdoor: { type: 'boolean', description: 'Vrai si extérieur indispensable' } }, required: ['city', 'maxPrice', 'minArea', 'minBedrooms', 'type', 'outdoor'], additionalProperties: false }, strict: true },
  { type: 'function', name: 'list_visit_slots', description: 'Consulter des créneaux fictifs pour visiter un bien disponible. À appeler avant toute proposition de visite.', parameters: { type: 'object', properties: { propertyId: { type: 'string', description: 'Référence P-101 à P-106 du bien demandé' }, date: { type: 'string', description: 'AAAA-MM-JJ ou chaîne vide pour les prochains créneaux' } }, required: ['propertyId', 'date'], additionalProperties: false }, strict: true },
];
