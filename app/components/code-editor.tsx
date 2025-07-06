'use client';

import React, { useState, useEffect } from 'react';
import styles from './code-editor.module.css';

interface CodeEditorProps {
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ className }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeLines = [
    "// Welcome to my development environment",
    "import React from 'react';",
    "import { NextPage } from 'next';",
    "",
    "interface Developer {",
    "  name: string;",
    "  skills: string[];",
    "  passion: 'coding' | 'learning' | 'building';",
    "}",

    "const PimMelchers: Developer = {",
    "  name: 'Pim Melchers',",
    "  skills: ['React', 'TypeScript', 'Next.js'],",
    "  passion: 'building',",
    "};",
    "",
    "export default function Portfolio() {",
    "  return (",
    "    <div className='awesome-portfolio'>",
    "      <h1>Creating digital experiences</h1>",
    "      <p>One component at a time ✨</p>",
    "    </div>",
    "  );",
    "}",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeLines.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => {
            setCurrentLine(0);
          }, 2000);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const getLineType = (line: string) => {
    if (line.startsWith('//')) return 'comment';
    if (line.startsWith('import') || line.startsWith('export')) return 'import';
    if (line.includes('interface') || line.includes('const') || line.includes('function')) return 'keyword';
    if (line.includes('string') || line.includes('number') || line.includes('boolean')) return 'type';
    return 'normal';
  };

  return (
    <div className={`${styles.codeEditor} ${className || ''}`}>
      <div className={styles.editorHeader}>
        <div className={styles.editorTabs}>
          <div className={`${styles.tab} ${styles.active}`}>
            <span className={styles.tabIcon}>⚛️</span>
            <span>Portfolio.tsx</span>
          </div>
          <div className={styles.tab}>
            <span className={styles.tabIcon}>🎨</span>
            <span>styles.css</span>
          </div>
        </div>
        <div className={styles.editorActions}>
          <div className={styles.actionButton}>
            <span className={styles.actionIcon}>💾</span>
          </div>
          <div className={styles.actionButton}>
            <span className={styles.actionIcon}>🔄</span>
          </div>
        </div>
      </div>

      <div className={styles.editorBody}>
        <div className={styles.lineNumbers}>
          {codeLines.slice(0, currentLine + 1).map((_, index) => (
            <div key={index} className={styles.lineNumber}>
              {index + 1}
            </div>
          ))}
        </div>

        <div className={styles.codeContent}>
          {codeLines.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className={`${styles.codeLine} ${styles[getLineType(line)]}`}>
              {line}
              {index === currentLine && (
                <span className={styles.cursor}>|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;