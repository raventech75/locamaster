import { useState, useEffect } from 'react';

const TEXTS = [
  'Plombiers', 'Menuisiers', 'Électriciens',
  'Cuisinistes', 'Artisans du bâtiment', 'PME locales',
];

export default function HeroTypewriter() {
  const [display, setDisplay]     = useState('');
  const [textIdx, setTextIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = TEXTS[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => {
        setDisplay(d => d.slice(0, -1));
      }, 30);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setCharIdx(0);
      setTextIdx(i => (i + 1) % TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, display, textIdx]);

  return (
    <span>
      {display}
      <span
        style={{ borderRight: '2px solid #F2B01E', marginLeft: 1, animation: 'blink 0.8s step-end infinite' }}
        aria-hidden="true"
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
