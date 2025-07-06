'use client';

import React, { useState, useEffect } from 'react';
import styles from './code-block.module.css';

interface CodeBlockProps {
  language?: string;
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  language = 'javascript', 
  children, 
  animated = false, 
  className 
}) => {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <div className={`${styles.codeBlock} ${className || ''}`}>
      <div className={styles.codeHeader}>
        <div className={styles.codeButtons}>
          <div className={styles.codeButton}></div>
          <div className={styles.codeButton}></div>
          <div className={styles.codeButton}></div>
        </div>
        <div className={styles.codeLanguage}>{language}</div>
      </div>
      <div className={styles.codeBody}>
        <pre className={`${styles.codeContent} ${isVisible ? styles.visible : ''}`}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;