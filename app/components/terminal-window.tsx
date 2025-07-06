'use client';

import React, { useState, useEffect } from 'react';
import styles from './terminal-window.module.css';

interface TerminalWindowProps {
  className?: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ className }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const terminalContent = [
    '$ cd ~/pim-melchers/portfolio',
    '$ ls -la',
    'total 6',
    'drwxr-xr-x  crypto-dashboard/',
    'drwxr-xr-x  minecraft-plugins/',
    'drwxr-xr-x  social-platform/',
    'drwxr-xr-x  kingdom-dashboard/',
    'drwxr-xr-x  discord-bot/',
    'drwxr-xr-x  taskio-app/',
    '$ git log --oneline',
    'a3c4d8f Added crypto dashboard with real-time data',
    'b7e2f91 Built Minecraft wand plugin system',
    'c9a1b45 Created social media platform',
    '$ npm run build',
    '> portfolio@1.0.0 build',
    '> next build',
    '',
    '✓ Creating optimized production build',
    '✓ Compiled successfully',
    '$ echo "Welcome to my Portfolio!" | figlet',
    '██     ██ ███████ ██       ██████  ██████  ███    ███ ███████ ',
    '██     ██ ██      ██      ██      ██    ██ ████  ████ ██      ',
    '██  █  ██ █████   ██      ██      ██    ██ ██ ████ ██ █████   ',
    '██ ███ ██ ██      ██      ██      ██    ██ ██  ██  ██ ██      ',
    ' ███ ███  ███████ ███████  ██████  ██████  ██      ██ ███████ ',
    '$ _'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < terminalContent.length - 1) {
          return prev + 1;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentLine(0);
            setIsTyping(true);
          }, 2000); // Wait 2 seconds before restarting
          return prev;
        }
      });
    }, 300); // Set interval to 300ms as requested

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom when new line is added
  useEffect(() => {
    const terminalBody = document.querySelector(`.${styles.terminalBody}`);
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }, [currentLine]);

  return (
    <div className={`${styles.terminalWindow} ${className || ''}`}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <div className={`${styles.terminalButton} ${styles.close}`}></div>
          <div className={`${styles.terminalButton} ${styles.minimize}`}></div>
          <div className={`${styles.terminalButton} ${styles.maximize}`}></div>
        </div>
        <div className={styles.terminalTitle}>terminal — pim@localhost</div>
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.terminalContent}>
          {terminalContent.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className={styles.terminalLine}>
              {line}
              {index === currentLine && isTyping && (
                <span className={styles.cursor}>|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;