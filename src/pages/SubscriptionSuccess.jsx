import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import SubscriptionSuccessModal from "../components/subscription/SubscriptionSuccessModal";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifySubscription = async () => {
      // Check if we already processed this success
      const alreadyProcessed = sessionStorage.getItem("subscription_success_processed");
      if (alreadyProcessed) {
        navigate(createPageUrl("DashboardPreview"), { replace: true });
        return;
      }

      try {
        // Get plan from URL params
        const params = new URLSearchParams(window.location.search);
        const planFromUrl = params.get("plan");
        
        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Fetch user to verify subscription
        const user = await base44.auth.me();
        
        if (user && (user.subscription_status === "active" || user.subscription_plan !== "none")) {
          setPlanName(planFromUrl || user.subscription_plan);
          setIsVerifying(false);
          setShowModal(true);
          
          // Mark as just subscribed for welcome modal
          sessionStorage.setItem("just_subscribed", "true");
          sessionStorage.setItem("subscription_success_processed", "true");
        } else {
          // Subscription not yet active, wait a bit more
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Try again
          const updatedUser = await base44.auth.me();
          if (updatedUser && updatedUser.subscription_status === "active") {
            setPlanName(planFromUrl || updatedUser.subscription_plan);
            setIsVerifying(false);
            setShowModal(true);
            sessionStorage.setItem("just_subscribed", "true");
            sessionStorage.setItem("subscription_success_processed", "true");
          } else {
            // Still not active, but proceed anyway with URL plan
            setPlanName(planFromUrl || "");
            setIsVerifying(false);
            setShowModal(true);
            sessionStorage.setItem("just_subscribed", "true");
            sessionStorage.setItem("subscription_success_processed", "true");
          }
        }
      } catch (error) {
        console.error("Error verifying subscription:", error);
        // Proceed anyway
        const params = new URLSearchParams(window.location.search);
        setPlanName(params.get("plan") || "");
        setIsVerifying(false);
        setShowModal(true);
      }
    };

    verifySubscription();
  }, [navigate]);

  const handleRedirect = () => {
    setShowModal(false);
    navigate(createPageUrl("DashboardPreview"), { replace: true });
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      {isVerifying ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-[#E1C37A] mx-auto mb-4" />
          <p className="text-[#A9AAAC]">Setting up your account...</p>
        </motion.div>
      ) : (
        <SubscriptionSuccessModal
          isOpen={showModal}
          planName={planName}
          onRedirect={handleRedirect}
        />
      )}
    </div>
  );
}