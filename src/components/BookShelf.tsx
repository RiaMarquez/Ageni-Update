"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Book {
  spine: string
  tool: string
  category: string
  bestFor: string
  spineColor: string
  frontColor: string
  accentColor: string
  textColor: string
  coverImage: string
}

const BOOKS: Book[] = [
  {
    spine: "ChatGPT",
    tool: "ChatGPT",
    category: "LLM",
    bestFor: "Your AI Career Assistant — writing, Q&A, ideation, and daily productivity for every role.",
    spineColor: "#1a1a1a",
    frontColor: "#10a37f",
    accentColor: "#ffffff",
    textColor: "#ffffff",
    coverImage: "/books/book1.png",
  },
  {
    spine: "Google Veo",
    tool: "Google Veo",
    category: "Generative Video",
    bestFor: "Advanced AI video generation — turn text prompts into professional video content at scale.",
    spineColor: "#1a2744",
    frontColor: "#1a2744",
    accentColor: "#4285f4",
    textColor: "#ffffff",
    coverImage: "/books/book2.png",
  },
  {
    spine: "Claude Code",
    tool: "Claude Code",
    category: "Coding / LLM",
    bestFor: "AI for developers & technical workflows — code generation, debugging, and automation.",
    spineColor: "#f0ede6",
    frontColor: "#f5f2eb",
    accentColor: "#c96442",
    textColor: "#1a1a1a",
    coverImage: "/books/book3.png",
  },
  {
    spine: "Perplexity",
    tool: "Perplexity",
    category: "Search & Research",
    bestFor: "AI-powered research — real-time answers with cited sources for sales, strategy, and analysis.",
    spineColor: "#0e1117",
    frontColor: "#151820",
    accentColor: "#20b2aa",
    textColor: "#ffffff",
    coverImage: "/books/book4.png",
  },
  {
    spine: "Gemini",
    tool: "Gemini",
    category: "Image",
    bestFor: "AI image creation — generate visuals, mockups, and marketing assets from text descriptions.",
    spineColor: "#e8e4dc",
    frontColor: "#f0ece4",
    accentColor: "#1a1a2e",
    textColor: "#1a1a1a",
    coverImage: "/books/book5.png",
  },
  {
    spine: "Midjourney",
    tool: "Midjourney",
    category: "Image Advanced",
    bestFor: "Professional design & branding — cinematic imagery and brand visuals at agency quality.",
    spineColor: "#0a0a0a",
    frontColor: "#111111",
    accentColor: "#e8c97a",
    textColor: "#ffffff",
    coverImage: "/books/book6.png",
  },
  {
    spine: "Cursor",
    tool: "Cursor",
    category: "AI IDE",
    bestFor: "AI-powered code editor — build, refactor, and ship software with an AI pair programmer.",
    spineColor: "#1c1c2e",
    frontColor: "#1c1c2e",
    accentColor: "#a78bfa",
    textColor: "#ffffff",
    coverImage: "/books/book7.png",
  },
  {
    spine: "MiniMax",
    tool: "MiniMax / Hailuo",
    category: "Applied Video",
    bestFor: "AI video generation for business — product demos, explainers, and social content at speed.",
    spineColor: "#0f1f0f",
    frontColor: "#0f1f0f",
    accentColor: "#4ade80",
    textColor: "#ffffff",
    coverImage: "/books/book8.png",
  },
  {
    spine: "Figma AI",
    tool: "Figma",
    category: "Design",
    bestFor: "AI-powered design & prototyping — from wireframe to production UI in a single collaborative tool.",
    spineColor: "#2c1810",
    frontColor: "#2c1810",
    accentColor: "#f24e1e",
    textColor: "#ffffff",
    coverImage: "/books/book9.png",
  },
  {
    spine: "OpenClaw",
    tool: "OpenClaw",
    category: "Agentic AI",
    bestFor: "AI agents & automation — build autonomous workflows that act, decide, and execute without you.",
    spineColor: "#d4c4a0",
    frontColor: "#ddd0b0",
    accentColor: "#1a1a2e",
    textColor: "#1a1a1a",
    coverImage: "/books/book10.png",
  },
]

const SW = 48
const BH = 290
const FW = 210
const BD = 28

const REST_ANGLE = -52
const OPEN_ANGLE = -90

const REST_MARGIN = Math.round(FW * Math.abs(Math.cos((REST_ANGLE * Math.PI) / 180)) - SW + 2)
const OPEN_MARGIN = FW - SW + 6

