"use client";

import React from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contactContent}>
        <div className={styles.header}>
          <h1>Get In Touch</h1>
          <p>
            Have a project in mind? Feel free to reach out through my contact
            information below.
          </p>
        </div>

        {/* Contact Information */}
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <p>pimmelchers1@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+31 6 517 374 26</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>Location</h3>
                <p>Huissen, The Netherlands</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Status */}
        <div className={styles.contactStatus}>
          <h2>Contact Status</h2>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <div className={styles.statusIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className={styles.statusInfo}>
                <h3>Email</h3>
                <p>pimmelchers1@gmail.com</p>
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  Online - Usually responds within 2 hours
                </div>
              </div>
            </div>

            <div className={styles.statusItem}>
              <div className={styles.statusIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={styles.statusInfo}>
                <h3>Phone</h3>
                <p>+31 6 517 374 26</p>
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  Available - Best to call during business hours
                </div>
              </div>
            </div>

            <div className={styles.statusItem}>
              <div className={styles.statusIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className={styles.statusInfo}>
                <h3>LinkedIn</h3>
                <p>linkedin.com/in/pim-melchers</p>
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  Online - Messages checked daily
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className={styles.availability}>
          <h2>Availability</h2>
          <p>
            I'm currently looking for an internship. My typical response time is
            within 24 hours.
          </p>
          <div className={styles.availableHours}>
            <h3>Available Hours</h3>
            <p>Monday - Friday: 8:00 AM - 5:00 PM CET</p>
          </div>
        </div>
      </div>
    </div>
  );
}