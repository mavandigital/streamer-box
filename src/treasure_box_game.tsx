import React, { useState, useEffect } from 'react';
import { Gift, RotateCcw, Sparkles, Star, Crown } from 'lucide-react';

type Particle = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
};

const TreasureBoxGame = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [currentReward, setCurrentReward] = useState<string>('');
  const [usedBoxes, setUsedBoxes] = useState<number[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const rewards = [
    "sub x5 🎉",
    "mangia qualcosa 🍕",
    "bevi qualcosa 🥤",
    "fai 10 flessioni 💪",
    "fai 10 squat 🦵",
    "fai un balletto 💃",
    "parla con un accento diverso 🗣️",
    "canta una canzone cringe 🎵",
    "racconta un segreto imbarazzante 🤫",
    "imita un animale 🐶",
    "leggi un messaggio con voce sexy 😏",
    "indossa un accessorio buffo 🎭",
    "fai il contrario di quello che dice la chat ↩️",
    "metti una foto imbarazzante 📸",
    "parla solo a gesti per 1 minuto 🤐"
  ];

  const boxColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500'
  ];

  const createParticles = () => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        delay: Math.random() * 1000
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    if (showAnimation) {
      createParticles();
      const timer = setTimeout(() => setShowAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleBoxClick = (boxIndex: number) => {
    if (usedBoxes.includes(boxIndex)) return;

    setSelectedBox(boxIndex);
    setShowAnimation(true);

    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setCurrentReward(randomReward);
      setUsedBoxes([...usedBoxes, boxIndex]);
      setGameState('result');
    }, 1500);
  };

  const resetGame = () => {
    setGameState('menu');
    setSelectedBox(null);
    setCurrentReward('');
    setUsedBoxes([]);
    setShowAnimation(false);
    setParticles([]);
  };

  const startNewGame = () => {
    setGameState('playing');
  };

  const playAgain = () => {
    if (usedBoxes.length >= 6) {
      resetGame();
    } else {
      setGameState('playing');
      setSelectedBox(null);
      setCurrentReward('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-60 right-60 w-28 h-28 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Particles animation */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-bounce"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}ms`,
                transform: `rotate(${particle.rotation}deg)`
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
          ))}
        </div>
      )}

      <div className="text-center z-10 relative">
        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-2 text-shadow-lg animate-pulse">
          <Crown className="inline-block mr-4 text-yellow-400" />
          STREAMER BOX
          <Crown className="inline-block ml-4 text-yellow-400" />
        </h1>
        <p className="text-lg text-gray-300 mb-6">powered by Pestilence</p>

        {/* Menu State */}
        {gameState === 'menu' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-12 border-2 border-yellow-400/50 shadow-2xl">
            <Gift className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-bold text-white mb-8">Benvenuto Streamer!</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
              Qualcuno ha fatto una sub! È ora di aprire una Treasure Box e scoprire quale sfida ti aspetta!
            </p>
            <button
              onClick={startNewGame}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎮 INIZIA NUOVO GIOCO
            </button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-400/50 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">
              {selectedBox === null ? 'Scegli una Treasure Box!' : 'Aprendo la box...'}
            </h2>

            {selectedBox === null ? (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[0, 1, 2, 3, 4, 5].map((boxIndex) => (
                  <button
                    key={boxIndex}
                    onClick={() => handleBoxClick(boxIndex)}
                    disabled={usedBoxes.includes(boxIndex)}
                    className={`
                      relative w-24 h-24 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg
                      ${usedBoxes.includes(boxIndex)
                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                        : `bg-gradient-to-br ${boxColors[boxIndex]} hover:shadow-2xl animate-pulse`
                      }
                    `}
                  >
                    {usedBoxes.includes(boxIndex) ? (
                      <div className="text-4xl">❌</div>
                    ) : (
                      <Gift className="w-12 h-12 text-white mx-auto animate-bounce" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${boxColors[selectedBox]} animate-spin shadow-2xl flex items-center justify-center`}>
                  <Star className="w-16 h-16 text-white animate-pulse" />
                </div>
                <p className="text-xl text-yellow-300 mt-4 animate-pulse">Preparati alla sorpresa...</p>
              </div>
            )}

            <p className="text-gray-300 text-lg">
              Box usate: {usedBoxes.length}/6
              {usedBoxes.length > 0 && (
                <span className="text-yellow-400 ml-2">
                  (Puoi sceglierne ancora {6 - usedBoxes.length})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Result State */}
        {gameState === 'result' && (
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-12 border-2 border-green-400/50 shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-6">LA TUA SFIDA È:</h2>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-3xl py-6 px-8 rounded-2xl mb-8 shadow-inner">
              {currentReward}
            </div>

            <div className="flex flex-col gap-4">
              {usedBoxes.length < 6 && (
                <button
                  onClick={playAgain}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🎲 APRI UN'ALTRA BOX
                </button>
              )}

              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                RICOMINCIA DA CAPO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureBoxGame;
