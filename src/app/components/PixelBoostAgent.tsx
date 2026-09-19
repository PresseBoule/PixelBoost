import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, LoaderCircle, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; content: string };

const welcome: Message = {
  role: 'assistant',
  content: "Bonjour, je suis Nova, l'assistante IA de PixelBoost. Je peux répondre à vos questions ou vous aider à imaginer l'agent idéal pour votre activité.",
};

const suggestions = [
  'Comment fonctionne un agent IA ?',
  'Quel agent me faut-il ?',
  'Je veux refaire mon site',
];

export default function PixelBoostAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const projectBrief = messages
    .filter((message) => message.role === 'user')
    .slice(-6)
    .map((message) => `- ${message.content}`)
    .join('\n');
  const contactUrl = `/contact?brief=${encodeURIComponent(projectBrief.slice(0, 1800))}`;

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, open]);

  useEffect(() => {
    const openAgent = () => setOpen(true);
    window.addEventListener('pixelboost:open-agent', openAgent);
    return () => window.removeEventListener('pixelboost:open-agent', openAgent);
  }, []);

  async function sendMessage(message: string) {
    const content = message.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.reply || data.error || 'Une erreur est survenue. Réessayez dans un instant.' },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: "Je n'arrive pas à joindre le service pour l'instant. Vous pouvez écrire à pixelboost22@gmail.com." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed right-4 bottom-4 md:right-7 md:bottom-7 z-[60] font-['DM_Sans',sans-serif]">
      {open && (
        <section className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] h-[min(650px,calc(100vh-7rem))] flex flex-col overflow-hidden border border-border bg-background shadow-2xl shadow-black/20" aria-label="Conversation avec Nova, l'assistante PixelBoost">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 bg-secondary">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-foreground text-background"><Sparkles size={16} /></span>
              <div>
                <p className="font-['Chakra_Petch',monospace] text-sm text-foreground">Nova · PixelBoost</p>
                <p className="text-[11px] text-muted-foreground">Assistant IA · Répond en quelques secondes</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => { setMessages([welcome]); setInput(''); }} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Recommencer la conversation"><RotateCcw size={15} /></button>
              <button onClick={() => setOpen(false)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Fermer l'assistant"><X size={18} /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] whitespace-pre-wrap px-3.5 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-foreground text-background' : 'border border-border bg-secondary text-foreground'}`}>
                  {message.content}
                </p>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} onClick={() => void sendMessage(suggestion)} className="border border-border px-3 py-2 text-left text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {loading && <div className="flex items-center gap-2 text-xs text-muted-foreground"><LoaderCircle size={14} className="animate-spin" /> Nova réfléchit…</div>}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3 bg-background">
            <a href={contactUrl} className="mb-3 flex items-center justify-between border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              {projectBrief ? 'Préparer ma demande' : 'Parler de mon projet'} <ChevronDown size={13} className="-rotate-90" />
            </a>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <label className="sr-only" htmlFor="pixelboost-agent-input">Votre message</label>
              <input id="pixelboost-agent-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} placeholder="Posez votre question…" className="min-w-0 flex-1 bg-secondary border border-border px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/50" disabled={loading} />
              <button type="submit" disabled={loading || !input.trim()} className="flex w-10 shrink-0 items-center justify-center bg-foreground text-background disabled:opacity-40 hover:bg-foreground/85" aria-label="Envoyer"><Send size={15} /></button>
            </form>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">Nova est une assistante automatisée. Évitez de partager des informations sensibles.</p>
          </div>
        </section>
      )}

      <button onClick={() => setOpen((value) => !value)} className="ml-auto flex items-center gap-2 bg-foreground px-4 py-3.5 text-sm text-background shadow-lg transition-transform hover:-translate-y-0.5" aria-expanded={open} aria-label={open ? "Fermer l'assistant PixelBoost" : "Ouvrir l'assistant PixelBoost"}>
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="font-['Chakra_Petch',monospace] tracking-wide">Tester l'agent</span>
      </button>
    </div>
  );
}
