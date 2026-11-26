import { restaurant } from '../../../src/app/demo/restaurant.mjs';

const isoDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date;
export function checkTables({ date, time, guests }) {
  if (!isoDate(date) || !restaurant.booking.slots.includes(time) || !Number.isInteger(guests) || guests < 1 || guests > restaurant.booking.maxGuests) return { available: false, reason: 'Date, horaire ou nombre de personnes invalide.' };
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  if (day === 0 || day === 1) return { available: false, reason: 'Fermé le dimanche et le lundi dans cette démonstration.' };
  const today = new Date().toISOString().slice(0, 10);
  if (date < today) return { available: false, reason: 'Date passée.' };
  return { available: true, date, time, guests, simulated: true };
}
export function simulateBooking(args) {
  const result = checkTables(args);
  if (!result.available) return result;
  if (typeof args.name !== 'string' || !/^([a-zÀ-ÿ '-]{2,35})$/i.test(args.name) || !['Camille Exemple', 'Alex Démo', 'Client Test'].includes(args.name)) return { confirmed: false, reason: 'Utilisez uniquement un nom fictif : Camille Exemple, Alex Démo ou Client Test.' };
  return { confirmed: true, simulated: true, label: 'CONFIRMATION FICTIVE — aucune table réellement réservée', ...result, name: args.name };
}
export const tools = [
  { type: 'function', name: 'check_tables', description: 'Vérifier un créneau fictif, uniquement si la date ISO, heure et nombre de personnes sont connus.', parameters: { type: 'object', properties: { date: { type: 'string', description: 'Date AAAA-MM-JJ' }, time: { type: 'string', description: 'Heure HH:MM' }, guests: { type: 'integer' } }, required: ['date', 'time', 'guests'], additionalProperties: false }, strict: true },
  { type: 'function', name: 'simulate_booking', description: 'Confirmer une réservation uniquement fictive après confirmation explicite du visiteur. Ne jamais demander de vraies coordonnées.', parameters: { type: 'object', properties: { date: { type: 'string' }, time: { type: 'string' }, guests: { type: 'integer' }, name: { type: 'string', description: 'Nom fictif autorisé' } }, required: ['date', 'time', 'guests', 'name'], additionalProperties: false }, strict: true },
];
export function executeTool(name, args) {
  if (name === 'check_tables') return checkTables(args);
  if (name === 'simulate_booking') return simulateBooking(args);
  return { error: 'Outil inconnu' };
}
