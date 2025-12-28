"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface JokerSlidingProps {
  className?: string;
  onComplete?: () => void;
  autoPlay?: boolean;
  delay?: number;
}

export default function JokerSliding({
  className = "",
  onComplete,
  autoPlay = true,
  delay = 0,
}: JokerSlidingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!autoPlay || hasAnimated.current) return;
    hasAnimated.current = true;

    // Fade in text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: delay + 0.3 }
    );

    // Split animation after delay
    const splitTime = delay + 2;

    // Fade out text
    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: splitTime - 0.3,
    });

    // Slide left panel out
    gsap.to(leftHalfRef.current, {
      x: "-100%",
      duration: 0.9,
      ease: "power2.inOut",
      delay: splitTime,
    });

    // Slide right panel out
    gsap.to(rightHalfRef.current, {
      x: "100%",
      duration: 0.9,
      ease: "power2.inOut",
      delay: splitTime,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.visibility = "hidden";
        }
        onComplete?.();
      },
    });

    return () => {
      gsap.killTweensOf([leftHalfRef.current, rightHalfRef.current, textRef.current]);
    };
  }, [autoPlay, delay, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] overflow-hidden ${className}`}
      style={{ pointerEvents: "none" }}
    >
      {/* Left Panel */}
      <div
        ref={leftHalfRef}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111118 50%, #1a1a2e 100%)",
          willChange: "transform",
        }}
      >
        <div
          className="absolute top-1/3 right-0 w-64 h-64 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Right Panel */}
      <div
        ref={rightHalfRef}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(225deg, #0a0a0a 0%, #111118 50%, #1a1a2e 100%)",
          willChange: "transform",
        }}
      >
        <div
          className="absolute top-1/3 left-0 w-64 h-64 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Center Text - Split across separator */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center">
          {/* Left word */}
          <span
            className="text-white text-right pr-4"
            style={{
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 900,
              fontFamily: "var(--font-bebas), 'Bebas Neue', Impact, sans-serif",
              letterSpacing: "0.04em",
              textShadow: "0 0 40px rgba(168,85,247,0.4)",
            }}
          >
            JOKER&apos;S
          </span>
          {/* Right word */}
          <span
            className="text-white text-left pl-4"
            style={{
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 900,
              fontFamily: "var(--font-bebas), 'Bebas Neue', Impact, sans-serif",
              letterSpacing: "0.04em",
              textShadow: "0 0 40px rgba(236,72,153,0.4)",
            }}
          >
            REALM
          </span>
        </div>
      </div>

      {/* Subtitle - Below the split text */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 pt-32"
        style={{ opacity: 0 }}
      >
        <p
          className="text-sm tracking-widest uppercase"
          style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899, #ef4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Enter the Realm
        </p>
      </div>

      {/* Center Line */}
      <div
        className="absolute top-0 bottom-0 left-1/2 w-px z-20"
        style={{
          background: "linear-gradient(180deg, transparent 20%, rgba(168,85,247,0.3) 50%, transparent 80%)",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
