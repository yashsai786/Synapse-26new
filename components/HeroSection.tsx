"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CountdownTimer } from "./CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Set the event date - March 21, 2026
  const eventDate = new Date("2026-03-21T00:00:00");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Static Background - no parallax for smoothness */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 30% 30%, rgba(239, 68, 68, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, black 100%)
            `,
          }}
        />

        {/* Static laser lines */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-full h-full max-w-4xl">
            {[...Array(5)].map((_, i) => (
              <div
                key={`laser-${i}`}
                className="absolute top-0 bottom-0 w-px"
                style={{
                  left: `${20 + i * 15}%`,
                  background: `linear-gradient(180deg, 
                    transparent 0%, 
                    ${i % 2 === 0 ? "rgba(168,85,247,0.25)" : "rgba(236,72,153,0.25)"} 30%, 
                    ${i % 2 === 0 ? "rgba(236,72,153,0.15)" : "rgba(239,68,68,0.15)"} 70%, 
                    transparent 100%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - simple fade in, no parallax */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 px-6 md:px-12">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <Badge
            variant="outline"
            className="border-purple-500/50 text-purple-300 bg-purple-500/10 px-5 py-1.5 text-sm tracking-widest"
          >
            MARCH 21-24, 2026
          </Badge>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-center text-white"
            style={{
              fontSize: "clamp(3.5rem, 18vw, 14rem)",
              fontWeight: 900,
              fontFamily: "var(--font-bebas), 'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: "0.06em",
              lineHeight: 0.9,
              textShadow: "0 0 60px rgba(168, 85, 247, 0.2), 0 0 100px rgba(236, 72, 153, 0.15)",
              textTransform: "uppercase",
            }}
          >
            SYNAPSE&apos;26
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-xl text-center leading-relaxed mt-2"
          >
            Enter the Joker&apos;s Realm — 4 days of chaos, creativity &amp; competition.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 md:mt-14"
        >
          {/* Primary CTA */}
          <Button
            size="lg"
            className="px-10 py-6 md:px-14 md:py-7 text-base md:text-lg font-bold tracking-wider rounded-full transition-transform duration-150 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
            }}
            onClick={() => router.push("/register")}
          >
            <span className="text-white">Register Now</span>
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            className="px-10 py-6 md:px-14 md:py-7 text-base md:text-lg font-semibold tracking-wider bg-white/5 border-2 border-white/40 text-white rounded-full hover:bg-white/10 transition-colors duration-150"
            onClick={() => {
              document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See All 50+ Events
            <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Section - Countdown */}
      <div className="relative z-10 px-6 md:px-12 pb-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center"
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-6 md:px-12 md:py-8">
            <CountdownTimer targetDate={eventDate} />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
