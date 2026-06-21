export default function Card({ card, onClick, isAdvanced }) {
  const { flipped, matched, icon } = card;
  const state = matched ? 'matched' : flipped ? 'flipped' : 'hidden';

  return (
    <div
      className={`card card-${state} ${isAdvanced ? 'card-advanced' : ''}`}
      onClick={() => !flipped && !matched && onClick(card.id)}
      aria-label={flipped || matched ? icon : 'Carte cachée'}
    >
      <div className="card-inner">
        <div className="card-back">
          {isAdvanced ? '◈' : '✦'}
        </div>
        <div className="card-front">
          {icon}
        </div>
      </div>
    </div>
  );
}
