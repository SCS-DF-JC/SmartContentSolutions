import { useState, useEffect, createContext, useContext } from "react";
import { base44 } from "@/api/base44Client";
import { hasPlan, hasAccessToTool, isSubscriptionActive, getUserPlanDetails } from "./accessControl";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const refreshUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    refreshUser,
    
    // Convenience methods
    hasPlan: (requiredPlan) => hasPlan(user, requiredPlan),
    hasAccessToTool: (toolPlanRequired) => hasAccessToTool(user, toolPlanRequired),
    isSubscriptionActive: () => isSubscriptionActive(user),
    getPlanDetails: () => getUserPlanDetails(user),
    
    // Auth actions
    login: (nextUrl) => base44.auth.redirectToLogin(nextUrl),
    logout: (redirectUrl) => base44.auth.logout(redirectUrl)
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    // Return default values if used outside provider
    return {
      user: null,
      loading: true,
      isAuthenticated: false,
      hasPlan: () => false,
      hasAccessToTool: () => false,
      isSubscriptionActive: () => false,
      getPlanDetails: () => null,
      login: () => {},
      logout: () => {},
      refreshUser: () => {}
    };
  }
  return context;
}