"use client"

import dynamic from "next/dynamic"

const LogoScene = dynamic(() => import("./LogoScene"), { ssr: false })

export default function LogoBackground() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      top: "7rem",
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.08,
    }}>
      <LogoScene />
    </div>
  )
}
