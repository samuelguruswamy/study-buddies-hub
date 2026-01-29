import { ReactNode, forwardRef } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="skip-link"
        tabIndex={0}
      >
        Skip to main content
      </a>
      
      <Navigation />
      <main id="main-content" className="flex-1 pt-16" role="main" aria-label="Main content">
        {children}
      </main>
      <Footer />
      
      {/* Floating Accessibility Panel */}
      <AccessibilityPanel />
    </div>
  );
}
