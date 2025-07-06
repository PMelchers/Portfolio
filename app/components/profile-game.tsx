'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './profile-game.module.css';

interface FallingObject {
  id: number;
  x: number;
  y: number;
  type: 'code' | 'coffee' | 'bug' | 'star';
  speed: number;
}

interface ProfileGameProps {
  className?: string;
}

const ProfileGame: React.FC<ProfileGameProps> = ({ className }) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const objectTypes = ['code', 'coffee', 'bug', 'star'];
  const objectEmojis = {
    code: '⚡',
    coffee: '☕',
    bug: '🐛',
    star: '⭐'
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setObjects([]);
    setPlayerPosition(50);
  };

  const stopGame = () => {
    setGameActive(false);
    setObjects([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const movePlayer = (direction: 'left' | 'right') => {
    if (!gameActive) return;
    
    setPlayerPosition(prev => {
      const newPos = direction === 'left' ? prev - 5 : prev + 5;
      return Math.max(10, Math.min(90, newPos));
    });
  };

  const spawnObject = () => {
    const newObject: FallingObject = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -5,
      type: objectTypes[Math.floor(Math.random() * objectTypes.length)] as any,
      speed: Math.random() * 2 + 1
    };
    setObjects(prev => [...prev, newObject]);
  };

  const updateGame = () => {
    if (!gameActive) return;

    setObjects(prev => {
      const updated = prev.map(obj => ({
        ...obj,
        y: obj.y + obj.speed
      })).filter(obj => obj.y < 110);

      // Check collisions with player
      const playerCollisions = updated.filter(obj => 
        obj.y > 85 && obj.y < 100 && 
        Math.abs(obj.x - playerPosition) < 8
      );

      if (playerCollisions.length > 0) {
        playerCollisions.forEach(obj => {
          if (obj.type === 'bug') {
            setScore(s => Math.max(0, s - 10));
          } else {
            setScore(s => s + (obj.type === 'star' ? 20 : 10));
          }
        });

        return updated.filter(obj => !playerCollisions.includes(obj));
      }

      return updated;
    });

    animationRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (gameActive) {
      const spawnInterval = setInterval(spawnObject, 1000);
      animationRef.current = requestAnimationFrame(updateGame);

      return () => {
        clearInterval(spawnInterval);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [gameActive, playerPosition]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        movePlayer('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive]);

  return (
    <div className={`${styles.profileGame} ${className || ''}`} ref={gameRef}>
      <div className={styles.gameHeader}>
        <div className={styles.gameTitle}>
          <span className={styles.gameIcon}>🎮</span>
          <span>Catch the Code!</span>
        </div>
        <div className={styles.gameScore}>
          Score: {score}
        </div>
      </div>

      <div className={styles.gameArea}>
        {/* Falling objects */}
        {objects.map(obj => (
          <div
            key={obj.id}
            className={styles.fallingObject}
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
            }}
          >
            {objectEmojis[obj.type]}
          </div>
        ))}

        {/* Player (Profile Picture) */}
        <div
          className={styles.player}
          style={{ left: `${playerPosition}%` }}
        >
          <Image
            src="/images/CV-foto.jpg"
            alt="Pim Melchers"
            width={60}
            height={60}
            className={styles.playerImage}
          />
        </div>

        {/* Game Controls */}
        <div className={styles.gameControls}>
          {!gameActive ? (
            <button onClick={startGame} className={styles.startButton}>
              Start Game
            </button>
          ) : (
            <div className={styles.controlsInfo}>
              <button onClick={stopGame} className={styles.stopButton}>
                Stop Game
              </button>
              <div className={styles.instructions}>
                Use ← → arrows or A/D keys to move
              </div>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className={styles.mobileControls}>
          <button
            className={styles.mobileButton}
            onMouseDown={() => movePlayer('left')}
            onTouchStart={() => movePlayer('left')}
          >
            ←
          </button>
          <button
            className={styles.mobileButton}
            onMouseDown={() => movePlayer('right')}
            onTouchStart={() => movePlayer('right')}
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.gameInstructions}>
        <p>Catch ⚡ code snippets and ☕ coffee for points!</p>
        <p>Avoid 🐛 bugs (-10 points) • ⭐ stars are worth 20 points!</p>
      </div>
    </div>
  );
};

export default ProfileGame;