import { useGame } from './hooks/useGame';
import ConfigScreen from './components/ConfigScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

export default function App() {
  const game = useGame();

  if (game.screen === 'config') {
    return (
      <ConfigScreen
        level={game.level}
        setLevel={game.setLevel}
        theme={game.theme}
        setTheme={game.setTheme}
        onStart={game.startGame}
      />
    );
  }

  if (game.screen === 'game') {
    return (
      <GameScreen
        cards={game.cards}
        level={game.level}
        theme={game.theme}
        matched={game.matched}
        attempts={game.attempts}
        timeLeft={game.timeLeft}
        feedback={game.feedback}
        precision={game.precision}
        onFlip={game.flipCard}
        onQuit={game.resetToConfig}
        formatTime={game.formatTime}
        totalPairs={game.totalPairs}
        levelConfig={game.levelConfig}
        themeConfig={game.themeConfig}
      />
    );
  }

  return (
    <ResultScreen
      level={game.level}
      theme={game.theme}
      matched={game.matched}
      attempts={game.attempts}
      precision={game.precision}
      elapsed={game.elapsed}
      bestTime={game.bestTime}
      bestKey={game.bestKey}
      isNewRecord={game.isNewRecord}
      timedOut={game.timedOut}
      totalPairs={game.totalPairs}
      formatTime={game.formatTime}
      onReplay={game.startGame}
      onConfig={game.resetToConfig}
    />
  );
}
