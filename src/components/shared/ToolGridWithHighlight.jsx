import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Lock, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useSubscription } from "../subscription/useSubscription";

function ToolCard({ tool, tier, onUnlockClick, index, onMouseEnter, onMouseLeave }) {
  const { hasAccessToTool } = useSubscription();
  const hasAccess = hasAccessToTool(tool.planRequired);
  const Icon = tool.icon;
  
  const CardWrapper = tool.slug ? Link : "div";
  const cardProps = tool.slug ? { to: `${createPageUrl("Tool")}?slug=${tool.slug}` } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardWrapper {...cardProps} className="block">
        <div className={`glass-card rounded-2xl p-6 h-full transition-all duration-300 cursor-pointer relative z-10 ${hasAccess ? 'hover:border-green-500/30' : 'hover:border-[#E1C37A]/20'}`}>
          {/* Locked/Unlocked Overlay */}
          {!hasAccess ? (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-[#1A1A1C]/50 to-[#1A1A1C]/80 z-10 flex flex-col items-center justify-end pb-6 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#3B3C3E] flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-[#E1C37A]" />
              </div>
              <span className="btn-gold px-5 py-2 rounded-full text-sm flex items-center gap-2 pointer-events-auto">
                View Tool
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ) : (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={!hasAccess ? "opacity-60" : ""}>
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${tier === "Corporate" ? "gold-gradient" : "metallic-gradient"}`}>
              <Icon className="w-6 h-6 text-[#1A1A1C]" />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white">{tool.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tier === "Corporate" ? "bg-[#E1C37A]/20 text-[#E1C37A]" : "bg-[#D6D7D8]/20 text-[#D6D7D8]"}`}>
                {tier}
              </span>
            </div>
            
            <p className="text-sm text-[#A9AAAC] leading-relaxed">
              {tool.shortDescription}
            </p>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function ToolGridWithHighlight({ tools, tier = "Core", onUnlockClick }) {
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const gridRef = useRef(null);

  const handleHover = (event) => {
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
    setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative w-full" ref={gridRef}>
      {/* GOLD FLOATING HIGHLIGHT */}
      <div
        className="absolute rounded-2xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: "rgba(212, 175, 55, 0.15)",
          boxShadow: "0 0 40px rgba(212, 175, 55, 0.25)",
          backdropFilter: "blur(8px)",
          position: "absolute",
          zIndex: 0,
          ...highlightStyle,
        }}
      />

      {/* GRID OF TOOLS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            tier={tier}
            onUnlockClick={onUnlockClick}
            index={index}
            onMouseEnter={handleHover}
            onMouseLeave={clearHover}
          />
        ))}
      </div>
    </div>
  );
}