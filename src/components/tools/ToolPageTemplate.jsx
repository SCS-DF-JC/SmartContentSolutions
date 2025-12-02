import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Play,
  Zap,
  LogIn
} from "lucide-react";
import { PLAN_HIERARCHY } from "./toolsConfig";
import SectionHeading from "../shared/SectionHeading";
import { useSubscription } from "../subscription/useSubscription";

export default function ToolPageTemplate({ tool }) {
  const { user, isAuthenticated, hasAccessToTool, login } = useSubscription();
  
  const userPlan = user?.subscription_plan || "none";
  const userPlanLevel = PLAN_HIERARCHY[userPlan] || 0;
  const requiredPlanLevel = PLAN_HIERARCHY[tool.planRequired] || 0;
  const hasAccess = hasAccessToTool(tool.planRequired);

  const categoryColors = {
    Core: { bg: "bg-[#D6D7D8]/10", text: "text-[#D6D7D8]", border: "border-[#D6D7D8]/20" },
    Corporate: { bg: "bg-[#E1C37A]/10", text: "text-[#E1C37A]", border: "border-[#E1C37A]/20" }
  };

  const planColors = {
    Starter: "#4ADE80",
    Growth: "#60A5FA",
    Enterprise: "#E1C37A"
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px]" 
               style={{ backgroundColor: `${tool.color}15` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D6D7D8]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Category Badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 ${categoryColors[tool.category].bg} ${categoryColors[tool.category].text} ${categoryColors[tool.category].border} border`}>
              {tool.category === "Corporate" ? <Sparkles className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
              {tool.category} Tool
            </span>

            {/* Tool Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-8"
              style={{ 
                background: `linear-gradient(135deg, ${tool.color}30, ${tool.color}10)`,
                border: `1px solid ${tool.color}40`
              }}
            >
              <tool.icon className="w-10 h-10" style={{ color: tool.color }} />
            </motion.div>

            {/* Tool Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {tool.name}
            </h1>

            {/* Short Description */}
            <p className="text-xl text-[#A9AAAC] mb-6 max-w-2xl mx-auto">
              {tool.shortDescription}
            </p>

            {/* Plan Required Pill */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ 
                  backgroundColor: `${planColors[tool.planRequired]}15`,
                  borderColor: `${planColors[tool.planRequired]}30`,
                  color: planColors[tool.planRequired]
                }}
              >
                Requires: {tool.planRequired} Plan
              </span>
              {!hasAccess && (
                <span className="flex items-center gap-1.5 text-sm text-[#5B5C60]">
                  <Lock className="w-4 h-4" />
                  Locked
                </span>
              )}
            </div>

            {/* Main CTA */}
            {hasAccess ? (
              <button className="btn-gold px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 group">
                <Play className="w-5 h-5" />
                Open Tool
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : !isAuthenticated ? (
              <button
                onClick={() => login(window.location.href)}
                className="btn-gold px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 group"
              >
                <LogIn className="w-5 h-5" />
                Sign In to Unlock
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to={createPageUrl("Pricing")}
                className="btn-gold px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 group"
              >
                <Lock className="w-5 h-5" />
                Unlock With {tool.planRequired} Plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow frame */}
            <div 
              className="absolute -inset-1 rounded-3xl blur-xl"
              style={{ background: `linear-gradient(135deg, ${tool.color}20, transparent, ${tool.color}20)` }}
            />
            
            <div className="relative glass-card rounded-3xl p-6 border border-[#3B3C3E]/50">
              {/* Mock Dashboard Preview */}
              <div className={`aspect-video rounded-2xl bg-[#1A1A1C] relative overflow-hidden ${!hasAccess ? 'locked-blur' : ''}`}>
                {/* Fake dashboard UI */}
                <div className="absolute inset-0 p-4">
                  <div className="h-8 bg-[#3B3C3E]/30 rounded-lg mb-4 flex items-center px-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="ml-4 flex-1 h-4 bg-[#3B3C3E]/50 rounded max-w-xs" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-20 rounded-xl bg-[#3B3C3E]/20 p-3">
                        <div className="w-8 h-2 bg-[#3B3C3E]/40 rounded mb-2" />
                        <div className="w-12 h-4 bg-[#3B3C3E]/30 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 h-40 rounded-xl bg-[#3B3C3E]/20" />
                    <div className="h-40 rounded-xl bg-[#3B3C3E]/20" />
                  </div>
                </div>
                
                {/* Tool icon watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <tool.icon className="w-32 h-32" style={{ color: tool.color }} />
                </div>
              </div>

              {/* Lock Overlay */}
              {!hasAccess && (
                <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center bg-[#1A1A1C]/60 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-[#1A1A1C]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Preview Locked</h3>
                  <p className="text-[#A9AAAC] text-sm mb-6">Subscribe to access this tool</p>
                  <Link
                    to={createPageUrl("Pricing")}
                    className="btn-gold px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
                  >
                    View Plans
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#A9AAAC] leading-relaxed"
          >
            {tool.longDescription}
          </motion.p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            badge="Benefits"
            title="What you get."
          />

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {tool.mainBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 glass-card rounded-xl"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}80)` }}
                >
                  <Check className="w-4 h-4 text-[#1A1A1C]" />
                </div>
                <span className="text-[#D6D7D8]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E1C37A]/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionHeading
            badge="How It Works"
            title="Three steps. Zero friction."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {tool.howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}05)`,
                    border: `1px solid ${tool.color}30`,
                    color: tool.color
                  }}
                >
                  {index + 1}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{step.step}</h4>
                <p className="text-[#A9AAAC]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Access Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-gold rounded-3xl p-8 text-center glow-gold"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {hasAccess ? "You have access!" : `Unlock with ${tool.planRequired}`}
            </h3>
            
            {hasAccess ? (
              <>
                <p className="text-[#A9AAAC] mb-6">
                  Your {userPlan} plan includes full access to {tool.name}.
                </p>
                <button className="btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Launch Tool
                </button>
              </>
            ) : !isAuthenticated ? (
              <>
                <p className="text-[#A9AAAC] mb-6">
                  Create an account and subscribe to unlock {tool.name} and all other {tool.category} tools.
                </p>
                <button
                  onClick={() => login(window.location.href)}
                  className="btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In to Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <p className="text-[#A9AAAC] mb-6">
                  Upgrade to {tool.planRequired} to unlock {tool.name} and more powerful tools.
                </p>
                <Link
                  to={createPageUrl("Pricing")}
                  className="btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Upgrade to {tool.planRequired}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}

            <p className="text-xs text-[#5B5C60] mt-6">
              Cancel anytime. No long-term contracts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Tools CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#5B5C60] mb-4">Explore more tools</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={createPageUrl("CoreTools")}
              className="btn-outline px-6 py-3 rounded-full text-sm"
            >
              View Core Tools
            </Link>
            <Link
              to={createPageUrl("CorporateTools")}
              className="btn-outline px-6 py-3 rounded-full text-sm"
            >
              View Corporate Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}