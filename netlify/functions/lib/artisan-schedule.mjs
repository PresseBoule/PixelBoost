// Planning de démonstration déterministe, sans base de données ni réservation.
const parisDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const addDays = (date, count) => {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + count);
  return day.toISOString().slice(0, 10);
};
export function availableSlots(today = parisDate()) {
  const result = [];
  for (let offset = 1; offset <= 30; offset++) {
    const date = addDays(today, offset);
    const day = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (day === 0 || day === 6 || offset % 7 === 0) continue;
    const times = offset % 3 === 0 ? ['09:00'] : offset % 3 === 1 ? ['10:30', '14:00'] : ['14:00', '16:00'];
    for (const time of times) result.push({ date, time });
  }
  return result;
}
export function searchSlots({ date = '', period = 'any' } = {}) {
  const today = parisDate();
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { slots: [], message: 'Date invalide : indiquez AAAA-MM-JJ.' };
  if (!['any', 'morning', 'afternoon'].includes(period)) return { slots: [], message: 'Période invalide.' };
  const slots = availableSlots(today).filter(slot => (!date || slot.date === date) && (period === 'any' || (period === 'morning' ? slot.time < '12:00' : slot.time >= '12:00'))).slice(0, 5);
  return { slots, message: slots.length ? null : 'Aucun créneau indiqué sur cette période dans le planning simulé.' };
}
export const scheduleTool = { type: 'function', name: 'list_artisan_slots', description: 'Consulter le planning simulé Atelier Volt pour trouver les prochains créneaux ou une date précise. Toujours appeler cet outil avant de donner une disponibilité. Ne confirme jamais de rendez-vous.', parameters: { type: 'object', properties: { date: { type: 'string', description: 'Date AAAA-MM-JJ, chaîne vide pour les prochains créneaux' }, period: { type: 'string', enum: ['any', 'morning', 'afternoon'] } }, required: ['date', 'period'], additionalProperties: false }, strict: true };
