"use client"

import React, { useEffect, useState } from 'react'
import styles from './animated-background.module.css'

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.gridContainer}>
        {/* Reduced number of dots for better performance */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className={styles.gridDot}
            style={{
              '--delay': `${i * 0.2}s`,
              '--duration': `${3 + (i % 3)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Floating particles - reduced count */}
      <div className={styles.floatingElements}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={styles.floatingElement}
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${5 + (i % 2)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}