function adjColor(hex: string, amount: number): string {
  const c = hex.replace("#", "")
  return (
    "#" +
    [0, 2, 4]
      .map((o) =>
        Math.min(255, Math.max(0, parseInt(c.substr(o, 2), 16) + amount))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  )
}

const SPRING = { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.8 }

function BookItem({
  book,
  index,
  isActive,
  offset,
  onEnter,
  onLeave,
}: {
  book: Book
  index: number
  isActive: boolean
  offset: number
  onEnter: () => void
  onLeave: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      animate={{
        x: isActive ? 0 : offset * 4,
        z: isActive ? 55 : 0,
        marginRight: isActive ? OPEN_MARGIN : REST_MARGIN,
      }}
      transition={SPRING}
      style={{
        position: "relative",
        width: SW,
        height: BH,
        flexShrink: 0,
        transformStyle: "preserve-3d",
        zIndex: isActive ? 10 : 1,
        cursor: "pointer",
      }}
    >
      {/* Invisible hover shield that covers the open book face */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SW + FW + 10,
            height: BH,
            zIndex: 20,
          }}
        />
      )}
      <motion.div
        animate={{ rotateY: isActive ? OPEN_ANGLE : REST_ANGLE }}
        transition={SPRING}
        style={{
          width: SW,
          height: BH,
          position: "relative",
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: book.spineColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: 8,
              fontWeight: 700,
              color: book.accentColor,
              letterSpacing: "0.1em",
              opacity: 0.9,
            }}
          >
            M{index + 1}
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: book.textColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "75%",
              padding: "0 4px",
              fontFamily: "Georgia, serif",
            }}
          >
            {book.spine}
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: SW,
            width: FW,
            height: BH,
            background: book.frontColor,
            transform: "rotateY(90deg)",
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {!imgError && (
            <Image
              src={book.coverImage}
              alt={book.tool}
              fill
              style={{ objectFit: "cover", opacity: 0.15 }}
              onError={() => setImgError(true)}
            />
          )}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              background: book.accentColor,
              padding: "10px 12px 8px 24px",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                margin: "0 0 2px",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: book.frontColor,
                opacity: 0.85,
                textTransform: "uppercase",
              }}
            >
              Module {index + 1} · {book.category}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                color: book.frontColor,
                lineHeight: 1.2,
                fontFamily: "Georgia, serif",
              }}
            >
              {book.tool}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "12px 12px 12px 24px",
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 10,
                lineHeight: 1.55,
                color: book.textColor,
                opacity: 0.75,
              }}
            >
              {book.bestFor}
            </p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: FW,
            height: BD,
            background: adjColor(book.spineColor, 45),
            transform: "rotateX(90deg)",
            transformOrigin: "top center",
            backfaceVisibility: "hidden",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: SW,
            width: BD,
            height: BH,
            background: adjColor(book.spineColor, -28),
            transform: "rotateY(90deg)",
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: FW,
            height: BD,
            background: adjColor(book.spineColor, -18),
            transform: "rotateX(-90deg)",
            transformOrigin: "bottom center",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function BookShelf() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const frameRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [sidePad, setSidePad] = useState(0)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSidePad(containerRef.current.offsetWidth / 2 - SW / 2)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleEnter = useCallback((i: number) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setActiveIdx(i))
  }, [])

  const handleLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setActiveIdx(null))
  }, [])

  const activeBook = activeIdx !== null ? BOOKS[activeIdx] : null

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 0 1rem",
        background: "transparent",
        borderRadius: 16,
        minHeight: 400,
        perspective: 1200,
        perspectiveOrigin: "50% 38%",
        overflow: "hidden",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100,
          height: "100%",
          background: "linear-gradient(to right, white, transparent)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          height: "100%",
          background: "linear-gradient(to left, white, transparent)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.1}
        style={{
          display: "flex",
          alignItems: "flex-end",
          transformStyle: "preserve-3d",
          paddingLeft: sidePad,
          paddingRight: sidePad,
          cursor: "grab",
        }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {BOOKS.map((book, i) => {
          const dist = activeIdx !== null ? i - activeIdx : 0
          const clampedOffset =
            activeIdx !== null && i !== activeIdx
              ? Math.sign(dist) * Math.min(Math.abs(dist), 2)
              : 0

          return (
            <BookItem
              key={book.tool}
              book={book}
              index={i}
              isActive={activeIdx === i}
              offset={clampedOffset}
              onEnter={() => handleEnter(i)}
              onLeave={handleLeave}
            />
          )
        })}
      </motion.div>

      <motion.p
        key={activeIdx ?? "idle"}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          marginTop: "1.5rem",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: activeBook ? activeBook.accentColor : "#999999",
        }}
      >
        {activeBook ? `${activeBook.tool} — ${activeBook.category}` : "drag to browse · hover to open"}
      </motion.p>
    </div>
  )
}
