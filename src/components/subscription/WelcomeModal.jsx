import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Link2, Play, ArrowRight } from "lucide-react";

export default function WelcomeModal({ isOpen, onClose, planName }) {
  const steps = [
    {
      icon: Link2,
      title: "Connect your platforms",
      desc: "Link your social media and content accounts."
    },
    {
      icon: Zap,
      title: "Explore your tools",
      desc: "Browse the unlocked automations in your dashboard."
    },
    {
      icon: Play,
      title: "Run your first automation",
      desc: "Launch an AI tool and watch it work."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-card-gold rounded-3xl p-8 max-w-lg w-full relative glow-gold"
          >
            {/* Header Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-[#1A1A1C]" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white text-center mb-2"
            >
              Welcome to Smart Content Solutions
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#A9AAAC] text-center mb-8"
            >
              Your AI control center is live.
              {planName && (
                <span className="block text-[#E1C37A] mt-1">
                  {planName} Plan activated
                </span>
              )}
            </motion.p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1A1C]/50"
                >
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-[#1A1A1C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{step.title}</h4>
                    <p className="text-xs text-[#A9AAAC]">{step.desc}</p>
                  </div>
                  <span className="ml-auto text-2xl font-bold text-[#3B3C3E]">
                    {index + 1}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onClose}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Start Exploring the Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-xs text-[#5B5C60] mt-4"
            >
              You can access help anytime from your account settings
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}