"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import styles from "./reviews.module.css"

// Initial reviews data
const initialReviews = [
  {
    id: 1,
    name: "pukas06",
    company: "Snowville",
    project: "Wand Plugin Minecraft",
    rating: 4,
    review:
      "The wand plugin works great. Its highly configurable and easy to use. the players love it! I would recommend Pim for any Minecraft plugin development.",
    date: "2025-03-20",
  },
  /*{
    id: 2,
    name: "Michael Chen",
    company: "ConnectSocial",
    project: "Social Media Platform",
    rating: 5,
    review:
      "Pim's work on our social platform exceeded our expectations. The UI is beautiful and the features work flawlessly. Communication was clear throughout the project.",
    date: "2025-01-10",
  },*/
]

// Review form interface
interface ReviewForm {
  name: string
  company: string
  project: string
  rating: number
  review: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [formData, setFormData] = useState<ReviewForm>({
    name: "",
    company: "",
    project: "",
    rating: 5,
    review: "",
  })
  const [errors, setErrors] = useState<Partial<ReviewForm>>({})
  

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty}>
        {index < rating ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ) : (
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </span>
    ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Reviews</h1>
        <p className={styles.subtitle}>
          See what others are saying about working with me.
        </p>
      </div>

        {/* Reviews List */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Client Testimonials</h2>
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <h3 className={styles.reviewerName}>{review.name}</h3>
                    <p className={styles.reviewerCompany}>{review.company}</p>
                  </div>
                  <div className={styles.reviewRating}>{renderStars(review.rating)}</div>
                </div>
                <p className={styles.projectName}>Project: {review.project}</p>
                <p className={styles.reviewText}>{review.review}</p>
                <p className={styles.reviewDate}>{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
