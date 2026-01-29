import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  
  const [userId, setUserId] = useState<string | null>(null);

  // Sync settings to database when user is logged in
  const syncSettingsToDb = useCallback(async (newSettings: AccessibilitySettings, uid: string) => {
    try {
      await supabase
        .from("user_settings")
        .update({
          dark_mode: newSettings.darkMode,
          colorblind_mode: newSettings.colorblindMode,
          high_contrast: newSettings.highContrast,
          large_text: newSettings.largeText,
          reduced_motion: newSettings.reducedMotion,
          keyboard_focus: newSettings.keyboardFocus,
        })
        .eq("user_id", uid);
    } catch (error) {
      console.error("Error syncing settings to database:", error);
    }
  }, []);

  // Load settings from database when user logs in
  const loadSettingsFromDb = useCallback(async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) {
        console.error("Error loading settings:", error);
        return;
      }

      if (data) {
        const dbSettings: AccessibilitySettings = {
          darkMode: data.dark_mode ?? false,
          colorblindMode: data.colorblind_mode ?? false,
          highContrast: data.high_contrast ?? false,
          largeText: data.large_text ?? false,
          reducedMotion: data.reduced_motion ?? false,
          keyboardFocus: data.keyboard_focus ?? true,
        };
        setSettings(dbSettings);
        localStorage.setItem("accessibility-settings", JSON.stringify(dbSettings));
      }
    } catch (error) {
      console.error("Error loading settings from database:", error);
    }
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const uid = session?.user?.id ?? null;
        setUserId(uid);

        if (uid && event === "SIGNED_IN") {
          // Small delay to ensure the trigger has created the settings row
          setTimeout(() => loadSettingsFromDb(uid), 200);
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        loadSettingsFromDb(uid);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadSettingsFromDb]);

  // Apply all settings to document and sync
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

    // Sync to database if user is logged in
    if (userId) {
      syncSettingsToDb(settings, userId);
    }
  }, [settings, userId, syncSettingsToDb]);

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
