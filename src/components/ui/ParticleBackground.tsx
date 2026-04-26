"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Configuration ────────────────────────────────────────── */
const POINTS = 14000;
const SPHERE_RADIUS = 2.6;
const SPHERE_SCALE = 1.6;
const PLANE_W = 18;
const PLANE_D = 10;

/* Light-blue palette on slate — matches Hero bg-dark */
const FOG_COLOR = 0x2d3a4a;

/* ── GLSL helpers ─────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;       // 0 = plane/wave, 1 = sphere
  uniform vec2  uMouse;       // normalised mouse (-1..1)

  attribute vec3 planePos;    // rest position on plane
  attribute float idx;        // normalised 0..1

  varying float vDepth;
  varying float vFresnel;
  varying float vHeight;
  varying float vHover;

  /* ── Simplex 3‑D noise (Ashima) ─────────────────────────── */
  vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+10.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1./6.,1./3.);
    const vec4 D = vec4(0,.5,1,2);
    vec3 i = floor(v+dot(v,C.yyy));
    vec3 x0 = v-i+dot(i,C.xxx);
    vec3 g = step(x0.yzx,x0.xyz);
    vec3 l = 1.-g;
    vec3 i1 = min(g,l.zxy);
    vec3 i2 = max(g,l.zxy);
    vec3 x1 = x0-i1+C.xxx;
    vec3 x2 = x0-i2+C.yyy;
    vec3 x3 = x0-D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z+vec4(0,i1.z,i2.z,1))
      +i.y+vec4(0,i1.y,i2.y,1))
      +i.x+vec4(0,i1.x,i2.x,1));
    float n_ = 0.142857142857;
    vec3 ns = n_*D.wyz - D.xzx;
    vec4 j = p - 49.*floor(p*ns.z*ns.z);
    vec4 x_ = floor(j*ns.z);
    vec4 y_ = floor(j - 7.*x_);
    vec4 x = x_*ns.x + ns.yyyy;
    vec4 y = y_*ns.x + ns.yyyy;
    vec4 h = 1. - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy,y.xy);
    vec4 b1 = vec4(x.zw,y.zw);
    vec4 s0 = floor(b0)*2.+1.;
    vec4 s1 = floor(b1)*2.+1.;
    vec4 sh = -step(h, vec4(0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m = max(.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m = m*m;
    return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  /* ── Fibonacci sphere ───────────────────────────────────── */
  #define PHI (3.14159265 * (3. - sqrt(5.)))
  vec3 fibSphere(float i, float n, float r){
    float y = 1. - (i / (n-1.)) * 2.;
    float rad = sqrt(1. - y*y);
    float theta = PHI * i;
    return vec3(cos(theta)*rad, y, sin(theta)*rad) * r;
  }

  /* ── Wave displacement ──────────────────────────────────── */
  float wave(vec3 p, float t){
    float w = 0.;
    w += sin(p.x*0.8  + t*0.4)*0.25;
    w += sin(p.z*1.1  - t*0.3)*0.18;
    w += sin(p.x*0.4  + p.z*0.6 + t*0.25)*0.3;
    w += snoise(vec3(p.x*0.3, p.z*0.3, t*0.12))*0.5;
    w += sin(p.x*1.5  - t*0.6)*0.08;
    w += sin(p.z*1.8  + t*0.5)*0.07;
    return w;
  }

  void main(){
    /* ── Wave position ── */
    vec3 wPos = planePos;
    wPos.y += wave(planePos, uTime);

    /* ── Sphere position with noise displacement ── */
    float fi = idx * float(${POINTS});
    vec3 sPos = fibSphere(fi, float(${POINTS}), ${SPHERE_RADIUS.toFixed(1)}) * ${SPHERE_SCALE.toFixed(2)};
    /* organic wobble */
    float nAmp = 0.16;
    float nDen = 3.3;
    float disp = snoise(vec3(sPos.x*nDen, sPos.y*nDen, sPos.z*nDen + uTime*0.5)) * nAmp;
    sPos += normalize(sPos) * disp;

    /* rotate sphere toward mouse */
    float rotY = uMouse.x * 0.1;
    float rotX = -uMouse.y * 0.1;
    // Y rotation
    float cy = cos(rotY); float sy = sin(rotY);
    sPos = vec3(cy*sPos.x + sy*sPos.z, sPos.y, -sy*sPos.x + cy*sPos.z);
    // X rotation
    float cx = cos(rotX); float sx = sin(rotX);
    sPos = vec3(sPos.x, cx*sPos.y - sx*sPos.z, sx*sPos.y + cx*sPos.z);

    /* ── Staggered morph ── */
    float m = uMorph;
    float stagger = smoothstep(0.5*idx, 0.5 + 0.5*idx, m);
    vec3 pos = mix(wPos, sPos, stagger);

    /* ── Mouse hover: repel + brighten nearby particles ── */
    vec4 posClip = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 screenMouse = uMouse;
    vec2 screenPos = posClip.xy / posClip.w;
    float mouseDist = length(screenPos - screenMouse);
    float hoverRadius = 0.35;
    float hover = smoothstep(hoverRadius, 0.0, mouseDist);
    /* push particles away from cursor */
    vec2 pushDir = normalize(screenPos - screenMouse + 0.001);
    pos.x += pushDir.x * hover * 0.15;
    pos.y += pushDir.y * hover * 0.15;
    vHover = hover;

    vHeight = pos.y;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    /* point size with attenuation */
    float baseSize = mix(0.07, 0.065, stagger);
    baseSize += vHover * 0.04;
    gl_PointSize = baseSize * (450.0 / -mvPos.z);

    /* varyings for fragment */
    vDepth = clamp((-mvPos.z - 3.0) / 9.0, 0.0, 1.0);
    vec3 viewDir = normalize(-mvPos.xyz);
    vec3 norm = normalize(pos);
    vFresnel = stagger * pow(1.0 - max(dot(viewDir, norm), 0.0), 2.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uMorph;
  varying float vDepth;
  varying float vFresnel;
  varying float vHeight;
  varying float vHover;

  void main(){
    /* circular soft particle */
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d);

    /* higher particles = more opaque, lower = fade out */
    float heightBoost = smoothstep(-2.0, 4.0, vHeight);
    alpha *= mix(0.3, 1.0, heightBoost);

    /* Pale aqua #AFDEDA palette */
    vec3 waveCol    = vec3(0.55, 0.75, 0.72);    // muted aqua
    vec3 sphereCol1 = vec3(0.34, 0.52, 0.50);    // deep aqua
    vec3 sphereCol2 = vec3(0.686, 0.871, 0.855); // #AFDEDA
    vec3 fresnelCol = vec3(0.82, 0.94, 0.92);    // icy aqua edge

    vec3 sphereCol = mix(sphereCol2, sphereCol1, vDepth);
    vec3 col = mix(waveCol, sphereCol, smoothstep(0.0, 0.6, uMorph));
    col = mix(col, fresnelCol, vFresnel * 0.7);

    /* hover: brighten particles near cursor */
    col = mix(col, vec3(0.92, 0.98, 0.96), vHover * 0.5);
    alpha = mix(alpha, 1.0, vHover * 0.4);

    gl_FragColor = vec4(col, alpha * 0.96);
  }
`;

/* ── React component ──────────────────────────────────────── */
export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    /* scene / camera */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(FOG_COLOR, 5, 18);
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5.0);

    /* ── Build geometry ────────────────────────────────────── */
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(POINTS * 3);
    const planePositions = new Float32Array(POINTS * 3);
    const indices = new Float32Array(POINTS);

    /* Generate plane grid positions */
    const planeGeo = new THREE.PlaneGeometry(PLANE_W, PLANE_D, Math.ceil(Math.sqrt(POINTS)), Math.ceil(Math.sqrt(POINTS)));
    const planeVerts = planeGeo.attributes.position.array as Float32Array;
    /* Rotate plane similar to reference: tilted toward camera */
    const rotMat = new THREE.Matrix4().makeRotationX(-Math.PI * 0.55);
    const translateMat = new THREE.Matrix4().makeTranslation(0, 3.0, 0);
    const combinedMat = new THREE.Matrix4().multiplyMatrices(translateMat, rotMat);

    for (let i = 0; i < POINTS; i++) {
      const pi = (i % (planeVerts.length / 3)) * 3;
      const v = new THREE.Vector3(
        planeVerts[pi] ?? (Math.random() - 0.5) * PLANE_W,
        planeVerts[pi + 1] ?? (Math.random() - 0.5) * PLANE_D,
        planeVerts[pi + 2] ?? 0
      );
      v.applyMatrix4(combinedMat);
      planePositions[i * 3] = v.x;
      planePositions[i * 3 + 1] = v.y;
      planePositions[i * 3 + 2] = v.z;

      /* start positions at plane */
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }

    /* Fisher-Yates shuffle indices for staggered morph */
    const idxArr = Array.from({ length: POINTS }, (_, i) => i / POINTS);
    for (let i = POINTS - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxArr[i], idxArr[j]] = [idxArr[j], idxArr[i]];
    }
    for (let i = 0; i < POINTS; i++) indices[i] = idxArr[i];

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("planePos", new THREE.BufferAttribute(planePositions, 3));
    geo.setAttribute("idx", new THREE.BufferAttribute(indices, 1));

    planeGeo.dispose();

    /* ── Shader material ───────────────────────────────────── */
    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
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

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Mouse tracking ────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const mouseSmooth = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Scroll → morph ────────────────────────────────────── */
    let morphTarget = 0;
    const onScroll = () => {
      /* morph starts after 75px, completes by ~675px */
      const t = Math.max(0, Math.min(1, (window.scrollY - 75) / 600));
      morphTarget = t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ── Resize ────────────────────────────────────────────── */
    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ────────────────────────────────────── */
    let raf = 0;
    let prevTime = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - prevTime) / 1000;
      prevTime = now;

      uniforms.uTime.value += delta;

      /* smooth morph */
      uniforms.uMorph.value += (morphTarget - uniforms.uMorph.value) * Math.min(delta * 3, 1);

      /* smooth mouse */
      const maxD = 10 * delta;
      const dx = mouse.x - mouseSmooth.x;
      const dy = mouse.y - mouseSmooth.y;
      mouseSmooth.x += Math.max(-maxD, Math.min(maxD, dx));
      mouseSmooth.y += Math.max(-maxD, Math.min(maxD, dy));
      uniforms.uMouse.value.set(mouseSmooth.x, mouseSmooth.y);

      renderer.render(scene, camera);
    };
    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };

    return () => cleanupRef.current?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
