'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './driving-game.module.css';

interface CarPosition {
  x: number;
  y: number;
  angle: number;
}

interface Checkpoint {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
}

const DrivingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [car, setCar] = useState<CarPosition>({ x: 650, y: 430, angle: 0 });
  const [progress, setProgress] = useState(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number | null>(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);

  // Define the race track checkpoints for progress tracking
  const checkpoints: Checkpoint[] = [
    { x: 650, y: 400, width: 300, height: 50, id: 0 }, // Start/Finish line
    { x: 950, y: 200, width: 50, height: 100, id: 1 }, // Turn 1
    { x: 800, y: 180, width: 100, height: 50, id: 2 }, // Turn 2 (moved down)
    { x: 200, y: 180, width: 100, height: 50, id: 3 }, // Turn 3 (moved down)
    { x: 100, y: 300, width: 50, height: 100, id: 4 }, // Turn 4
    { x: 300, y: 400, width: 100, height: 50, id: 5 }, // Turn 5
  ];

  // Track boundaries for collision detection
  const isOnTrack = (x: number, y: number): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    
    // Define proper track boundaries for oval track
    const trackCenterX = canvas.width / 2;
    const trackCenterY = canvas.height / 2;
    
    // Outer oval boundary
    const outerA = 450; // Semi-major axis
    const outerB = 150; // Semi-minor axis
    const outerDist = Math.pow(x - trackCenterX, 2) / Math.pow(outerA, 2) + 
                      Math.pow(y - trackCenterY, 2) / Math.pow(outerB, 2);
    
    // Inner oval boundary
    const innerA = 350; // Semi-major axis
    const innerB = 80; // Semi-minor axis
    const innerDist = Math.pow(x - trackCenterX, 2) / Math.pow(innerA, 2) + 
                      Math.pow(y - trackCenterY, 2) / Math.pow(innerB, 2);
    
    // Car is on track if it's between inner and outer boundaries
    return outerDist <= 1 && innerDist >= 1;
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
      event.preventDefault();
      keysPressed.current.add(key);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    keysPressed.current.delete(key);
  }, []);

  const updateCarPosition = useCallback(() => {
    if (!gameStarted || gameCompleted) return;

    setCar(prevCar => {
      let newX = prevCar.x;
      let newY = prevCar.y;
      let newAngle = prevCar.angle;

      const speed = 2; // Reduced speed
      const turnSpeed = 0.08; // Reduced turn speed

      // Handle rotation
      if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
        newAngle -= turnSpeed;
      }
      if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
        newAngle += turnSpeed;
      }

      // Handle movement
      if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
        const deltaX = Math.cos(newAngle) * speed;
        const deltaY = Math.sin(newAngle) * speed;
        
        // Check if new position is on track
        if (isOnTrack(newX + deltaX, newY + deltaY)) {
          newX += deltaX;
          newY += deltaY;
        }
      }
      if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
        const deltaX = Math.cos(newAngle) * speed * 0.5;
        const deltaY = Math.sin(newAngle) * speed * 0.5;
        
        // Check if new position is on track
        if (isOnTrack(newX - deltaX, newY - deltaY)) {
          newX -= deltaX;
          newY -= deltaY;
        }
      }

      return { x: newX, y: newY, angle: newAngle };
    });
  }, [gameStarted, gameCompleted]);

  const checkProgress = useCallback(() => {
    const currentCheckpointData = checkpoints[currentCheckpoint];
    if (
      car.x >= currentCheckpointData.x &&
      car.x <= currentCheckpointData.x + currentCheckpointData.width &&
      car.y >= currentCheckpointData.y &&
      car.y <= currentCheckpointData.y + currentCheckpointData.height
    ) {
      const nextCheckpoint = (currentCheckpoint + 1) % checkpoints.length;
      setCurrentCheckpoint(nextCheckpoint);
      
      if (nextCheckpoint === 0 && currentCheckpoint === checkpoints.length - 1) {
        // Completed a lap
        setGameCompleted(true);
        setProgress(100);
      } else {
        setProgress((nextCheckpoint / checkpoints.length) * 100);
      }
    }
  }, [car, currentCheckpoint]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0f1c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw track
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw outer track boundary
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 450, 150, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Draw track surface
    ctx.fillStyle = '#374151';
    ctx.fill();

    // Draw inner track boundary
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 350, 80, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Draw center line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 400, 115, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw start/finish line
    ctx.fillStyle = gameCompleted ? '#22c55e' : '#ef4444';
    ctx.fillRect(620, 380, 60, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(gameCompleted ? 'FINISH' : 'START', 650, 405);

    // Draw checkpoints with transparency
    checkpoints.forEach((checkpoint, index) => {
      if (index === 0) return; // Skip start/finish line
      ctx.fillStyle = index === currentCheckpoint ? 
        'rgba(34, 197, 94, 0.6)' : 'rgba(251, 191, 36, 0.6)';
      ctx.fillRect(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
      
      // Add border
      ctx.strokeStyle = index === currentCheckpoint ? '#22c55e' : '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
      
      // Add checkpoint number
      ctx.fillStyle = '#000000';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${index}`, checkpoint.x + checkpoint.width/2, checkpoint.y + checkpoint.height/2 + 4);
    });

    // Draw car
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-12, -6, 24, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, -4, 4, 8);
    ctx.restore();

  }, [car, currentCheckpoint, gameCompleted]);

  const gameLoop = useCallback(() => {
    updateCarPosition();
    checkProgress();
    drawGame();
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [updateCarPosition, checkProgress, drawGame]);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameCompleted, gameLoop]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setCar({ x: 650, y: 430, angle: 0 });
    setProgress(0);
    setCurrentCheckpoint(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCar({ x: 650, y: 430, angle: 0 });
    setProgress(0);
    setCurrentCheckpoint(0);
    keysPressed.current.clear();
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.gameTitle}>
          🏁 Portfolio Racing Challenge
        </div>
        <div className={styles.gameProgress}>
          Course Progress: {progress.toFixed(1)}%
        </div>
      </div>
      
      <div className={styles.gameArea}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={600}
          className={styles.gameCanvas}
        />
        
        {!gameStarted && !gameCompleted && (
          <div className={styles.gameOverlay}>
            <button onClick={startGame} className={styles.startButton}>
              🏎️ Start Race
            </button>
            <p className={styles.instructions}>
              Use WASD or Arrow Keys to drive around the track!
            </p>
          </div>
        )}

        {gameCompleted && (
          <div className={styles.gameOverlay}>
            <div className={styles.completionMessage}>
              <h2>🏆 Welcome to my Portfolio!</h2>
              <p>Congratulations! You've completed the race.</p>
              <p>Now let's explore my projects below!</p>
              <button onClick={resetGame} className={styles.resetButton}>
                🔄 Race Again
              </button>
            </div>
          </div>
        )}
      </div>

      {gameStarted && !gameCompleted && (
        <div className={styles.controls}>
          <p>🎮 Controls: WASD or Arrow Keys to drive | Stay on the track!</p>
        </div>
      )}
    </div>
  );
};

export default DrivingGame;