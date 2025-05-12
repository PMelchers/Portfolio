"use client";

import { useRef, useEffect } from "react";
import styles from "./video-player.module.css";

interface VideoPlayerProps {
  videoUrl: string;
  autoplay?: boolean;
}

export function VideoPlayer({ videoUrl, autoplay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        controls
        autoPlay={autoplay}
        muted
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}