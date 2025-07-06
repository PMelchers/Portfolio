'use client';

import React, { useState, useEffect } from 'react';
import styles from './network-status.module.css';

interface NetworkStatusProps {
  className?: string;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [connections, setConnections] = useState([
    { id: 1, name: 'GitHub API', status: 'connected', latency: 45 },
    { id: 2, name: 'Database', status: 'connected', latency: 23 },
    { id: 3, name: 'CDN', status: 'connected', latency: 12 },
    { id: 4, name: 'Analytics', status: 'connected', latency: 67 },
    { id: 5, name: 'WebSocket', status: 'connected', latency: 8 }
  ]);

  const [networkActivity, setNetworkActivity] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        latency: Math.max(5, Math.min(200, conn.latency + (Math.random() - 0.5) * 20)),
        status: Math.random() > 0.95 ? 'reconnecting' : 'connected'
      })));

      setNetworkActivity(Math.floor(Math.random() * 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return styles.connected;
      case 'reconnecting': return styles.reconnecting;
      case 'error': return styles.error;
      default: return styles.connected;
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 30) return styles.good;
    if (latency < 100) return styles.warning;
    return styles.critical;
  };

  return (
    <div className={`${styles.networkStatus} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>🌐</span>
          <span>Network Status</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.networkActivity}>
            <div className={styles.activityBar}>
              <div 
                className={styles.activityFill}
                style={{ width: `${networkActivity}%` }}
              ></div>
            </div>
            <span className={styles.activityText}>{networkActivity}%</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.connectionsList}>
          {connections.map((conn) => (
            <div key={conn.id} className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <div className={`${styles.statusDot} ${getStatusColor(conn.status)}`}></div>
                <span className={styles.connectionName}>{conn.name}</span>
              </div>
              <div className={styles.connectionMetrics}>
                <span className={`${styles.latency} ${getLatencyColor(conn.latency)}`}>
                  {conn.latency}ms
                </span>
                <span className={styles.status}>{conn.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.networkGraph}>
          <div className={styles.graphTitle}>Network Activity</div>
          <div className={styles.graphContainer}>
            {Array.from({ length: 20 }).map((_, index) => (
              <div 
                key={index}
                className={styles.graphBar}
                style={{
                  height: `${50 + (index * 3) % 50}%`,
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

export default NetworkStatus;