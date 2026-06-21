export const THEMES = {
  animaux: {
    label: 'Animaux',
    icon: '🐾',
    cards: ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐮', '🐷', '🐙', '🦋', '🦀', '🐬', '🦜', '🐘'],
  },
  nature: {
    label: 'Nature',
    icon: '🌿',
    cards: ['🌸', '🌻', '🍀', '🌈', '⭐', '🌊', '🍁', '🌵', '🍄', '🌺', '🍇', '🌙', '☀️', '❄️', '🌋', '🍉', '🦋', '🌴'],
  },
  tech: {
    label: 'Techno',
    icon: '💻',
    cards: ['💻', '🖥️', '📱', '⌨️', '🖱️', '💾', '📡', '🔋', '🖨️', '🎮', '📷', '🔌', '💡', '🤖', '🛸', '🧬', '📻', '⚙️'],
  },
};

export const LEVELS = {
  debutant: {
    label: 'Débutant',
    icon: '🌱',
    desc: '4×4 cartes · Sans minuterie',
    grid: 4,
    pairs: 8,
    timer: null,
  },
  avance: {
    label: 'Avancé',
    icon: '⚡',
    desc: '6×6 cartes · Minuterie 3:00',
    grid: 6,
    pairs: 18,
    timer: 180,
  },
};
