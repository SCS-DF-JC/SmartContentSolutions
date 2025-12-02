import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { getToolBySlug } from "../components/tools/toolsConfig";
import ToolPageTemplate from "../components/tools/ToolPageTemplate";

export default function Tool() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    // Redirect to dashboard if tool not found
    return <Navigate to={createPageUrl("DashboardPreview")} replace />;
  }

  return <ToolPageTemplate tool={tool} />;
}