import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilitySettings {
  colorblindMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  keyboardFocus: boolean;
  darkMode: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleColorblindMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleKeyboardFocus: () => void;
  toggleDarkMode: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  colorblindMode: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  keyboardFocus: true,
  darkMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return defaultSettings;
    
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    
    // Check system preference for dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return { ...defaultSettings, darkMode: prefersDark };
  });

  // Apply all settings to document
  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    
    const root = document.documentElement;
    
    // Dark mode
    root.classList.toggle("dark", settings.darkMode);
    
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

  // Detect system preference for reduced motion on mount
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
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

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
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
        toggleDarkMode,
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
