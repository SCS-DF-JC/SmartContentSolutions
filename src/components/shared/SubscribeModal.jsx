import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { X, Sparkles, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscribeModal({ isOpen, onClose, toolName }) {
  if (!isOpen) return null;

  const benefits = [
    "Full access to AI automation dashboard",
    "Unlimited content generation",
    "Priority support",
    "Weekly performance reports"
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass-card rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1C37A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D6D7D8]/5 rounded-full blur-3xl" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A9AAAC] hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center glow-gold">
              <Sparkles className="w-8 h-8 text-[#1A1A1C]" />
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-2">
              Unlock {toolName || "This Tool"}
            </h3>
            <p className="text-[#A9AAAC] text-center mb-8">
              Subscribe to access the full power of Smart Content Solutions
            </p>
            
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#1A1A1C]" />
                  </div>
                  <span className="text-sm text-[#D6D7D8]">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <Link
              to={createPageUrl("Pricing")}
              className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-center"
            >
              View Pricing Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-xs text-[#5B5C60] text-center mt-4">
              Cancel anytime. No questions asked.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}