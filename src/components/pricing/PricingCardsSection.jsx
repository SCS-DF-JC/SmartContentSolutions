import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Check, Zap, Building2, Sparkles, MessageSquare, Loader2 } from "lucide-react";

export default function PricingCardsSection({ 
  plans, 
  isAnnual, 
  loadingPlan, 
  hasPlan, 
  onSubscribe 
}) {
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const [activeIndex, setActiveIndex] = useState(1); // default to Growth (middle)
  const gridRef = useRef(null);

  const iconMap = {
    Starter: Zap,
    Growth: Building2,
    Enterprise: Sparkles
  };

  // Position highlight under active card
  const moveHighlightToIndex = (index) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-plan-card]");
    const card = cards[index];
    if (!card) return;

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

  // On mount and when activeIndex changes, reposition
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => moveHighlightToIndex(activeIndex), 100);
    
    const handleResize = () => moveHighlightToIndex(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[70rem] rounded-full bg-gradient-to-b from-[#18120A] via-transparent to-transparent opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Floating gold highlight behind cards */}
        <div
          className="absolute rounded-[2rem] pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: "radial-gradient(circle at top, rgba(225, 195, 122, 0.25), rgba(26, 26, 28, 0.8))",
            boxShadow: "0 0 60px rgba(225, 195, 122, 0.4)",
            backdropFilter: "blur(12px)",
            zIndex: 0,
            ...highlightStyle,
          }}
        />

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="relative z-10 grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {plans.map((plan, index) => {
            const isActive = index === activeIndex;
            const Icon = iconMap[plan.name] || Zap;

            return (
              <motion.div
                key={plan.name}
                data-plan-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative rounded-[2rem] border px-7 py-8 sm:px-8 sm:py-9 flex flex-col transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#E1C37A] bg-gradient-to-b from-[#1A1A1C] via-[#151516] to-[#101011] scale-[1.02] -translate-y-1"
                    : "border-[#3B3C3E] bg-gradient-to-b from-[#1A1A1C]/80 via-[#151516]/80 to-[#101011]/80 opacity-90 hover:opacity-100 hover:-translate-y-1"
                }`}
              >
                {/* Badge for popular plan */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full gold-gradient text-xs font-semibold text-[#1A1A1C] shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${
                  plan.color === 'gold' 
                    ? 'gold-gradient' 
                    : plan.color === 'premium'
                    ? 'bg-gradient-to-br from-[#E1C37A] via-[#D6D7D8] to-[#E1C37A]'
                    : 'metallic-gradient'
                }`}>
                  <Icon className="w-7 h-7 text-[#1A1A1C]" />
                </div>

                {/* Plan Name & Description */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-[#A9AAAC] mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-[#5B5C60]">/month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-xs text-[#E1C37A] mt-1 uppercase tracking-wider">
                          Billed annually (${plan.annualPrice * 12}/year)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-white">Custom</span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.color === 'gold' || plan.color === 'premium'
                          ? 'bg-[#1D170C]'
                          : 'bg-[#2A2A2C]'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.color === 'gold' || plan.color === 'premium'
                            ? 'text-[#E1C37A]'
                            : 'text-[#D6D7D8]'
                        }`} />
                      </div>
                      <span className="text-sm text-[#D6D7D8]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  {hasPlan(plan.name) ? (
                    <Link
                      to={createPageUrl("Account")}
                      className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                        isActive ? 'btn-gold' : 'btn-outline hover:bg-[#3B3C3E]'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      Current Plan
                    </Link>
                  ) : plan.contactSales ? (
                    <Link
                      to={createPageUrl("Contact")}
                      className="w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 btn-outline hover:border-[#E1C37A] hover:text-[#E1C37A]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {plan.cta}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => onSubscribe(plan.name)}
                      disabled={loadingPlan === plan.name}
                      className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isActive
                          ? 'btn-gold'
                          : 'bg-[#2A2112] text-[#E1C37A] hover:bg-[#E1C37A] hover:text-[#1A1A1C]'
                      } disabled:opacity-50`}
                    >
                      {loadingPlan === plan.name ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        plan.cta
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}