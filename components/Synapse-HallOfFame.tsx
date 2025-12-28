"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HallOfFameImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

// Gallery images - replace placeholder gradients with real images
const hallOfFameImages: HallOfFameImage[] = [
  { src: "", alt: "Concert crowd with confetti", span: "wide" },
  { src: "", alt: "Festival attendees dancing" },
  { src: "", alt: "Stage performance with lights", span: "tall" },
  { src: "", alt: "Artist on stage close-up" },
  { src: "", alt: "Crowd hands in air" },
  { src: "", alt: "Night event atmosphere" },
  { src: "", alt: "Dance performance" },
  { src: "", alt: "Band performance", span: "wide" },
  { src: "", alt: "Winner celebration" },
];

export default function HallOfFame() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              headerRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
          },
        });
      }

      // Grid items stagger animation
      if (gridRef.current) {
        const gridItems = gridRef.current.querySelectorAll(".gallery-item");
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              gridItems,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.08,
              }
            );
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Get grid span classes
  const getSpanClass = (span?: "wide" | "tall" | "normal") => {
    switch (span) {
      case "wide":
        return "md:col-span-2";
      case "tall":
        return "md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 opacity-0">
          {/* Label */}
          <div className="inline-block mb-4">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{
                background:
                  "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Captured Moments
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
            style={{
              fontFamily:
                "var(--font-bebas), 'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            HALL OF FAME
          </h2>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            Iconic moments from past editions that left a mark on Synapse history.
            Part of the Joker&apos;s Realm, forever remembered.
          </p>
        </div>

        {/* Masonry-style Image Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {hallOfFameImages.map((image, index) => (
            <motion.div
              key={index}
              className={`gallery-item relative overflow-hidden rounded-2xl cursor-pointer group ${getSpanClass(
                image.span
              )}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Placeholder gradient - will be replaced by real images */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  background: `linear-gradient(${135 + index * 20}deg, 
                    rgba(168, 85, 247, ${0.4 + (index % 3) * 0.1}) 0%, 
                    rgba(236, 72, 153, ${0.3 + (index % 4) * 0.1}) 50%, 
                    rgba(0, 0, 0, 0.9) 100%)`,
                }}
              />

              {/* Image would go here with lazy loading */}
              {image.src && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner accent */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image number indicator */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/70 text-sm font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Zoom icon on hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
