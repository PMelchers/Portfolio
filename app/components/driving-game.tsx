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
  const [car, setCar] = useState<CarPosition>({ x: 80, y: 400, angle: 0 });
  const [progress, setProgress] = useState(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number | null>(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive canvas sizing
  useEffect(() => {
    const handleResize = () => {
      const maxWidth = Math.min(window.innerWidth - 40, 1200);
      const maxHeight = Math.min(window.innerHeight - 200, 600);
      const mobile = window.innerWidth < 768;
      
      setIsMobile(mobile);
      
      if (mobile) {
        setCanvasSize({ width: maxWidth, height: maxHeight * 0.7 });
      } else {
        setCanvasSize({ width: maxWidth, height: maxHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the race track checkpoints for progress tracking - positioned on the actual track
  const checkpoints: Checkpoint[] = [
    { x: 100, y: canvasSize.height - 100, width: 40, height: 40, id: 0 }, // Start/Finish line
    { x: 300, y: canvasSize.height - 100, width: 40, height: 40, id: 1 }, // Bottom straight
    { x: 500, y: canvasSize.height - 100, width: 40, height: 40, id: 2 }, // Bottom straight
    { x: 700, y: canvasSize.height - 100, width: 40, height: 40, id: 3 }, // Bottom straight
    { x: canvasSize.width - 100, y: canvasSize.height - 100, width: 40, height: 40, id: 4 }, // Turn 1 (bottom-right)
    { x: canvasSize.width - 100, y: canvasSize.height - 300, width: 40, height: 40, id: 5 }, // Right straight
    { x: canvasSize.width - 100, y: canvasSize.height - 450, width: 40, height: 40, id: 6 }, // Right straight
    { x: canvasSize.width - 100, y: 100, width: 40, height: 40, id: 7 }, // Turn 2 (top-right)
    { x: canvasSize.width - 300, y: 100, width: 40, height: 40, id: 8 }, // Top straight
    { x: canvasSize.width - 500, y: 100, width: 40, height: 40, id: 9 }, // Top straight
    { x: canvasSize.width - 700, y: 100, width: 40, height: 40, id: 10 }, // Top straight
    { x: 100, y: 100, width: 40, height: 40, id: 11 }, // Turn 3 (top-left)
    { x: 100, y: 250, width: 40, height: 40, id: 12 }, // Left straight
    { x: 100, y: 400, width: 40, height: 40, id: 13 }, // Left straight
  ];

  // Track boundaries for collision detection - Simple square track
  const isOnTrack = (x: number, y: number): boolean => {
    const trackWidth = 80;
    const margin = 60;
    
    // Track boundaries
    const outerLeft = margin;
    const outerRight = canvasSize.width - margin;
    const outerTop = margin;
    const outerBottom = canvasSize.height - margin;
    
    const innerLeft = margin + trackWidth;
    const innerRight = canvasSize.width - margin - trackWidth;
    const innerTop = margin + trackWidth;
    const innerBottom = canvasSize.height - margin - trackWidth;
    
    // Check if point is within the track (between outer and inner boundaries)
    const withinOuter = x >= outerLeft && x <= outerRight && y >= outerTop && y <= outerBottom;
    const withinInner = x >= innerLeft && x <= innerRight && y >= innerTop && y <= innerBottom;
    
    // On track if within outer boundary but not within inner boundary
    return withinOuter && !withinInner;
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
    
    // Check if car is close to the current checkpoint
    const distance = Math.sqrt(
      Math.pow(car.x - currentCheckpointData.x, 2) + 
      Math.pow(car.y - currentCheckpointData.y, 2)
    );
    
    // If car is close to checkpoint, advance to next one
    if (distance < 50) {
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

    // Clear canvas with grass color
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const trackWidth = 80;
    const margin = 60;
    
    // Draw track surface (simple square)
    ctx.fillStyle = '#374151';
    ctx.fillRect(margin, margin, canvas.width - 2 * margin, trackWidth); // Top
    ctx.fillRect(margin, margin, trackWidth, canvas.height - 2 * margin); // Left
    ctx.fillRect(canvas.width - margin - trackWidth, margin, trackWidth, canvas.height - 2 * margin); // Right
    ctx.fillRect(margin, canvas.height - margin - trackWidth, canvas.width - 2 * margin, trackWidth); // Bottom

    // Draw track outer boundaries (blue)
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(margin - 2, margin - 2, canvas.width - 2 * margin + 4, canvas.height - 2 * margin + 4);
    ctx.stroke();

    // Draw track inner boundaries (blue)
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(margin + trackWidth + 2, margin + trackWidth + 2, 
             canvas.width - 2 * margin - 2 * trackWidth - 4, 
             canvas.height - 2 * margin - 2 * trackWidth - 4);
    ctx.stroke();

    // Draw track center line (dashed yellow)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 10]);
    // Top
    ctx.beginPath();
    ctx.moveTo(margin + trackWidth/2, margin + trackWidth/2);
    ctx.lineTo(canvas.width - margin - trackWidth/2, margin + trackWidth/2);
    ctx.stroke();
    // Right
    ctx.beginPath();
    ctx.moveTo(canvas.width - margin - trackWidth/2, margin + trackWidth/2);
    ctx.lineTo(canvas.width - margin - trackWidth/2, canvas.height - margin - trackWidth/2);
    ctx.stroke();
    // Bottom
    ctx.beginPath();
    ctx.moveTo(canvas.width - margin - trackWidth/2, canvas.height - margin - trackWidth/2);
    ctx.lineTo(margin + trackWidth/2, canvas.height - margin - trackWidth/2);
    ctx.stroke();
    // Left
    ctx.beginPath();
    ctx.moveTo(margin + trackWidth/2, canvas.height - margin - trackWidth/2);
    ctx.lineTo(margin + trackWidth/2, margin + trackWidth/2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw start/finish line
    ctx.fillStyle = gameCompleted ? '#22c55e' : '#ef4444';
    ctx.fillRect(margin - 5, canvas.height - margin - trackWidth, 10, trackWidth);
    
    // Start/Finish text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(gameCompleted ? 'FINISH' : 'START', margin + 40, canvas.height - margin - trackWidth/2 + 4);

    // Draw checkpoints on the track
    checkpoints.forEach((checkpoint, index) => {
      if (index === 0) return; // Skip start/finish line
      
      ctx.fillStyle = index === currentCheckpoint ? 
        'rgba(34, 197, 94, 0.8)' : 'rgba(251, 191, 36, 0.6)';
      ctx.beginPath();
      ctx.arc(checkpoint.x, checkpoint.y, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Add border
      ctx.strokeStyle = index === currentCheckpoint ? '#22c55e' : '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(checkpoint.x, checkpoint.y, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add checkpoint number
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${index}`, checkpoint.x, checkpoint.y + 3);
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

  }, [car, currentCheckpoint, gameCompleted, canvasSize]);

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
    // Position car at start line on the track
    setCar({ 
      x: 100, 
      y: canvasSize.height - 100, 
      angle: 0 
    });
    setProgress(0);
    setCurrentCheckpoint(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    // Reset car position
    setCar({ 
      x: 100, 
      y: canvasSize.height - 100, 
      angle: 0 
    });
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
          width={canvasSize.width}
          height={canvasSize.height}
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
              <p>Now let's explore my projects!</p>
              <button onClick={resetGame} className={styles.resetButton}>
                🔄 Race Again
              </button>
            </div>
          </div>
        )}
      </div>

      {gameStarted && !gameCompleted && (
        <div className={styles.controls}>
          <p>🎮 Controls: {isMobile ? 'Use virtual buttons below' : 'WASD or Arrow Keys to drive'} | Stay on the track!</p>
        </div>
      )}

      {isMobile && (
        <div className={styles.mobileMessage}>
          <h3>Mobile Play</h3>
          <p>Game is optimized for desktop with keyboard controls</p>
          <p>For best experience, please use a desktop/laptop</p>
        </div>
      )}
    </div>
  );
};

export default DrivingGame;