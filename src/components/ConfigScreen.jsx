import { THEMES, LEVELS } from '../data/themes';

export default function ConfigScreen({ level, setLevel, theme, setTheme, onStart }) {
  const isAdvanced = level === 'avance';

  return (
    <div className={`config-screen ${isAdvanced ? 'mode-advanced' : 'mode-zen'}`}>
      <div className="config-inner">
        <div className="config-header">
          <div className="logo">🃏 CardMind</div>
          <p className="tagline">
            {isAdvanced ? 'Entraîne ta mémoire, bats ton record' : 'Entraîne ta mémoire, à ton rythme'}
          </p>
        </div>

        <div className="config-card">
          <h2 className="config-title">Nouvelle partie</h2>

          {/* Niveau */}
          <div className="config-group">
            <div className="config-label">Niveau de jeu</div>
            <div className="level-grid">
              {Object.entries(LEVELS).map(([key, cfg]) => (
                <button
                  key={key}
                  className={`level-btn ${level === key ? 'active' : ''}`}
                  onClick={() => setLevel(key)}
                >
                  <span className="level-icon">{cfg.icon}</span>
                  <span className="level-name">{cfg.label}</span>
                  <span className="level-desc">{cfg.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Thème */}
          <div className="config-group">
            <div className="config-label">Thème des cartes</div>
            <div className="theme-grid">
              {Object.entries(THEMES).map(([key, cfg]) => (
                <button
                  key={key}
                  className={`theme-btn ${theme === key ? 'active' : ''}`}
                  onClick={() => setTheme(key)}
                >
                  <span className="theme-icon">{cfg.icon}</span>
                  <span className="theme-name">{cfg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button className="play-btn" onClick={onStart}>
            {isAdvanced ? '▶ LANCER LA PARTIE' : '▶ Commencer à jouer'}
          </button>
        </div>
      </div>
    </div>
  );
}
