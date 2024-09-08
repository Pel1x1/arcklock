import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({ left: 300, right: 300 }); 
  const [activePlayer, setActivePlayer] = useState('left');
  const [intervalId, setIntervalId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [initialTime, setInitialTime] = useState(300);

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
    }
  }, [gameOver, intervalId]);

  useEffect(() => {
    if (timeLeft.left <= 0 || timeLeft.right <= 0) {
      setGameOver(true);
    }
  }, [timeLeft]);
//
  const switchPlayer = () => {
    if (gameOver) return;

    clearInterval(intervalId);
    const newIntervalId = setInterval(() => {
      setTimeLeft(prevTime => ({
        ...prevTime,
        [activePlayer]: prevTime[activePlayer] - 1
      }));
    }, 1000);

    setIntervalId(newIntervalId);
    setActivePlayer(activePlayer === 'left' ? 'right' : 'left');
  };

  const restartGame = () => {
    clearInterval(intervalId);
    setTimeLeft({ left: initialTime, right: initialTime });
    setActivePlayer('left');
    setGameOver(false);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value) * 60;
    setInitialTime(newTime);
    restartGame();
  };

  return (
    <div className="App">
      <h1>Часы</h1>
      <div className="clock">
        <div className={`player ${activePlayer === 'left' ? 'active' : ''}`}>
          <h2>Игрок 1</h2>
          <p>{Math.floor(timeLeft.left / 60)}:{(timeLeft.left % 60).toString().padStart(2, '0')}</p>
        </div>
        <div className={`player ${activePlayer === 'right' ? 'active' : ''}`}>
          <h2>Игрок 2</h2>
          <p>{Math.floor(timeLeft.right / 60)}:{(timeLeft.right % 60).toString().padStart(2, '0')}</p>
        </div>
      </div>
      <button onClick={switchPlayer} disabled={gameOver}>Смена игрока</button>
      <button onClick={restartGame}>Перезапуск</button>
      <div>
        <label>
          Set Game Duration (minutes):
          <input type="number" min="1" onChange={handleTimeChange} />
        </label>
      </div>
      {gameOver && <h2>Game Over!</h2>}
    </div>
  );
}

export default App;