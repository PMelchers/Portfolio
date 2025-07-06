import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AnimatedBackground from "./components/animated-background";
import LoadingAnimation from "./components/loading-animation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pim Melchers | Portfolio",
  description: "Personal portfolio of Pim Melchers, showcasing projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Loading Animation */}
        <LoadingAnimation />
        
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Simple Particle Background */}
        <div className="particle-container">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="particle"
              style={{
                top: `${(index * 17) % 100}vh`,
                left: `${(index * 23) % 100}vw`,
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${5 + (index % 3)}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="layout-container">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}