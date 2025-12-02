import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import LogoCarouselSection from "./LogoCarousel";

export default function HeroSection() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const stats = [
    { value: "10x", label: "Faster Content" },
    { value: "85%", label: "Cost Reduction" },
    { value: "24/7", label: "Always Running" },
    { value: "500+", label: "Active Users" }
  ];

  return (
    <>
      {/* Metallic Shimmer Animation Styles */}
      <style>{`
        @keyframes metallicShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .metallic-title {
          background: linear-gradient(
            90deg,
            #A9AAAC 0%,
            #D6D7D8 15%,
            #E1C37A 30%,
            #B6934C 45%,
            #E1C37A 55%,
            #D6D7D8 70%,
            #A9AAAC 85%,
            #D6D7D8 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: metallicShimmer 6s linear infinite;
        }
        
        .logo-glow {
          filter: drop-shadow(0 0 30px rgba(225, 195, 122, 0.15)) 
                  drop-shadow(0 0 60px rgba(225, 195, 122, 0.08));
        }
      `}</style>

      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Animated Background Canvas */}
        <AnimatedBackground />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#E1C37A]/8 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D6D7D8]/5 rounded-full blur-[150px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E1C37A]/30 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          
          {/* Metallic Animated Title - Centered at Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="metallic-title text-lg md:text-xl lg:text-2xl font-semibold tracking-wide">
              Smart Content Solutions Limited
            </h2>
          </motion.div>

          {/* Hero Layout: Text Left + Logo Right on Desktop */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-16 xl:gap-24">
            
            {/* Left: Hero Text Content - Shifted slightly left */}
            <div className="max-w-2xl text-center lg:text-left lg:flex-shrink-0">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:justify-start flex justify-center"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#E1C37A]/10 text-[#E1C37A] border border-[#E1C37A]/20 mb-6 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3" />
                  AI Automation Agency
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E1C37A] animate-pulse" />
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Your marketing team
                <span className="block mt-2 gold-text">replaced by machines.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-[#A9AAAC] mb-10 leading-relaxed"
              >
                Smart Content Solutions automates your entire content pipeline. 
                Posts go live. Leads come in. You sleep.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <Link
                  to={createPageUrl("DashboardPreview")}
                  className="btn-gold px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 group"
                >
                  See The Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={createPageUrl("Pricing")}
                  className="btn-outline px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  View Pricing
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold gold-text mb-1">{stat.value}</div>
                    <div className="text-xs text-[#5B5C60] uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Video Preview CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex justify-center lg:justify-start"
              >
                <button
                  onMouseEnter={() => setIsVideoHovered(true)}
                  onMouseLeave={() => setIsVideoHovered(false)}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1A1A1C]/60 border border-[#3B3C3E]/50 backdrop-blur-sm hover:border-[#E1C37A]/30 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isVideoHovered ? 'gold-gradient scale-110' : 'bg-[#3B3C3E]'}`}>
                    <Play className={`w-4 h-4 ml-0.5 ${isVideoHovered ? 'text-[#1A1A1C]' : 'text-[#D6D7D8]'}`} />
                  </div>
                  <span className="text-sm text-[#A9AAAC] group-hover:text-white transition-colors">
                    Watch how it works
                  </span>
                  <span className="text-xs text-[#5B5C60]">2 min</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Logo - Desktop only, with subtle glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex lg:items-start lg:justify-center lg:pt-4 lg:flex-shrink-0"
            >
              <div className="relative">
                {/* Soft dispersed ambient glow behind logo */}
                <div className="absolute -inset-8 bg-gradient-radial from-[#E1C37A]/12 via-[#E1C37A]/5 to-transparent rounded-full blur-[80px]" />
                <div className="absolute -inset-4 bg-[#D6D7D8]/5 rounded-full blur-[50px]" />
                
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b490db467b6aad2cac54d/463a9a536_Edittheuploadedlo.png" 
                  alt="Smart Content Solutions"
                  className="w-52 h-52 xl:w-64 xl:h-64 object-contain logo-glow"
                />
              </div>
            </motion.div>

            {/* Mobile/Tablet: Logo below content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:hidden flex justify-center mt-12"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-radial from-[#E1C37A]/10 via-[#E1C37A]/4 to-transparent rounded-full blur-[50px]" />
                <div className="absolute -inset-3 bg-[#D6D7D8]/4 rounded-full blur-[30px]" />
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b490db467b6aad2cac54d/463a9a536_Edittheuploadedlo.png" 
                  alt="Smart Content Solutions"
                  className="w-36 h-36 md:w-44 md:h-44 object-contain logo-glow"
                />
              </div>
            </motion.div>
          </div>

          {/* Logo Carousel - Inside hero, visible above the fold */}
          <div className="mt-16">
            <LogoCarouselSection />
          </div>
        </div>

      </section>
    </>
  );
}