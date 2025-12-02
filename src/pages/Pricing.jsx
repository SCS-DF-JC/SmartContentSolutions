import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { 
  MessageSquare,
  AlertCircle,
  Zap,
  Building2,
  Sparkles
} from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";
import PricingCardsSection from "../components/pricing/PricingCardsSection";
import { useSubscription } from "../components/subscription/useSubscription";
import { PLANS } from "../components/subscription/plansConfig";

export default function Pricing() {
  const location = useLocation();
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, login, hasPlan } = useSubscription();

  // Check for cancelled checkout
  const params = new URLSearchParams(location.search);
  const checkoutCancelled = params.get("checkout") === "cancelled";

  const handleSubscribe = async (planName) => {
    setError(null);
    
    // Enterprise plan goes to Contact page
    if (planName === "Enterprise") {
      window.location.href = createPageUrl("Contact");
      return;
    }
    
    if (!isAuthenticated) {
      login(createPageUrl("Pricing"));
      return;
    }

    const plan = PLANS[planName];
    if (!plan) return;

    setLoadingPlan(planName);

    try {
      const response = await base44.functions.invoke("createCheckout", {
        planName,
        billingPeriod: isAnnual ? "annual" : "monthly"
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else if (response.data?.error) {
        console.error("Checkout API error:", response.data);
        setError(response.data.error);
      } else {
        setError("Unable to create checkout session. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      const errorMsg = err.response?.data?.error || err.message || "Something went wrong. Please try again.";
      setError(errorMsg);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Essential AI automations for growing businesses",
      monthlyPrice: PLANS.Starter.monthlyPrice,
      annualPrice: PLANS.Starter.annualPrice,
      popular: false,
      color: "metallic",
      features: PLANS.Starter.features,
      cta: "Start Starter Plan"
    },
    {
      name: "Growth",
      icon: Building2,
      description: "Full automation suite for scaling operations",
      monthlyPrice: PLANS.Growth.monthlyPrice,
      annualPrice: PLANS.Growth.annualPrice,
      popular: true,
      color: "gold",
      features: PLANS.Growth.features,
      cta: "Start Growth Plan"
    },
    {
      name: "Enterprise",
      icon: Sparkles,
      description: "Enterprise-grade AI for serious operators",
      monthlyPrice: PLANS.Enterprise.monthlyPrice,
      annualPrice: PLANS.Enterprise.annualPrice,
      popular: false,
      color: "premium",
      features: PLANS.Enterprise.features,
      cta: "Contact Sales",
      contactSales: true
    }
  ];

  const faqs = [
    {
      q: "How fast can I get started?",
      a: "Most clients are fully operational within 48 hours. Our onboarding AI handles the heavy lifting."
    },
    {
      q: "Can I switch plans later?",
      a: "Upgrade or downgrade anytime. Changes take effect immediately. No penalties."
    },
    {
      q: "What if I need custom features?",
      a: "Enterprise plans include custom development. Core and Corporate users can request features."
    },
    {
      q: "Is there a contract?",
      a: "No long-term contracts. Cancel anytime. We earn your business every month."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E1C37A]/10 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
                  {checkoutCancelled && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-3 max-w-md mx-auto"
                    >
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <p className="text-sm text-yellow-400">Checkout was cancelled. Ready when you are!</p>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 max-w-md mx-auto"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}

                  <SectionHeading
                    badge="Pricing"
                    title="Pick your weapon."
                    subtitle="Simple pricing. Massive ROI. Cancel anytime."
                  />

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#5B5C60]'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isAnnual ? 'gold-gradient' : 'bg-[#3B3C3E]'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${isAnnual ? 'left-8' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#5B5C60]'}`}>
              Annual <span className="text-[#E1C37A]">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards with Floating Highlight */}
      <PricingCardsSection
        plans={plans}
        isAnnual={isAnnual}
        loadingPlan={loadingPlan}
        hasPlan={hasPlan}
        onSubscribe={handleSubscribe}
      />

      {/* What's Included */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            badge="What You Get"
            title="More than just tools."
            subtitle="Every subscription includes the full SCS experience."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Onboarding in 48 Hours", desc: "We set everything up. You just approve." },
              { title: "Dedicated Support", desc: "Real humans when you need them." },
              { title: "Monthly Strategy Calls", desc: "We help you optimize and scale." },
              { title: "Continuous Updates", desc: "New features drop every month." },
              { title: "Training Resources", desc: "Video tutorials for every tool." },
              { title: "Community Access", desc: "Network with other SCS users." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full gold-gradient mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-[#A9AAAC]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            badge="FAQs"
            title="Questions? Answers."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-[#A9AAAC]">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card-gold rounded-3xl p-12 glow-gold">
            <h2 className="text-3xl font-bold mb-4">Still deciding?</h2>
            <p className="text-[#A9AAAC] mb-8">
              Book a free 15-minute call. We'll show you exactly how SCS can work for your business.
            </p>
            <Link
              to={createPageUrl("Contact")}
              className="btn-gold px-8 py-4 rounded-full inline-flex items-center gap-2 font-semibold"
            >
              <MessageSquare className="w-5 h-5" />
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}