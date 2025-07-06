'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './page-transition.module.css'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div className={`${styles.pageWrapper} ${isLoading ? styles.loading : ''}`}>
        {children}
      </div>
    </>
  )
}