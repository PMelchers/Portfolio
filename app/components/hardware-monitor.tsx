'use client';

import React, { useState, useEffect } from 'react';
import styles from './hardware-monitor.module.css';

interface HardwareMonitorProps {
  className?: string;
}

const HardwareMonitor: React.FC<HardwareMonitorProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [cpuTemp, setCpuTemp] = useState(42);
  const [gpuTemp, setGpuTemp] = useState(38);
  const [ramUsage, setRamUsage] = useState(65);
  const [diskUsage, setDiskUsage] = useState(78);
  const [networkSpeed, setNetworkSpeed] = useState(125);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCpuTemp(prev => Math.max(35, Math.min(85, prev + (Math.random() - 0.5) * 4)));
      setGpuTemp(prev => Math.max(30, Math.min(80, prev + (Math.random() - 0.5) * 3)));
      setRamUsage(prev => Math.max(40, Math.min(90, prev + (Math.random() - 0.5) * 5)));
      setDiskUsage(prev => Math.max(50, Math.min(95, prev + (Math.random() - 0.5) * 2)));
      setNetworkSpeed(prev => Math.max(50, Math.min(300, prev + (Math.random() - 0.5) * 20)));
    }, 2000);

    return () => clearInterval(interval);
  }, [mounted]);

  const getHardwareStatus = (value: number, type: 'temp' | 'usage' | 'speed') => {
    if (type === 'temp') {
      if (value > 70) return styles.critical;
      if (value > 55) return styles.warning;
      return styles.good;
    }
    if (type === 'usage') {
      if (value > 85) return styles.critical;
      if (value > 70) return styles.warning;
      return styles.good;
    }
    return styles.good;
  };

  return (
    <div className={`${styles.hardwareMonitor} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>⚡</span>
          <span>System Performance</span>
        </div>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
          <span>Optimal</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.hardwareGrid}>
          <div className={styles.hardwareCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🖥️</span>
              <span className={styles.cardTitle}>CPU</span>
            </div>
            <div className={styles.cardValue}>
              {cpuTemp.toFixed(1)}°C
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getHardwareStatus(cpuTemp, 'temp')}`}
                style={{ width: `${(cpuTemp / 100) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.hardwareCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🎮</span>
              <span className={styles.cardTitle}>GPU</span>
            </div>
            <div className={styles.cardValue}>
              {gpuTemp.toFixed(1)}°C
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getHardwareStatus(gpuTemp, 'temp')}`}
                style={{ width: `${(gpuTemp / 100) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.hardwareCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>💾</span>
              <span className={styles.cardTitle}>RAM</span>
            </div>
            <div className={styles.cardValue}>
              {ramUsage.toFixed(0)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getHardwareStatus(ramUsage, 'usage')}`}
                style={{ width: `${ramUsage}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.hardwareCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>💿</span>
              <span className={styles.cardTitle}>Disk</span>
            </div>
            <div className={styles.cardValue}>
              {diskUsage.toFixed(0)}%
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${getHardwareStatus(diskUsage, 'usage')}`}
                style={{ width: `${diskUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.networkSection}>
          <div className={styles.networkTitle}>Network Activity</div>
          <div className={styles.networkValue}>{networkSpeed.toFixed(0)} Mbps</div>
          <div className={styles.networkGraph}>
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index}
                className={styles.graphBar}
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareMonitor;