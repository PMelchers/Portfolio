"use client"

import { useTheme } from "next-themes"
import styles from "./mode-toggle.module.css"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className={styles.dropdown}>
      <button className={styles.trigger} aria-label="Toggle theme">
        <span className={`${styles.sun} ${theme === "dark" ? styles.iconHidden : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </span>
        <span className={`${styles.moon} ${theme === "dark" ? "" : styles.iconHidden}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
      </button>
      <div className={styles.content}>
        <button className={styles.item} onClick={() => setTheme("light")}>
          Light
        </button>
        <button className={styles.item} onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button className={styles.item} onClick={() => setTheme("system")}>
          System
        </button>
      </div>
    </div>
  )
}