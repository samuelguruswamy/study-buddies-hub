import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilitySettings {
  colorblindMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  keyboardFocus: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleColorblindMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleKeyboardFocus: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  colorblindMode: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  keyboardFocus: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    
    // Apply classes to document
    const root = document.documentElement;
    
    // Colorblind mode
    root.classList.toggle("colorblind-mode", settings.colorblindMode);
    
    // High contrast mode
    root.classList.toggle("high-contrast", settings.highContrast);
    
    // Large text mode
    root.classList.toggle("large-text", settings.largeText);
    
    // Reduced motion
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    
    // Enhanced keyboard focus
    root.classList.toggle("keyboard-focus", settings.keyboardFocus);
  }, [settings]);

  // Detect system preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && !settings.reducedMotion) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  const toggleColorblindMode = () => {
    setSettings(prev => ({ ...prev, colorblindMode: !prev.colorblindMode }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setSettings(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleKeyboardFocus = () => {
    setSettings(prev => ({ ...prev, keyboardFocus: !prev.keyboardFocus }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleColorblindMode,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
        toggleKeyboardFocus,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
