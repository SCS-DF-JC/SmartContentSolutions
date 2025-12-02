// Subscription Plans Configuration
// IMPORTANT: After running setupStripeProducts function, update these IDs with the ones returned
// For now, these are placeholder IDs - the setup function will create real ones

export const PLANS = {
  Starter: {
    id: "starter",
    name: "Starter",
    description: "Essential AI automations for growing businesses",
    monthlyPrice: 397,
    annualPrice: 317,
    annualTotal: 3804, // $317 x 12
    stripePriceIdMonthly: "price_starter_monthly", // Update after running setupStripeProducts
    stripePriceIdAnnual: "price_starter_annual",   // Update after running setupStripeProducts
    features: [
      "Social Media Post Automation",
      "WordPress SEO Optimisation",
      "AI Email Marketing Engine",
      "Blog & SEO Content Engine",
      "Email Support"
    ],
    toolIds: [
      "social-automation",
      "wordpress-seo",
      "email-engine",
      "content-engine"
    ],
    color: "#4ADE80",
    popular: false
  },
  Growth: {
    id: "growth",
    name: "Growth",
    description: "Full automation suite for scaling operations",
    monthlyPrice: 697,
    annualPrice: 557,
    annualTotal: 6684, // $557 x 12
    stripePriceIdMonthly: "price_growth_monthly", // Update after running setupStripeProducts
    stripePriceIdAnnual: "price_growth_annual",   // Update after running setupStripeProducts
    features: [
      "Everything in Starter, plus:",
      "AI Ads Analytics Tool",
      "Lead Capture & CRM Automation",
      "Performance Reports",
      "Backlink Outreach Automation",
      "Review Generation Manager",
      "Client Onboarding Automation",
      "Competitor Monitoring",
      "Priority Support"
    ],
    toolIds: [
      // Starter tools
      "social-automation",
      "wordpress-seo",
      "email-engine",
      "content-engine",
      // Growth tools
      "ads-analytics",
      "lead-crm",
      "performance-reports",
      "backlink-automation",
      "reviews-reputation",
      "client-onboarding",
      "competitor-monitoring"
    ],
    color: "#60A5FA",
    popular: true
  },
  Enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "Enterprise-grade AI for serious operators",
    monthlyPrice: 1497,
    annualPrice: 1197,
    annualTotal: 14364, // $1197 x 12
    stripePriceIdMonthly: "price_enterprise_monthly", // Update after running setupStripeProducts
    stripePriceIdAnnual: "price_enterprise_annual",   // Update after running setupStripeProducts
    contactSales: true, // Enterprise requires contacting sales
    features: [
      "Everything in Growth, plus:",
      "MMM Analytics Edge",
      "CRM Integration (Listrak & Attentive)",
      "Review Syndication (Bazaarvoice)",
      "Website Personalization (Dynamic Yield)",
      "AI Chatbot & Analysis Systems",
      "PPC Management Suite",
      "Multi-language Translations",
      "Advanced Social Scheduling",
      "Site Optimization (ContentSquare)",
      "Paid Social Management",
      "Dedicated Success Manager"
    ],
    toolIds: [
      // All Starter & Growth tools
      "social-automation",
      "wordpress-seo",
      "email-engine",
      "content-engine",
      "ads-analytics",
      "lead-crm",
      "performance-reports",
      "backlink-automation",
      "reviews-reputation",
      "client-onboarding",
      "competitor-monitoring",
      // Enterprise/Corporate tools
      "mmm-analytics-edge",
      "crm-listrak-attentive",
      "bazaarvoice",
      "dynamic-yield",
      "ai-chatbot-skincare",
      "ppc-suite",
      "translations-suite",
      "social-screaming-frog",
      "contentsquare",
      "paid-social-suite"
    ],
    color: "#E1C37A",
    popular: false
  }
};

export const PLAN_HIERARCHY = {
  "none": 0,
  "Starter": 1,
  "Growth": 2,
  "Enterprise": 3
};

export const getPlanLevel = (planName) => PLAN_HIERARCHY[planName] || 0;

export const getPlanByName = (name) => PLANS[name] || null;

export const getAllPlans = () => Object.values(PLANS);