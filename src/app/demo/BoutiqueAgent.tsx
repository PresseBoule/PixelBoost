import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; content: string };
const displayContent = (content: string) => content.replace(/\*\*/g, '').replace(/^\s*-\s+/gm, '• ').replace(/\n{3,}/g, '\n\n');
const greeting: Message = { role: 'assistant', content: 'Bienvenue chez Forma Objects. Je peux vous aider à choisir un objet selon votre pièce et votre budget, ou vous renseigner sur la livraison et les retours.' };
const suggestions = ['Une idée déco pour moins de 70 € ?', 'Quels sont les délais de livraison ?', 'Comment fonctionnent les retours ?'];
export default function BoutiqueAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState(() => crypto.randomUUID());
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) end.current?.scrollIntoView({ block: 'nearest' }); }, [messages, busy, open]);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  async function send(text: string) {
    if (busy || !text.trim()) return;
    const next = [...messages, { role: 'user' as const, content: text.trim().slice(0, 500) }];
    setMessages(next); setInput(''); setBusy(true);
    try {
      const response = await fetch('/.netlify/functions/demo-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ assistant: 'boutique', session, messages: next.slice(-9) }) });
      const data = await response.json();
      setMessages(current => [...current, { role: 'assistant', content: data.reply || data.error || 'Service indisponible.' }]);
    } catch { setMessages(current => [...current, { role: 'assistant', content: 'Service temporairement indisponible.' }]); }
    finally { setBusy(false); }
  }
  function submit(e: FormEvent) { e.preventDefault(); void send(input); }
  return <div className="fixed bottom-4 right-4 md:bottom-7 md:right-7 z-[80] font-sans text-[#24251f]">
    {open && <section role="dialog" aria-label="Assistant fictif Forma Objects" className="mb-3 flex h-[min(600px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-xl bg-[#faf7ee] shadow-2xl border border-[#8d9b80]">
      <header className="flex items-center justify-between bg-[#40473c] px-5 py-4 text-white"><div><strong className="font-black text-xl uppercase tracking-tight">Forma Objects</strong><p className="text-xs">Assistant IA · démonstration fictive</p><Link to="/demonstrations" className="text-xs underline underline-offset-4">Retour aux démos PixelBoost</Link></div><button aria-label="Fermer la conversation" onClick={() => setOpen(false)} className="p-2"><X size={20}/></button></header>
      <div aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3">{messages.map((m, i) => <p key={i} className={`max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'ml-auto bg-[#40473c] text-white' : 'bg-white border border-[#e3ddcf]'}`}>{displayContent(m.content)}</p>)}{busy && <p className="text-sm" role="status">L’assistant prépare sa réponse…</p>}{messages.length === 1 && <div className="flex flex-wrap gap-2">{suggestions.map(s => <button key={s} onClick={() => void send(s)} className="border border-[#8d9b80] px-3 py-2 text-xs text-left">{s}</button>)}</div>}<div ref={end}/></div>
      <p className="px-4 text-xs text-[#5d6060]">Aucune commande ni aucun paiement réel. Ne saisissez aucune coordonnée.</p>
      <form onSubmit={submit} className="flex gap-2 p-3"><input ref={field} aria-label="Votre message" maxLength={500} value={input} onChange={e => setInput(e.target.value)} placeholder="Votre question…" className="min-w-0 flex-1 border border-[#cbbd9e] bg-white px-3 py-3 text-sm"/><button disabled={busy || !input.trim()} aria-label="Envoyer" className="bg-[#40473c] px-4 text-white disabled:opacity-50"><Send size={18}/></button><button type="button" aria-label="Recommencer la conversation" onClick={() => { setMessages([greeting]); setSession(crypto.randomUUID()); }} className="p-2"><RotateCcw size={18}/></button></form>
    </section>}
    <button onClick={() => setOpen(!open)} aria-label={open ? 'Fermer l’assistant' : 'Ouvrir l’assistant Forma Objects'} className="ml-auto flex items-center gap-2 bg-[#8d9b80] px-5 py-4 font-bold text-[#24251f] shadow-xl"><MessageCircle size={20}/><span>{open ? 'Fermer' : 'Parler à Forma Objects'}</span></button>
  </div>;
}
