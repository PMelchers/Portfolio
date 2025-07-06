"use client"

import React, { useEffect, useState } from 'react'
import styles from './loading-animation.module.css'

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.logo}>
          <span className={styles.logoText}>PM</span>
        </div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
        <p className={styles.loadingText}>Loading Portfolio...</p>
      </div>
    </div>
  )
}