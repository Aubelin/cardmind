import { useState, useEffect, useCallback, useRef } from 'react';
import { THEMES, LEVELS } from '../data/themes';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(theme, level) {
  const icons = THEMES[theme].cards.slice(0, LEVELS[level].pairs);
  const pairs = [...icons, ...icons].map((icon, i) => ({
    id: i,
    icon,
    flipped: false,
    matched: false,
  }));
  return shuffle(pairs);
}

export function useGame() {
  const [screen, setScreen] = useState('config'); // config | game | result
  const [level, setLevel] = useState('debutant');
  const [theme, setTheme] = useState('animaux');
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error'|'timeout', msg }
  const [bestTime, setBestTime] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cardmind_best')) || {}; } catch { return {}; }
  });
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  const startGame = useCallback(() => {
    const deck = buildDeck(theme, level);
    const initialTime = LEVELS[level].timer;
    setCards(deck);
    setSelected([]);
    setMatched(0);
    setAttempts(0);
    setFeedback(null);
    setTimeLeft(initialTime);
    lockRef.current = false;
    setScreen('game');
  }, [theme, level]);

  // Timer countdown
  useEffect(() => {
    if (screen !== 'game' || timeLeft === null) return;
    if (timeLeft <= 0) {
      setFeedback({ type: 'timeout', msg: 'Temps écoulé !' });
      setTimeout(() => setScreen('result'), 1200);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [screen, timeLeft]);

  const flipCard = useCallback((id) => {
    if (lockRef.current) return;
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      if (!card || card.flipped || card.matched) return prev;
      return prev.map(c => c.id === id ? { ...c, flipped: true } : c);
    });
    setSelected(prev => {
      if (prev.length === 1 && prev[0] === id) return prev;
      return [...prev, id];
    });
  }, []);

  // Check match when 2 cards selected
  useEffect(() => {
    if (selected.length !== 2) return;
    lockRef.current = true;
    const [a, b] = selected;
    const cardA = cards.find(c => c.id === a);
    const cardB = cards.find(c => c.id === b);
    setAttempts(n => n + 1);

    if (cardA.icon === cardB.icon) {
      setFeedback({ type: 'success', msg: '✓ Paire trouvée !' });
      setCards(prev => prev.map(c =>
        c.id === a || c.id === b ? { ...c, matched: true, flipped: true } : c
      ));
      setMatched(n => n + 1);
      setSelected([]);
      lockRef.current = false;
    } else {
      setFeedback({ type: 'error', msg: '✗ Pas de correspondance' });
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === a || c.id === b ? { ...c, flipped: false } : c
        ));
        setSelected([]);
        setFeedback(null);
        lockRef.current = false;
      }, 900);
    }
  }, [selected]);

  // Check win
  const totalPairs = LEVELS[level].pairs;
  useEffect(() => {
    if (screen !== 'game' || matched === 0) return;
    if (matched === totalPairs) {
      clearTimeout(timerRef.current);
      const elapsed = LEVELS[level].timer ? LEVELS[level].timer - (timeLeft ?? 0) : null;
      setBestTime(prev => {
        const key = `${level}_${theme}`;
        const updated = { ...prev };
        if (!elapsed) return updated;
        if (!updated[key] || elapsed < updated[key]) {
          updated[key] = elapsed;
          localStorage.setItem('cardmind_best', JSON.stringify(updated));
        }
        return updated;
      });
      setTimeout(() => setScreen('result'), 800);
    }
  }, [matched, totalPairs, screen]);

  const resetToConfig = useCallback(() => {
    clearTimeout(timerRef.current);
    setScreen('config');
  }, []);

  const precision = attempts > 0 ? Math.round((matched / attempts) * 100) : 0;
  const elapsed = LEVELS[level].timer
    ? LEVELS[level].timer - (timeLeft ?? LEVELS[level].timer)
    : null;
  const bestKey = `${level}_${theme}`;
  const isNewRecord = elapsed && bestTime[bestKey] && elapsed <= bestTime[bestKey];

  const formatTime = (s) => {
    if (s === null) return null;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return {
    screen, level, setLevel, theme, setTheme,
    cards, selected, matched, attempts, timeLeft,
    feedback, precision, elapsed, bestTime, bestKey, isNewRecord,
    startGame, flipCard, resetToConfig, formatTime,
    totalPairs,
    levelConfig: LEVELS[level],
    themeConfig: THEMES[theme],
    timedOut: feedback?.type === 'timeout',
  };
}
