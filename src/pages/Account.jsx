import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Shield,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useSubscription } from "../components/subscription/useSubscription";
import { PLANS } from "../components/subscription/plansConfig";

export default function Account() {
  const location = useLocation();
  const { user, loading, isAuthenticated, refreshUser, logout } = useSubscription();
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("checkout") === "success") {
      setCheckoutSuccess(true);
      // Refresh user data to get updated subscription
      setTimeout(() => refreshUser(), 2000);
    }
  }, [location]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      base44.auth.redirectToLogin(createPageUrl("Account"));
    }
  }, [loading, isAuthenticated]);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const response = await base44.functions.invoke("createPortalSession", {});
      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error opening billing portal:", error);
      alert("Unable to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E1C37A]" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const currentPlan = PLANS[user.subscription_plan];
  const isActive = user.subscription_status === "active";
  const isPastDue = user.subscription_status === "past_due";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Banner */}
        {checkoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center gap-4"
          >
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-400">Welcome aboard!</h3>
              <p className="text-sm text-green-400/80">Your subscription is now active. Enjoy your new tools!</p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-[#A9AAAC]">Manage your subscription and account details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center">
                <User className="w-8 h-8 text-[#1A1A1C]" />
              </div>
              <div>
                <h2 className="font-semibold text-white">{user.full_name}</h2>
                <p className="text-sm text-[#A9AAAC]">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="w-full btn-outline py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>

          {/* Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Subscription</h3>
                <p className="text-sm text-[#A9AAAC]">Your current plan and billing</p>
              </div>
              {currentPlan && (
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${currentPlan.color}20`,
                    color: currentPlan.color
                  }}
                >
                  {currentPlan.name}
                </span>
              )}
            </div>

            {currentPlan && isActive ? (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#1A1A1C]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-[#A9AAAC]">Status</span>
                    </div>
                    <span className="text-white font-medium">Active</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1A1A1C]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#A9AAAC]" />
                      <span className="text-sm text-[#A9AAAC]">Renews</span>
                    </div>
                    <span className="text-white font-medium">
                      {user.subscription_period_end 
                        ? new Date(user.subscription_period_end).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleManageBilling}
                    disabled={portalLoading}
                    className="btn-gold px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CreditCard className="w-4 h-4" />
                    )}
                    Manage Billing
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <Link
                    to={createPageUrl("Pricing")}
                    className="btn-outline px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Upgrade Plan
                  </Link>
                </div>
              </>
            ) : isPastDue ? (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-400 mb-1">Payment Past Due</h4>
                    <p className="text-sm text-yellow-400/80 mb-4">
                      Your payment failed. Please update your payment method to keep your access.
                    </p>
                    <button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="btn-gold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                      Update Payment Method
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3B3C3E]/50 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#5B5C60]" />
                </div>
                <h4 className="font-semibold text-white mb-2">No Active Subscription</h4>
                <p className="text-sm text-[#A9AAAC] mb-6">
                  Subscribe to unlock powerful AI automation tools
                </p>
                <Link
                  to={createPageUrl("Pricing")}
                  className="btn-gold px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Access */}
        {currentPlan && isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Your Plan Includes</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-[#D6D7D8]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center gap-3 text-sm text-[#5B5C60]"
        >
          <Shield className="w-4 h-4" />
          <span>Your payment information is securely handled by Stripe. We never store your card details.</span>
        </motion.div>
      </div>
    </div>
  );
}