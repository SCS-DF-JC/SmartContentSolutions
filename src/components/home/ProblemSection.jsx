import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ProblemSection() {
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const gridRef = useRef(null);

  const problems = [
    {
      title: "Burning Hours on Repetitive Tasks",
      description:
        "Your team drowns in manual content creation while competitors automate everything.",
      icon: "⏱",
      tag: "Problem 01",
    },
    {
      title: "Inconsistent Growth",
      description:
        "Random posting schedules and guesswork analytics leave money on the table.",
      icon: "📈",
      tag: "Problem 02",
    },
    {
      title: "Scaling Nightmares",
      description:
        "Every new client means hiring more people. Your margins keep shrinking.",
      icon: "👥",
      tag: "Problem 03",
    },
  ];

  const handleHover = (event) => {
    if (!gridRef.current) return;

    const card = event.currentTarget;
    const gridRect = gridRef.current.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const x = cardRect.left - gridRect.left;
    const y = cardRect.top - gridRect.top;

    setHighlightStyle({
      opacity: 1,
      transform: `translate(${x}px, ${y}px)`,
      width: `${cardRect.width}px`,
      height: `${cardRect.height}px`,
    });
  };

  const clearHover = () => {
    setHighlightStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <section className="relative bg-[#0F0F10] py-20 sm:py-24 lg:py-28 overflow-hidden">
      {/* soft background glow behind section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[60rem] rounded-full bg-gradient-to-b from-[#1E1B1B] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#201818] border border-[#3A2626] text-[11px] font-medium tracking-[0.15em] uppercase text-[#F97373] mb-4">
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Your competition isn't sleeping.
          </h2>
          <p className="text-sm sm:text-base text-[#A9AAAC] max-w-2xl mx-auto">
            They're automating. While you manually schedule posts, they're scaling with AI powered systems.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* floating red highlight */}
        <div
          className="absolute rounded-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: "radial-gradient(circle at top left, rgba(248,113,113,0.20), rgba(15,15,16,0.3))",
            boxShadow: "0 0 45px rgba(248,113,113,0.35)",
            backdropFilter: "blur(10px)",
            zIndex: 0,
            ...highlightStyle,
          }}
        />

        {/* cards */}
        <div
          ref={gridRef}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={handleHover}
              onMouseLeave={clearHover}
              className="group relative rounded-3xl bg-gradient-to-br from-[#1A1A1C] via-[#151516] to-[#101011] border border-[#2A2A2C] px-7 py-7 sm:px-8 sm:py-8 text-left transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#241616] border border-[#3A2626] text-xl">
                  <span className="text-[#F87171]">{problem.icon}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#F97373]/80">
                  {problem.tag}
                </span>
              </div>

              <h3 className="text-white font-semibold text-lg sm:text-xl mb-3">
                {problem.title}
              </h3>
              <p className="text-[#A9AAAC] text-sm leading-relaxed">
                {problem.description}
              </p>

              {/* subtle bottom accent */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#F97373]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}