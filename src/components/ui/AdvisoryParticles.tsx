"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const POINTS = 6000;
const FIELD_W = 20;
const FIELD_H = 12;
const FIELD_D = 8;
const FOG_COLOR = 0x2d3a4a;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;

  attribute vec3 velocity;
  attribute float size;
  attribute float phase;

  varying float vAlpha;
  varying float vHover;

  void main(){
    vec3 pos = position;

    /* Gentle drift animation — each particle has its own phase */
    pos.x += sin(uTime * 0.15 + phase * 6.28) * 0.3;
    pos.y += sin(uTime * 0.1  + phase * 4.0) * 0.4 + uTime * velocity.y * 0.02;
    pos.z += cos(uTime * 0.12 + phase * 5.0) * 0.2;

    /* Wrap particles that drift too far vertically */
    pos.y = mod(pos.y + 6.0, 12.0) - 6.0;

    /* Mouse attract — pull particles gently toward cursor */
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip  = projectionMatrix * mvPos;
    vec2 screen = clip.xy / clip.w;
    vec2 toMouse = uMouse - screen;
    float dist = length(toMouse);
    float attract = smoothstep(0.6, 0.0, dist);

    /* Gravitational pull in world space */
    pos.x += toMouse.x * attract * 0.4;
    pos.y += toMouse.y * attract * 0.4;

    vHover = attract;

    /* Recalculate after displacement */
    mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    /* Size with attenuation + hover boost */
    float baseSize = size;
    baseSize += vHover * 0.04;
    gl_PointSize = baseSize * (400.0 / -mvPos.z);

    /* Depth-based alpha */
    float depth = clamp((-mvPos.z - 2.0) / 12.0, 0.0, 1.0);
    vAlpha = mix(0.8, 0.15, depth);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vHover;

  void main(){
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;

    /* Pale aqua #AFDEDA palette with hover brightening */
    vec3 baseCol  = vec3(0.686, 0.871, 0.855);
    vec3 brightCol = vec3(0.85, 0.95, 0.93);
    vec3 col = mix(baseCol, brightCol, vHover * 0.7);
    alpha = mix(alpha, min(alpha * 2.0, 1.0), vHover * 0.3);

    gl_FragColor = vec4(col, alpha * 0.7);
  }
`;

export default function AdvisoryParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(FOG_COLOR, 4, 16);
    const camera = new THREE.PerspectiveCamera(
      65,
      el.clientWidth / el.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    /* Geometry */
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(POINTS * 3);
    const velocities = new Float32Array(POINTS * 3);
    const sizes = new Float32Array(POINTS);
    const phases = new Float32Array(POINTS);

    for (let i = 0; i < POINTS; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_D;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.03 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      sizes[i] = Math.random() * 0.04 + 0.03;
      phases[i] = Math.random();
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(10, 10) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    /* Mouse */
    const mouse = { x: 10, y: 10 };
    const smooth = { x: 10, y: 10 };
    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    /* Resize */
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* Animate */
    let raf = 0;
    let prev = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - prev) / 1000;
      prev = now;

      uniforms.uTime.value += dt;

      /* Smooth mouse with slower lerp for dreamy feel */
      smooth.x += (mouse.x - smooth.x) * Math.min(dt * 2, 1);
      smooth.y += (mouse.y - smooth.y) * Math.min(dt * 2, 1);
      uniforms.uMouse.value.set(smooth.x, smooth.y);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
