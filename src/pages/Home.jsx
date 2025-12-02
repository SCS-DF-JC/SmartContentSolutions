import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Bot, 
  Shield,
  ChevronRight,
  Lock,
  Play
} from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";
import SubscribeModal from "../components/shared/SubscribeModal";
import HeroSection from "../components/home/HeroSection";
import ProblemSection from "../components/home/ProblemSection";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background and Floating Logos */}
      <HeroSection />

      {/* Problem Section with Floating Red Highlight */}
      <ProblemSection />

      {/* Solution Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            badge="The Solution"
            title="One dashboard. Infinite leverage."
            subtitle="Smart Content Solutions puts your entire marketing operation on autopilot."
            goldTitle
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: Zap, title: "Instant Automation", desc: "Connect once. Watch it work forever." },
                { icon: BarChart3, title: "Real Analytics", desc: "Numbers that actually mean something." },
                { icon: Bot, title: "AI That Learns", desc: "Gets smarter with every campaign you run." },
                { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption. Zero compromises." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-[#3B3C3E]/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 group-hover:glow-gold transition-all">
                    <item.icon className="w-6 h-6 text-[#1A1A1C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-[#A9AAAC]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-2 relative"
              style={{ boxShadow: "0 0 20px rgba(225, 195, 122, 0.3), 0 0 40px rgba(225, 195, 122, 0.15)" }}
            >
              <div className="aspect-video rounded-2xl bg-[#1A1A1C] relative overflow-hidden">
                <motion.video
                  ref={videoRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: videoLoaded ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  className="w-full h-full object-cover rounded-2xl"
                  src="YOUR_VIDEO_URL_HERE"
                >
                  Your browser does not support the video tag.
                </motion.video>
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#E1C37A] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E1C37A]/10 via-transparent to-[#E1C37A]/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to automate your growth?
            </h2>
            <p className="text-xl text-[#A9AAAC] mb-10">
              Join 500+ businesses already using Smart Content Solutions.
            </p>

            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-[#1A1A1C] border border-[#3B3C3E] focus:border-[#E1C37A] outline-none mb-4 text-white"
              />
              <Link
                to={createPageUrl("Pricing")}
                className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-[#5B5C60] mt-4">
                Free trial available. No credit card required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SubscribeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        toolName="The Full Dashboard"
      />
    </div>
  );
}