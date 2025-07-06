'use client';

import React, { useState, useEffect } from 'react';
import styles from './system-monitor.module.css';

interface SystemMonitorProps {
  className?: string;
}

const SystemMonitor: React.FC<SystemMonitorProps> = ({ className }) => {
  const [food, setFood] = useState(85);
  const [drink, setDrink] = useState(70);
  const [energy, setEnergy] = useState(90);
  const [workEfficiency, setWorkEfficiency] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [isTakingBreak, setIsTakingBreak] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to code!');

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate work efficiency based on other bars
      const avgStats = (food + drink + energy) / 3;
      setWorkEfficiency(avgStats);
      
      // Check if any individual bar is at 0%
      if (food <= 0 && !isTakingBreak) {
        setIsTakingBreak(true);
        setIsWorking(false);
        setStatusMessage('I need food! Taking a break to grab a snack...');
        
        setTimeout(() => {
          setFood(100);
          setIsTakingBreak(false);
          setStatusMessage('Well fed and ready to code!');
        }, 3000);
      } else if (drink <= 0 && !isTakingBreak) {
        setIsTakingBreak(true);
        setIsWorking(false);
        setStatusMessage('I need drink! Taking a break to refuel...');
        
        setTimeout(() => {
          setDrink(100);
          setIsTakingBreak(false);
          setStatusMessage('Thirst levels restored!');
        }, 3000);
      } else if (energy <= 0 && !isTakingBreak) {
        setIsTakingBreak(true);
        setIsWorking(false);
        setStatusMessage('I need rest! Taking a break to recharge...');
        
        setTimeout(() => {
          setEnergy(100);
          setIsTakingBreak(false);
          setStatusMessage('Fully recharged and ready to code!');
        }, 3000);
      } else if (!isTakingBreak) {
        // Normal working cycle
        const workingNow = Math.random() > 0.05; // 70% chance of working
        setIsWorking(workingNow);
        
        if (workingNow) {
          setFood(prev => Math.max(0, prev - Math.random() * 2));
          setDrink(prev => Math.max(0, prev - Math.random() * 3));
          setEnergy(prev => Math.max(0, prev - Math.random() * 1.5));
          
          const messages = [
            'Coding in the zone...',
            'Building amazing features...',
            'Debugging like a pro...',
            'Creating digital magic...',
            'In deep focus mode...'
          ];
          setStatusMessage(messages[Math.floor(Math.random() * messages.length)]);
        } else {
          setStatusMessage('Taking a quick breather...');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [food, drink, energy, isTakingBreak]);

  const getStatusColor = (value: number) => {
    if (value > 60) return styles.statusGood;
    if (value > 30) return styles.statusWarning;
    return styles.statusCritical;
  };

  const getWorkColor = (value: number) => {
    if (value > 80) return styles.statusWork;
    if (value > 40) return styles.statusWorking;
    return styles.statusIdle;
  };

  const currentTasks = [
    { name: 'Portfolio Website', progress: 85, status: 'Active' },
    { name: 'React Components', progress: 92, status: 'Testing' },
    { name: 'CMS Integration', progress: 67, status: 'In Progress' },
    { name: 'UI/UX Design', progress: 78, status: 'Review' },
  ];

  return (
    <div className={`${styles.systemMonitor} ${className || ''}`}>
      <div className={styles.monitorHeader}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>👨‍💻</span>
          <span>Pim's Monitor</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusIndicator}>
            <div className={`${styles.statusDot} ${isWorking ? styles.working : styles.idle}`}></div>
            <span>{isWorking ? 'Working' : 'Idle'}</span>
          </div>
        </div>
      </div>

      <div className={styles.monitorBody}>
        <div className={styles.statusSection}>
          <div className={styles.statusMessage}>
            {statusMessage}
          </div>
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>🍕</span>
              <span className={styles.metricLabel}>Food</span>
            </div>
            <div className={styles.metricValue}>
              {food.toFixed(1)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getStatusColor(food)}`}
                style={{ width: `${food}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>☕</span>
              <span className={styles.metricLabel}>Drink</span>
            </div>
            <div className={styles.metricValue}>
              {drink.toFixed(1)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getStatusColor(drink)}`}
                style={{ width: `${drink}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>⚡</span>
              <span className={styles.metricLabel}>Energy</span>
            </div>
            <div className={styles.metricValue}>
              {energy.toFixed(1)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getStatusColor(energy)}`}
                style={{ width: `${energy}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>💻</span>
              <span className={styles.metricLabel}>Work Efficiency</span>
            </div>
            <div className={styles.metricValue}>
              {workEfficiency.toFixed(1)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getWorkColor(workEfficiency)}`}
                style={{ width: `${workEfficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.processesSection}>
          <h3 className={styles.sectionTitle}>Current Projects</h3>
          <div className={styles.processTable}>
            <div className={styles.processHeader}>
              <div className={styles.processName}>Project</div>
              <div className={styles.processCpu}>Progress</div>
              <div className={styles.processMemory}>Status</div>
            </div>
            {currentTasks.map((task, index) => (
              <div key={index} className={styles.processRow}>
                <div className={styles.processName}>{task.name}</div>
                <div className={styles.processCpu}>{task.progress}%</div>
                <div className={styles.processMemory}>{task.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;