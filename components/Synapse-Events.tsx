"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Sample events data
const eventsData = [
    {
        title: "Rave Knights",
        description: "DJ Battle",
        thumbnail: "/events/hackathon.jpg",
        category: "Tech",
    },
    {
        title: "Battle of Bands",
        description: "Rock the stage",
        thumbnail: "/events/bands.jpg",
        category: "Cultural",
    },
    {
        title: "Rampage",
        description: "Fashion Show",
        thumbnail: "/events/esports.jpg",
        category: "Gaming",
    },
    {
        title: "Rap Battle",
        description: "Battle of Rap",
        thumbnail: "/events/workshop.jpg",
        category: "Workshop",
    },
    {
        title: "Dance Face-Off",
        description: "Let your moves shine",
        thumbnail: "/events/dance.jpg",
        category: "Cultural",
    },
    {
        title: "Concert",
        description: "Live Music",
        thumbnail: "/events/art.jpg",
        category: "Art",
    },
    {
        title: "Stand-up Comedy",
        description: "Laugh out loud",
        thumbnail: "/events/comedy.jpg",
        category: "Cultural",
    },
    {
        title: "Photography Walk",
        description: "Capture moments",
        thumbnail: "/events/photography.jpg",
        category: "Art",
    },
];

// Category color mapping
const categoryColors: Record<string, { gradient: string; glow: string }> = {
    Tech: { gradient: "from-violet-600 via-purple-600 to-indigo-700", glow: "rgba(139, 92, 246, 0.4)" },
    Cultural: { gradient: "from-pink-500 via-rose-500 to-red-600", glow: "rgba(236, 72, 153, 0.4)" },
    Gaming: { gradient: "from-red-500 via-orange-500 to-amber-600", glow: "rgba(239, 68, 68, 0.4)" },
    Workshop: { gradient: "from-amber-500 via-yellow-500 to-lime-500", glow: "rgba(234, 179, 8, 0.4)" },
    Art: { gradient: "from-cyan-500 via-blue-500 to-indigo-600", glow: "rgba(59, 130, 246, 0.4)" },
    Literary: { gradient: "from-emerald-500 via-green-500 to-teal-600", glow: "rgba(16, 185, 129, 0.4)" },
};

const categories = ["All", "Tech", "Cultural", "Gaming", "Art", "Workshop"];

export default function Events() {
    const [activeCategory, setActiveCategory] = useState("All");
    const ref = useRef<HTMLDivElement>(null);

    const filteredEvents = activeCategory === "All"
        ? eventsData
        : eventsData.filter(event => event.category === activeCategory);

    const firstRow = filteredEvents.slice(0, Math.ceil(filteredEvents.length / 2));
    const secondRow = filteredEvents.slice(Math.ceil(filteredEvents.length / 2));

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Simple CSS-based transforms - much smoother than springs
    const translateX = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1]);
    const translateY = useTransform(scrollYProgress, [0, 0.15], [-200, 200]);

    return (
        <section
            id="events"
            ref={ref}
            className="min-h-[180vh] py-20 overflow-hidden antialiased relative flex flex-col bg-black"
        >
            {/* Background - static, no animation */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 100%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* Header Section */}
            <div className="max-w-7xl relative mx-auto py-16 md:py-24 px-6 w-full">
                {/* Label */}
                <div className="inline-block mb-4">
                    <span
                        className="text-sm font-semibold tracking-widest uppercase"
                        style={{
                            background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        What&apos;s Happening
                    </span>
                </div>

                {/* Title */}
                <h2
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
                    style={{
                        fontFamily: "var(--font-bebas), 'Bebas Neue', 'Impact', sans-serif",
                        letterSpacing: "0.03em",
                    }}
                >
                    EVENTS
                </h2>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed mb-8">
                    Four days of electrifying competitions, workshops, performances, and experiences.
                </p>

                {/* Category Filter Pills - simple CSS transitions */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCategory === category
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Parallax Cards Container - with perspective effect restored */}
            <motion.div
                style={{
                    opacity,
                    y: translateY,
                    rotateX: useTransform(scrollYProgress, [0, 0.2], [8, 0]),
                    rotateZ: useTransform(scrollYProgress, [0, 0.2], [5, 0]),
                }}
                className="relative [perspective:1000px] [transform-style:preserve-3d]"
            >
                {/* First Row */}
                <motion.div
                    style={{ x: translateX }}
                    className="flex flex-row-reverse gap-4 md:gap-8 mb-6 md:mb-12 px-4"
                >
                    <AnimatePresence mode="popLayout">
                        {firstRow.map((event, index) => (
                            <EventCard key={event.title} event={event} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Second Row */}
                <motion.div
                    style={{ x: translateXReverse }}
                    className="flex flex-row gap-4 md:gap-8 px-4"
                >
                    <AnimatePresence mode="popLayout">
                        {secondRow.map((event, index) => (
                            <EventCard key={event.title} event={event} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* View All CTA */}
            <div className="absolute bottom-16 left-0 right-0 text-center z-20">
                <Link href="/events">
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-5 text-sm font-semibold tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors duration-200"
                    >
                        View All Events
                        <span className="ml-2">→</span>
                    </Button>
                </Link>
            </div>
        </section>
    );
}

// Simplified Event Card
const EventCard = ({
    event,
    index,
}: {
    event: {
        title: string;
        description: string;
        thumbnail: string;
        category: string;
    };
    index: number;
}) => {
    const colorConfig = categoryColors[event.category] || categoryColors.Tech;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            className="group h-56 md:h-72 w-[220px] md:w-[300px] relative shrink-0 rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.02]"
        >
            <Link href="/events" className="block h-full w-full">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorConfig.gradient}`} />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-white/90">
                        {event.category}
                    </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1">
                        {event.title}
                    </h3>
                    <p className="text-white/60 text-xs">
                        {event.description}
                    </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-3 right-3 z-10 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </Link>
        </motion.div>
    );
};