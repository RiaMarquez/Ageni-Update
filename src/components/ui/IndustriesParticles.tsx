"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 2D canvas spiral-galaxy backdrop. Particles sit on a few
 * logarithmic spiral arms radiating from a focal point; each rotates at a
 * slow constant angular velocity, giving a calm differential-rotation feel.
 * Density is biased toward the center via a power-law radius distribution.
 *
 * Cheap (no shaders, no deps), pauses when the section scrolls offscreen.
 *
 * `color`: "r, g, b" string. Per-particle alpha mixes in.
 */

const PARTICLE_COUNT = 1400;
const ARMS = 2;
const ARM_TIGHTNESS = 1.5; // higher = tighter spiral wind
const ARM_FUZZ = 0.35;     // angular jitter inside an arm (radians)
const REPEL_RADIUS = 220;  // px — particles within this range get pushed
const REPEL_STRENGTH = 80; // px — max displacement at the cursor itself
const MOUSE_LERP = 0.18;   // smoothing factor for cursor tracking

type Particle = {
  baseAngle: number;
  radius: number;
  speed: number;   // angular velocity, rad/ms
  size: number;
  alpha: number;
};

export default function IndustriesParticles({
  color = "45, 58, 74",
  count = PARTICLE_COUNT,
}: {
  color?: string;
  count?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    /* Galaxy center, in pixels. Recomputed on resize. */
    let cx = 0;
    let cy = 0;
    let maxRadius = 0;
    const particles: Particle[] = [];

    /* Cursor tracking — raw target + smoothed render position. -1e6 means
       off-canvas (no repulsion applied). */
    const mouse = { x: -1e6, y: -1e6 };
    const mouseSmooth = { x: -1e6, y: -1e6 };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Center sits slightly above middle, offset horizontally toward the
         right so the visible spiral fans into the empty area behind the
         left column / centred text. */
      cx = width * 0.55;
      cy = height * 0.45;
      /* Spiral spreads up to ~80% of the diagonal so it overflows the edges
         a little — the wrapping container clips it. */
      maxRadius = Math.hypot(width, height) * 0.8;
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        /* Power-law radius bias: dense near center, sparse near edges */
        const t = Math.random();
        const r = Math.pow(t, 0.55) * maxRadius;

        /* Pick an arm, then offset along the logarithmic spiral, then add
           a small angular jitter so arms have soft thickness rather than
           being a thin curve. */
        const arm = Math.floor(Math.random() * ARMS);
        const armBase = (arm / ARMS) * Math.PI * 2;
        const spiral = ARM_TIGHTNESS * Math.log(1 + r * 0.012);
        const fuzz = (Math.random() - 0.5) * ARM_FUZZ;
        const baseAngle = armBase + spiral + fuzz;

        /* Inner particles rotate slightly faster (differential rotation),
           giving the galaxy a natural "winding up" feel over time. */
        const innerBoost = 1 - Math.min(1, r / maxRadius) * 0.4;
        const speed = (0.00003 + Math.random() * 0.00004) * innerBoost;

        const small = Math.random() < 0.72;
        particles.push({
          baseAngle,
          radius: r,
          speed,
          size: small ? 1 : 1.2 + Math.random() * 1.4,
          alpha: 0.14 + Math.random() * 0.42,
        });
      }
    };

    let running = false;
    let raf = 0;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const now = performance.now();

      /* Smooth the cursor toward its target so abrupt mouse moves don't
         snap the field. When off-canvas (-1e6) the smoothed value chases
         it out of bounds too, ending repulsion gracefully. */
      mouseSmooth.x += (mouse.x - mouseSmooth.x) * MOUSE_LERP;
      mouseSmooth.y += (mouse.y - mouseSmooth.y) * MOUSE_LERP;

      ctx.clearRect(0, 0, width, height);

      const radiusSq = REPEL_RADIUS * REPEL_RADIUS;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const θ = p.baseAngle + p.speed * now;
        let x = cx + Math.cos(θ) * p.radius;
        let y = cy + Math.sin(θ) * p.radius;

        /* Cursor repulsion: smoothstep falloff, push along the vector
           from the cursor to the particle. */
        const dx = x - mouseSmooth.x;
        const dy = y - mouseSmooth.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / REPEL_RADIUS;
          const force = t * t; // soft falloff
          const inv = 1 / dist;
          x += dx * inv * force * REPEL_STRENGTH;
          y += dy * inv * force * REPEL_STRENGTH;
        }

        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    seedParticles();

    const onResize = () => {
      resize();
      seedParticles();
    };
    window.addEventListener("resize", onResize);

    /* Cursor tracking — translates clientX/Y into container-local coords.
       When the cursor leaves the section, mouse goes off-canvas so the
       smoother gracefully exits. */
    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        mouse.x = -1e6;
        mouse.y = -1e6;
        return;
      }
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };
    const onMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updatePointer(t.clientX, t.clientY);
    };
    const onMouseLeave = () => {
      mouse.x = -1e6;
      mouse.y = -1e6;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("blur", onMouseLeave);
    document.addEventListener("mouseleave", onMouseLeave);

    /* Only animate when the section is visible — preserves CPU/battery */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("blur", onMouseLeave);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
