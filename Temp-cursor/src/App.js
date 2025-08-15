import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Trophy, 
  Zap, 
  Heart, 
  RotateCcw, 
  Home,
  Brain,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, won, lost
  const [secretNumber, setSecretNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(10);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // success, warning, error, info
  const [showThinking, setShowThinking] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('normal'); // easy, normal, hard

  const difficulties = {
    easy: { range: [1, 50], maxAttempts: 12 },
    normal: { range: [1, 100], maxAttempts: 10 },
    hard: { range: [1, 200], maxAttempts: 8 }
  };

  const startNewGame = () => {
    const currentDifficulty = difficulties[difficulty];
    const newSecretNumber = Math.floor(
      Math.random() * (currentDifficulty.range[1] - currentDifficulty.range[0] + 1)
    ) + currentDifficulty.range[0];
    
    setSecretNumber(newSecretNumber);
    setUserGuess('');
    setAttempts(0);
    setFeedback('');
    setFeedbackType('');
    setGameState('playing');
    setShowThinking(true);
    
    // Simulate thinking animation
    setTimeout(() => setShowThinking(false), 2000);
  };

  const handleGuess = () => {
    if (!userGuess || userGuess < difficulties[difficulty].range[0] || userGuess > difficulties[difficulty].range[1]) {
      setFeedback('Please enter a valid number!');
      setFeedbackType('error');
      return;
    }

    const guess = parseInt(userGuess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess === secretNumber) {
      setGameState('won');
      setFeedback(`🎉 Congratulations! You found the number ${secretNumber} in ${newAttempts} attempt(s)!`);
      setFeedbackType('success');
      
      // Add to game history
      setGameHistory(prev => [...prev, {
        difficulty,
        attempts: newAttempts,
        secretNumber,
        won: true,
        timestamp: new Date()
      }]);
    } else {
      const remaining = difficulties[difficulty].maxAttempts - newAttempts;
      
      if (remaining === 0) {
        setGameState('lost');
        setFeedback(`💀 Game Over! The number was ${secretNumber}. Better luck next time!`);
        setFeedbackType('error');
        
        // Add to game history
        setGameHistory(prev => [...prev, {
          difficulty,
          attempts: newAttempts,
          secretNumber,
          won: false,
          timestamp: new Date()
        }]);
      } else {
        // Give hint
        const difference = Math.abs(guess - secretNumber);
        let hint = '';
        let type = 'info';
        
        if (difference <= 5) {
          hint = '🔥 Very hot! You\'re very close!';
          type = 'warning';
        } else if (difference <= 15) {
          hint = '🔥 Getting warm!';
          type = 'warning';
        } else if (guess < secretNumber) {
          hint = '❄️ Too low! Try a higher number.';
          type = 'info';
        } else {
          hint = '❄️ Too high! Try a lower number.';
          type = 'info';
        }
        
        setFeedback(`${hint} You have ${remaining} attempt(s) left.`);
        setFeedbackType(type);
      }
    }
    
    setUserGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      handleGuess();
    }
  };

  const resetGame = () => {
    setGameState('welcome');
    setSecretNumber(null);
    setUserGuess('');
    setAttempts(0);
    setFeedback('');
    setFeedbackType('');
    setShowThinking(false);
  };

  const getPerformanceMessage = () => {
    if (attempts === 1) return { message: '🏆 PERFECT! First try - you\'re amazing!', color: 'var(--success)' };
    if (attempts <= 3) return { message: '🥇 Excellent! You\'re a great guesser!', color: 'var(--success)' };
    if (attempts <= 5) return { message: '🥈 Good job! You did well!', color: 'var(--warning)' };
    return { message: '🥉 Nice work! You got there in the end!', color: 'var(--info)' };
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'easy': return 'var(--success)';
      case 'normal': return 'var(--warning)';
      case 'hard': return 'var(--danger)';
      default: return 'var(--primary)';
    }
  };

  return (
    <div className="app">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.header className="header" layout>
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Target size={32} />
            <h1>Number Guessing Game</h1>
          </motion.div>
          
          {gameState !== 'welcome' && (
            <motion.button
              className="home-btn"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Home size={20} />
              Home
            </motion.button>
          )}
        </motion.header>

        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {gameState === 'welcome' && (
            <motion.div
              key="welcome"
              className="welcome-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="welcome-icon"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Brain size={80} />
              </motion.div>
              
              <h2>🎯 Welcome to the Number Guessing Game! 🎯</h2>
              <p>Test your intuition and guess the secret number!</p>
              
              <div className="difficulty-selector">
                <h3>Choose Difficulty:</h3>
                <div className="difficulty-buttons">
                  {Object.entries(difficulties).map(([key, value]) => (
                    <motion.button
                      key={key}
                      className={`difficulty-btn ${difficulty === key ? 'active' : ''}`}
                      onClick={() => setDifficulty(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        borderColor: getDifficultyColor(key),
                        backgroundColor: difficulty === key ? getDifficultyColor(key) : 'transparent'
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <div className="difficulty-info">
                        <span>Range: {value.range[0]}-{value.range[1]}</span>
                        <span>Attempts: {value.maxAttempts}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <motion.button
                className="start-btn"
                onClick={startNewGame}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Zap size={20} />
                Start Game
              </motion.button>
              
              {gameHistory.length > 0 && (
                <motion.div
                  className="game-history"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3>📊 Recent Games</h3>
                  <div className="history-items">
                    {gameHistory.slice(-3).reverse().map((game, index) => (
                      <motion.div
                        key={index}
                        className={`history-item ${game.won ? 'won' : 'lost'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <span className="history-icon">
                          {game.won ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        </span>
                        <span className="history-details">
                          {game.difficulty} • {game.attempts} attempts • {game.won ? 'Won' : 'Lost'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Game Screen */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              className="game-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {showThinking ? (
                <motion.div
                  className="thinking-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="thinking-icon"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <Brain size={60} />
                  </motion.div>
                  <h3>🤔 Thinking of a number...</h3>
                  <p>Range: {difficulties[difficulty].range[0]}-{difficulties[difficulty].range[1]}</p>
                </motion.div>
              ) : (
                <>
                  <div className="game-info">
                    <div className="info-card">
                      <Timer size={20} />
                      <span>Attempts: {attempts}/{difficulties[difficulty].maxAttempts}</span>
                    </div>
                    <div className="info-card">
                      <Target size={20} />
                      <span>Range: {difficulties[difficulty].range[0]}-{difficulties[difficulty].range[1]}</span>
                    </div>
                  </div>
                  
                  <div className="guess-section">
                    <h3>🎲 Make your guess!</h3>
                    <div className="input-group">
                      <input
                        type="number"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Enter a number (${difficulties[difficulty].range[0]}-${difficulties[difficulty].range[1]})`}
                        min={difficulties[difficulty].range[0]}
                        max={difficulties[difficulty].range[1]}
                        className="guess-input"
                      />
                      <motion.button
                        className="guess-btn"
                        onClick={handleGuess}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!userGuess}
                      >
                        Guess!
                      </motion.button>
                    </div>
                  </div>
                  
                  {feedback && (
                    <motion.div
                      className={`feedback ${feedbackType}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {feedback}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* Won Screen */}
          {gameState === 'won' && (
            <motion.div
              key="won"
              className="result-screen won"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="result-icon"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1 }}
              >
                <Trophy size={80} />
              </motion.div>
              
              <h2>🎉 Congratulations! 🎉</h2>
              <p>You guessed the number {secretNumber} in {attempts} attempt(s)!</p>
              
              <motion.div
                className="performance-message"
                style={{ color: getPerformanceMessage().color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {getPerformanceMessage().message}
              </motion.div>
              
              <div className="result-actions">
                <motion.button
                  className="play-again-btn"
                  onClick={startNewGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={20} />
                  Play Again
                </motion.button>
                <motion.button
                  className="home-btn"
                  onClick={resetGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={20} />
                  New Game
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Lost Screen */}
          {gameState === 'lost' && (
            <motion.div
              key="lost"
              className="result-screen lost"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="result-icon"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 1 }}
              >
                <XCircle size={80} />
              </motion.div>
              
              <h2>💀 Game Over! 💀</h2>
              <p>The number was {secretNumber}</p>
              <p>Better luck next time!</p>
              
              <div className="result-actions">
                <motion.button
                  className="play-again-btn"
                  onClick={startNewGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={20} />
                  Try Again
                </motion.button>
                <motion.button
                  className="home-btn"
                  onClick={resetGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={20} />
                  New Game
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
