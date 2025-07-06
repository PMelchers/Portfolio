'use client';

import React, { useState, useEffect } from 'react';
import styles from './cpu-monitor.module.css';

interface CPUMonitorProps {
  className?: string;
}

const CPUMonitor: React.FC<CPUMonitorProps> = ({ className }) => {
  const [cpuUsage, setCpuUsage] = useState(25);
  const [memoryUsage, setMemoryUsage] = useState(45);
  const [processes, setProcesses] = useState([
    { name: 'VSCode', cpu: 15, memory: 512 },
    { name: 'Chrome', cpu: 25, memory: 1024 },
    { name: 'Node.js', cpu: 8, memory: 256 },
    { name: 'React Dev', cpu: 12, memory: 384 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(5, Math.min(95, prev + change));
      });
      
      setMemoryUsage(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(10, Math.min(90, prev + change));
      });

      setProcesses(prev => prev.map(proc => ({
        ...proc,
        cpu: Math.max(1, Math.min(50, proc.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(50, Math.min(2048, proc.memory + (Math.random() - 0.5) * 100))
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.cpuMonitor} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>🖥️</span>
          <span>System Resources</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.gauges}>
          <div className={styles.gauge}>
            <div className={styles.gaugeLabel}>CPU Usage</div>
            <div className={styles.gaugeValue}>{cpuUsage.toFixed(1)}%</div>
            <div className={styles.gaugeBar}>
              <div 
                className={`${styles.gaugeFill} ${cpuUsage > 70 ? styles.critical : cpuUsage > 50 ? styles.warning : styles.normal}`}
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          <div className={styles.gauge}>
            <div className={styles.gaugeLabel}>Memory Usage</div>
            <div className={styles.gaugeValue}>{memoryUsage.toFixed(1)}%</div>
            <div className={styles.gaugeBar}>
              <div 
                className={`${styles.gaugeFill} ${memoryUsage > 70 ? styles.critical : memoryUsage > 50 ? styles.warning : styles.normal}`}
                style={{ width: `${memoryUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.processList}>
          <div className={styles.processHeader}>
            <span>Process</span>
            <span>CPU</span>
            <span>Memory</span>
          </div>
          {processes.map((process, index) => (
            <div key={index} className={styles.processItem}>
              <span className={styles.processName}>{process.name}</span>
              <span className={styles.processCpu}>{process.cpu.toFixed(1)}%</span>
              <span className={styles.processMemory}>{process.memory.toFixed(0)}MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CPUMonitor;