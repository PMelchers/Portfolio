"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import styles from "./navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/upcoming-projects", label: "Upcoming" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Pim Melchers
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`${styles.navLink} ${pathname === route.href ? styles.activeLink : ""}`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className={styles.mobileNavToggle}>
          <button className={styles.menuButton} aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileMenuNav}>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`${styles.mobileNavLink} ${pathname === route.href ? styles.activeLink : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
