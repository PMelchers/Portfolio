"use client"

import React, { useEffect, useRef, useState } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp'
  delay?: number
  threshold?: number
  className?: string
}

export default function ScrollAnimation({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  threshold = 0.1,
  className = '' 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const animationStyles = {
    fadeInUp: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    fadeInLeft: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    fadeInRight: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    scaleIn: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
    },
    slideInUp: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
    }
  }

  return (
    <div ref={ref} style={animationStyles[animation]} className={className}>
      {children}
    </div>
  )
}