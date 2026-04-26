"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const POINTS = 6000;
const FIELD_W = 20;
const FIELD_H = 12;
const FIELD_D = 8;
const CUBE_HALF = 2.08;
const FOG_COLOR = 0x2d3a4a;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uCubeAmount;
  uniform vec2  uRotation;

  attribute vec3 velocity;
  attribute float size;
  attribute float phase;
  attribute vec3 cubeTarget;

  varying float vAlpha;
  varying float vHover;

  mat3 rotY(float a){
    float c = cos(a), s = sin(a);
    return mat3(c, 0.0, s,  0.0, 1.0, 0.0,  -s, 0.0, c);
  }
  mat3 rotX(float a){
    float c = cos(a), s = sin(a);
    return mat3(1.0, 0.0, 0.0,  0.0, c, -s,  0.0, s, c);
  }

  void main(){
    /* Scattered drift behavior */
    vec3 drift = position;
    drift.x += sin(uTime * 0.15 + phase * 6.28) * 0.3;
    drift.y += sin(uTime * 0.1  + phase * 4.0) * 0.4 + uTime * velocity.y * 0.02;
    drift.z += cos(uTime * 0.12 + phase * 5.0) * 0.2;
    drift.y = mod(drift.y + 6.0, 12.0) - 6.0;

    /* Cube target rotated by cursor-driven yaw/pitch */
    vec3 cubePos = rotX(uRotation.x) * (rotY(uRotation.y) * cubeTarget);

    /* Morph between scatter and cube */
    vec3 pos = mix(drift, cubePos, uCubeAmount);

    /* Mouse attract (only while scattered) */
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip  = projectionMatrix * mvPos;
    vec2 screen = clip.xy / clip.w;
    vec2 toMouse = uMouse - screen;
    float dist = length(toMouse);
    float attract = smoothstep(0.6, 0.0, dist) * (1.0 - uCubeAmount);

    pos.x += toMouse.x * attract * 0.4;
    pos.y += toMouse.y * attract * 0.4;

    vHover = attract;

    mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    float baseSize = size + vHover * 0.04;
    baseSize *= mix(1.0, 1.35, uCubeAmount);
    gl_PointSize = baseSize * (400.0 / -mvPos.z);

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

type Props = {
  progress?: MotionValue<number>;
};

export default function AdvisoryParticles({ progress }: Props) {
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
    const cubeTargets = new Float32Array(POINTS * 3);

    for (let i = 0; i < POINTS; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_D;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.03 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      sizes[i] = Math.random() * 0.04 + 0.03;
      phases[i] = Math.random();

      /* Cube-surface target: pick a face, then a random uv on that face */
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * 2 * CUBE_HALF;
      const v = (Math.random() - 0.5) * 2 * CUBE_HALF;
      let cx = 0, cy = 0, cz = 0;
      if (face === 0) { cx = CUBE_HALF; cy = u; cz = v; }
      else if (face === 1) { cx = -CUBE_HALF; cy = u; cz = v; }
      else if (face === 2) { cy = CUBE_HALF; cx = u; cz = v; }
      else if (face === 3) { cy = -CUBE_HALF; cx = u; cz = v; }
      else if (face === 4) { cz = CUBE_HALF; cx = u; cy = v; }
      else { cz = -CUBE_HALF; cx = u; cy = v; }
      cubeTargets[i * 3] = cx;
      cubeTargets[i * 3 + 1] = cy;
      cubeTargets[i * 3 + 2] = cz;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("cubeTarget", new THREE.BufferAttribute(cubeTargets, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(10, 10) },
      uCubeAmount: { value: 0 },
      uRotation: { value: new THREE.Vector2(0, 0) },
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
    let cubeAmount = 0;
    let yaw = 0;
    let pitch = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - prev) / 1000;
      prev = now;

      uniforms.uTime.value += dt;

      smooth.x += (mouse.x - smooth.x) * Math.min(dt * 2, 1);
      smooth.y += (mouse.y - smooth.y) * Math.min(dt * 2, 1);
      uniforms.uMouse.value.set(smooth.x, smooth.y);

      /* Cube formation: starts when "isn't" hits full opacity (~0.41)
         and completes when "It's" hits full opacity (~0.63). */
      const p = progress ? progress.get() : 0;
      const target = THREE.MathUtils.smoothstep(p, 0.41, 0.63);
      cubeAmount += (target - cubeAmount) * Math.min(dt * 4, 1);
      uniforms.uCubeAmount.value = cubeAmount;

      /* Rotate cube based on cursor (in normalized [-1,1] coords). When
         cursor is offscreen (initial 10,10), settle to a gentle idle tilt. */
      const cursorActive = Math.abs(mouse.x) <= 1 && Math.abs(mouse.y) <= 1;
      const idleYaw = Math.sin(uniforms.uTime.value * 0.3) * 0.25;
      const idlePitch = Math.sin(uniforms.uTime.value * 0.22) * 0.15;
      const targetYaw = cursorActive ? mouse.x * Math.PI * 0.45 : idleYaw;
      const targetPitch = cursorActive ? -mouse.y * Math.PI * 0.3 : idlePitch;
      yaw += (targetYaw - yaw) * Math.min(dt * 3, 1);
      pitch += (targetPitch - pitch) * Math.min(dt * 3, 1);
      uniforms.uRotation.value.set(pitch, yaw);

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
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
