export default function ResultScreen({
  level, theme, matched, attempts, precision,
  elapsed, bestTime, bestKey, isNewRecord,
  timedOut, totalPairs, formatTime,
  onReplay, onConfig,
}) {
  const isAdvanced = level === 'avance';
  const won = matched === totalPairs;
  const elapsedStr = formatTime(elapsed);
  const bestStr = bestTime[bestKey] ? formatTime(bestTime[bestKey]) : null;

  return (
    <div className={`result-screen ${isAdvanced ? 'mode-advanced' : 'mode-zen'}`}>
      <div className="result-inner">

        {/* Header */}
        <div className="result-header">
          {isAdvanced ? (
            <>
              <div className="result-title-adv">
                Partie <span>{won ? 'terminée' : 'échouée'}</span>
              </div>
              {isNewRecord && won && (
                <div className="record-badge">⚡ NOUVEAU RECORD</div>
              )}
            </>
          ) : (
            <>
              <div className="result-emoji">{won ? '🎉' : '⏰'}</div>
              <div className="result-title-zen">
                {won ? 'Bravo !' : 'Temps écoulé !'}
              </div>
              <div className="result-subtitle">
                {won
                  ? 'Tu as trouvé toutes les paires ! Ta mémoire est en pleine forme 🌟'
                  : 'Ne te décourage pas, réessaie !'}
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className={`stats-grid ${isAdvanced ? 'stats-adv' : 'stats-zen'}`}>
          {isAdvanced && elapsedStr && (
            <div className="stat-card stat-highlight">
              <div className="stat-value">{elapsedStr}</div>
              <div className="stat-label">Temps</div>
              {isNewRecord && won && (
                <div className="stat-delta">▼ nouveau record</div>
              )}
              {bestStr && !isNewRecord && (
                <div className="stat-delta stat-delta-muted">Meilleur : {bestStr}</div>
              )}
            </div>
          )}
          <div className="stat-card">
            <div className="stat-value">{matched}</div>
            <div className="stat-label">Paires trouvées</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{attempts}</div>
            <div className="stat-label">Tentatives</div>
          </div>
          {isAdvanced && (
            <div className="stat-card">
              <div className="stat-value stat-precision">{precision}%</div>
              <div className="stat-label">Précision</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button className="btn-primary" onClick={onReplay}>
            {isAdvanced ? '▶ REJOUER' : '🔄 Rejouer'}
          </button>
          <button className="btn-secondary" onClick={onConfig}>
            {isAdvanced ? '⚙ CONFIG' : '⚙ Changer de configuration'}
          </button>
        </div>

      </div>
    </div>
  );
}
