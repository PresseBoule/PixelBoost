// Planning déterministe de démonstration. Aucune écriture ni réservation réelle.
const parisDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const addDays = (date, count) => { const d = new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + count); return d.toISOString().slice(0, 10); };
export function beautySlots(today = parisDate()) {
  const slots = [];
  for (let offset = 1; offset <= 30; offset++) {
    const date = addDays(today, offset);
    const day = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (day === 0 || day === 1 || offset % 9 === 0) continue;
    const times = offset % 2 ? ['10:00', '14:00', '17:00'] : ['11:30', '15:30'];
    for (const time of times) slots.push({ date, time });
  }
  return slots;
}
export function searchBeautySlots({ date = '', period = 'any' } = {}) {
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00Z`)))) return { slots: [], message: 'Date invalide : indiquez AAAA-MM-JJ.' };
  if (!['any', 'morning', 'afternoon'].includes(period)) return { slots: [], message: 'Période invalide.' };
  const slots = beautySlots().filter(s => (!date || s.date === date) && (period === 'any' || (period === 'morning' ? s.time < '12:00' : s.time >= '12:00'))).slice(0, 5);
  return { slots, message: slots.length ? null : 'Aucun créneau proposé pour cette période dans le planning de démonstration.' };
}
export const beautyScheduleTool = { type: 'function', name: 'list_beauty_slots', description: 'Consulter les créneaux fictifs de Studio Alba sur les 30 prochains jours. Toujours appeler avant de communiquer une disponibilité. Ne réserve rien.', parameters: { type: 'object', properties: { date: { type: 'string', description: 'Date AAAA-MM-JJ ou chaîne vide pour les prochains créneaux' }, period: { type: 'string', enum: ['any', 'morning', 'afternoon'] } }, required: ['date', 'period'], additionalProperties: false }, strict: true };
