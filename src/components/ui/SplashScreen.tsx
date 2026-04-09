"use client";

import { useState, useRef, useEffect } from "react";
import { useSplash } from "./SplashContext";

export default function SplashScreen() {
  const [videoReady, setVideoReady] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { onSplashDone } = useSplash();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      video.play();
    };

    // If already buffered (e.g. cached), start immediately
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener("canplaythrough", handleCanPlay, { once: true });
    }

    // Fallback: skip splash after 4s if video never loads
    const timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setHidden(true);
        onSplashDone();
      }, 600);
    }, 4000);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      clearTimeout(timeout);
    };
  }, [onSplashDone]);

  const handleEnded = () => {
    setFadingOut(true);
    setTimeout(() => {
      setHidden(true);
      onSplashDone();
    }, 600);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark transition-opacity duration-600 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="noplaybackrate"
        onEnded={handleEnded}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/media/loadup.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
