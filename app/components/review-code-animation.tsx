'use client';

import React, { useState, useEffect } from 'react';
import styles from './review-code-animation.module.css';

const ReviewCodeAnimation: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeContent = [
    '// Review System Implementation',
    'class ReviewManager {',
    '  constructor() {',
    '    this.reviews = [];',
    '    this.averageRating = 0;',
    '  }',
    '',
    '  addReview(review) {',
    '    // Validate review data',
    '    if (!this.isValidReview(review)) {',
    '      throw new Error("Invalid review format");',
    '    }',
    '',
    '    // Add timestamp',
    '    review.timestamp = new Date().toISOString();',
    '    review.id = this.generateUniqueId();',
    '',
    '    // Store review',
    '    this.reviews.push(review);',
    '    this.updateAverageRating();',
    '',
    '    console.log(`✅ Review added: ${review.rating}⭐`);',
    '    return review;',
    '  }',
    '',
    '  isValidReview(review) {',
    '    return review.name && ',
    '           review.rating >= 1 && ',
    '           review.rating <= 5 &&',
    '           review.comment;',
    '  }',
    '',
    '  updateAverageRating() {',
    '    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);',
    '    this.averageRating = (total / this.reviews.length).toFixed(1);',
    '  }',
    '',
    '  getTopReviews(limit = 5) {',
    '    return this.reviews',
    '      .filter(r => r.rating >= 4)',
    '      .sort((a, b) => b.rating - a.rating)',
    '      .slice(0, limit);',
    '  }',
    '}',
    '',
    '// Usage Example',
    'const reviewSystem = new ReviewManager();',
    '',
    'reviewSystem.addReview({',
    '  name: "pukas06",',
    '  company: "Snowville",',
    '  rating: 4,',
    '  comment: "Great Minecraft plugin development!"',
    '});',
    '',
    'console.log(`Average rating: ${reviewSystem.averageRating}⭐`);',
    '// Output: Average rating: 4.0⭐'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeContent.length - 1) {
          return prev + 1;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentLine(0);
            setIsTyping(true);
          }, 3000);
          return prev;
        }
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom when new line is added
  useEffect(() => {
    const codeBody = document.querySelector(`.${styles.codeBody}`);
    if (codeBody) {
      codeBody.scrollTop = codeBody.scrollHeight;
    }
  }, [currentLine]);

  const formatLine = (line: string) => {
    // Simple syntax highlighting
    if (line.trim().startsWith('//')) {
      return <span className={styles.comment}>{line}</span>;
    }
    
    if (line.includes('class ') || line.includes('function ') || line.includes('const ') || line.includes('let ')) {
      return <span className={styles.keyword}>{line}</span>;
    }
    
    if (line.includes('console.log')) {
      return <span className={styles.console}>{line}</span>;
    }
    
    if (line.includes('✅') || line.includes('⭐')) {
      return <span className={styles.emoji}>{line}</span>;
    }
    
    return <span>{line}</span>;
  };

  return (
    <div className={styles.codeWindow}>
      <div className={styles.codeHeader}>
        <div className={styles.codeButtons}>
          <div className={`${styles.codeButton} ${styles.close}`}></div>
          <div className={`${styles.codeButton} ${styles.minimize}`}></div>
          <div className={`${styles.codeButton} ${styles.maximize}`}></div>
        </div>
        <div className={styles.codeTitle}>review-system.js — VS Code</div>
      </div>
      <div className={styles.codeBody}>
        <div className={styles.codeContent}>
          {codeContent.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className={styles.codeLine}>
              <span className={styles.lineNumber}>{(index + 1).toString().padStart(2, ' ')}</span>
              <span className={styles.lineContent}>
                {formatLine(line)}
                {index === currentLine && isTyping && (
                  <span className={styles.cursor}>|</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCodeAnimation;