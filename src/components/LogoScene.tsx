"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

function Logo() {
  const { scene } = useGLTF("/media/3d/logo3d.glb")
  const ref = useRef<THREE.Group>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize to -1..1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    // Smooth lerp toward cursor
    smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.05
    smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.05

    // Tilt toward cursor (subtle)
    ref.current.rotation.y = smoothMouse.current.x * 0.4
    ref.current.rotation.x = -smoothMouse.current.y * 0.3

    // Gentle float
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.06
  })

  return <primitive ref={ref} object={scene} scale={0.3542} />
}

export default function LogoScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop="always"
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[0, 1, 5]} intensity={1.2} />
      <directionalLight position={[0, -1, 4]} intensity={0.5} />
      <Logo />
    </Canvas>
  )
}
