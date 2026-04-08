"use client";

import { useState, useRef } from "react";

export default function SplashScreen() {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setFadingOut(true);
    setTimeout(() => setHidden(true), 600);
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
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        controlsList="noplaybackrate"
        onEnded={handleEnded}
        className="h-full w-full object-cover"
      >
        <source src="/media/loadup.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
