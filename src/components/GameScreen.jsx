import Card from './Card';

export default function GameScreen({
  cards, level, theme, matched, attempts, timeLeft,
  feedback, precision, onFlip, onQuit, formatTime,
  totalPairs, levelConfig, themeConfig,
}) {
  const isAdvanced = level === 'avance';
  const progress = totalPairs > 0 ? (matched / totalPairs) * 100 : 0;

  return (
    <div className={`game-screen ${isAdvanced ? 'mode-advanced' : 'mode-zen'}`}>
      {/* Header */}
      <div className="game-header">
        <div className="logo">{isAdvanced ? 'CARDMIND' : '🃏 CardMind'}</div>
        <div className="header-right">
          {isAdvanced && <span className="mode-badge">AVANCÉ · {themeConfig.label.toUpperCase()}</span>}
          <button className="quit-btn" onClick={onQuit}>← Quitter</button>
        </div>
      </div>

      {/* HUD */}
      <div className={`hud ${isAdvanced ? 'hud-advanced' : 'hud-zen'}`}>
        {isAdvanced && timeLeft !== null && (
          <div className={`hud-item hud-timer ${timeLeft <= 30 ? 'hud-urgent' : ''}`}>
            <div className="hud-value">{formatTime(timeLeft)}</div>
            <div className="hud-label">Temps</div>
          </div>
        )}
        <div className="hud-item">
          <div className="hud-value">{matched}</div>
          <div className="hud-label">{isAdvanced ? 'Paires' : 'Paires trouvées'}</div>
        </div>
        <div className="hud-item">
          <div className="hud-value">{attempts}</div>
          <div className="hud-label">{isAdvanced ? 'Essais' : 'Tentatives'}</div>
        </div>
        {isAdvanced && (
          <div className="hud-item">
            <div className="hud-value hud-precision">{precision}%</div>
            <div className="hud-label">Précision</div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Grid */}
      <div
        className="card-grid"
        style={{ '--cols': levelConfig.grid }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={onFlip}
            isAdvanced={isAdvanced}
          />
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`feedback feedback-${feedback.type}`}>
          {feedback.msg}
        </div>
      )}
    </div>
  );
}
