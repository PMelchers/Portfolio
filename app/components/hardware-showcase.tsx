'use client';

import React, { useState, useEffect } from 'react';
import styles from './hardware-showcase.module.css';

interface HardwareShowcaseProps {
  className?: string;
}

const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({ className }) => {
  const [activeComponent, setActiveComponent] = useState(0);
  const [specs, setSpecs] = useState({
    cpu: { temp: 45, usage: 35, boost: false },
    gpu: { temp: 52, usage: 28, memory: 6.2 },
    ram: { used: 12.4, total: 32, speed: 3200 },
    storage: { read: 2400, write: 1800, usage: 68 }
  });

  const components = [
    {
      name: 'AMD Ryzen 7',
      icon: '🖥️',
      type: 'CPU',
      details: `${specs.cpu.temp}°C • ${specs.cpu.usage}% Usage`,
      color: '#ef4444'
    },
    {
      name: 'RTX 4070',
      icon: '🎮',
      type: 'GPU',
      details: `${specs.gpu.temp}°C • ${specs.gpu.memory}GB VRAM`,
      color: '#22c55e'
    },
    {
      name: '32GB DDR4',
      icon: '💾',
      type: 'RAM',
      details: `${specs.ram.used}GB/${specs.ram.total}GB • ${specs.ram.speed}MHz`,
      color: '#3b82f6'
    },
    {
      name: 'NVMe SSD',
      icon: '💿',
      type: 'Storage',
      details: `${specs.storage.read}MB/s Read • ${specs.storage.usage}% Full`,
      color: '#f59e0b'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecs(prev => ({
        cpu: {
          temp: Math.max(35, Math.min(75, prev.cpu.temp + (Math.random() - 0.5) * 4)),
          usage: Math.max(15, Math.min(85, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          boost: Math.random() > 0.7
        },
        gpu: {
          temp: Math.max(40, Math.min(80, prev.gpu.temp + (Math.random() - 0.5) * 3)),
          usage: Math.max(10, Math.min(95, prev.gpu.usage + (Math.random() - 0.5) * 15)),
          memory: Math.max(2, Math.min(8, prev.gpu.memory + (Math.random() - 0.5) * 0.5))
        },
        ram: {
          ...prev.ram,
          used: Math.max(8, Math.min(28, prev.ram.used + (Math.random() - 0.5) * 2))
        },
        storage: {
          read: Math.max(1800, Math.min(3500, prev.storage.read + (Math.random() - 0.5) * 200)),
          write: Math.max(1200, Math.min(2500, prev.storage.write + (Math.random() - 0.5) * 150)),
          usage: prev.storage.usage
        }
      }));
    }, 2000);

    const componentCycle = setInterval(() => {
      setActiveComponent(prev => (prev + 1) % components.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(componentCycle);
    };
  }, []);

  const getPerformanceColor = (value: number, type: string) => {
    if (type === 'temp') {
      if (value < 50) return styles.tempGood;
      if (value < 70) return styles.tempWarning;
      return styles.tempHot;
    }
    if (type === 'usage') {
      if (value < 50) return styles.usageGood;
      if (value < 80) return styles.usageWarning;
      return styles.usageHigh;
    }
    return styles.normal;
  };

  return (
    <div className={`${styles.hardwareShowcase} ${className || ''}`}>
      <div className={styles.showcaseHeader}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>⚡</span>
          <span>Hardware Specs</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.powerIndicator}>
            <div className={styles.powerDot}></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className={styles.showcaseBody}>
        <div className={styles.componentsGrid}>
          {components.map((component, index) => (
            <div 
              key={index}
              className={`${styles.componentCard} ${
                index === activeComponent ? styles.activeCard : ''
              }`}
              style={{ '--accent-color': component.color } as React.CSSProperties}
            >
              <div className={styles.componentHeader}>
                <span className={styles.componentIcon}>{component.icon}</span>
                <div className={styles.componentInfo}>
                  <div className={styles.componentName}>{component.name}</div>
                  <div className={styles.componentType}>{component.type}</div>
                </div>
              </div>
              <div className={styles.componentDetails}>
                {component.details}
              </div>
              <div className={styles.componentMetrics}>
                {component.type === 'CPU' && (
                  <>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Temp</span>
                      <span className={`${styles.metricValue} ${getPerformanceColor(specs.cpu.temp, 'temp')}`}>
                        {specs.cpu.temp.toFixed(0)}°C
                      </span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Usage</span>
                      <span className={`${styles.metricValue} ${getPerformanceColor(specs.cpu.usage, 'usage')}`}>
                        {specs.cpu.usage.toFixed(0)}%
                      </span>
                    </div>
                  </>
                )}
                {component.type === 'GPU' && (
                  <>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Temp</span>
                      <span className={`${styles.metricValue} ${getPerformanceColor(specs.gpu.temp, 'temp')}`}>
                        {specs.gpu.temp.toFixed(0)}°C
                      </span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>VRAM</span>
                      <span className={styles.metricValue}>
                        {specs.gpu.memory.toFixed(1)}GB
                      </span>
                    </div>
                  </>
                )}
                {component.type === 'RAM' && (
                  <>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Used</span>
                      <span className={styles.metricValue}>
                        {specs.ram.used.toFixed(1)}GB
                      </span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Speed</span>
                      <span className={styles.metricValue}>
                        {specs.ram.speed}MHz
                      </span>
                    </div>
                  </>
                )}
                {component.type === 'Storage' && (
                  <>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Read</span>
                      <span className={styles.metricValue}>
                        {specs.storage.read.toFixed(0)}MB/s
                      </span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Write</span>
                      <span className={styles.metricValue}>
                        {specs.storage.write.toFixed(0)}MB/s
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.systemOverview}>
          <h3 className={styles.sectionTitle}>System Overview</h3>
          <div className={styles.overviewStats}>
            <div className={styles.overviewItem}>
              <span className={styles.overviewLabel}>Performance</span>
              <div className={styles.overviewBar}>
                <div 
                  className={styles.overviewFill}
                  style={{ width: `${85 - (specs.cpu.temp / 2)}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.overviewItem}>
              <span className={styles.overviewLabel}>Temperature</span>
              <div className={styles.overviewBar}>
                <div 
                  className={`${styles.overviewFill} ${styles.tempFill}`}
                  style={{ width: `${(specs.cpu.temp + specs.gpu.temp) / 1.5}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.overviewItem}>
              <span className={styles.overviewLabel}>Memory Usage</span>
              <div className={styles.overviewBar}>
                <div 
                  className={styles.overviewFill}
                  style={{ width: `${(specs.ram.used / specs.ram.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareShowcase;