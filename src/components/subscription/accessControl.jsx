import { PLAN_HIERARCHY, PLANS } from "./plansConfig";

/**
 * Check if user has a specific plan or higher
 */
export const hasPlan = (user, requiredPlan) => {
  if (!user) return false;
  
  const userPlanLevel = PLAN_HIERARCHY[user.subscription_plan] || 0;
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan] || 0;
  
  // Also check subscription status
  const isActive = user.subscription_status === "active" || user.subscription_status === "past_due";
  
  return isActive && userPlanLevel >= requiredPlanLevel;
};

/**
 * Check if user has access to a specific tool
 */
export const hasAccessToTool = (user, toolPlanRequired) => {
  if (!user) return false;
  return hasPlan(user, toolPlanRequired);
};

/**
 * Get the user's current plan details
 */
export const getUserPlanDetails = (user) => {
  if (!user || !user.subscription_plan || user.subscription_plan === "none") {
    return null;
  }
  return PLANS[user.subscription_plan] || null;
};

/**
 * Check if subscription is active
 */
export const isSubscriptionActive = (user) => {
  if (!user) return false;
  return user.subscription_status === "active" || user.subscription_status === "past_due";
};

/**
 * Get required plan for a tool
 */
export const getRequiredPlanForTool = (toolPlanRequired) => {
  return PLANS[toolPlanRequired] || null;
};

/**
 * Get upgrade path for user
 */
export const getUpgradePath = (currentPlan, targetPlan) => {
  const currentLevel = PLAN_HIERARCHY[currentPlan] || 0;
  const targetLevel = PLAN_HIERARCHY[targetPlan] || 0;
  
  if (targetLevel <= currentLevel) return null;
  
  return PLANS[targetPlan];
};

/**
 * Get all tools user has access to based on their plan
 */
export const getAccessibleToolIds = (user) => {
  if (!user || !isSubscriptionActive(user)) return [];
  
  const plan = PLANS[user.subscription_plan];
  if (!plan) return [];
  
  return plan.toolIds || [];
};