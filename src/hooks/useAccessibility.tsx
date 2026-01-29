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

// Accessibility CSS styles
const accessibilityStyles = `
/* ====================================
   ACCESSIBILITY STYLES
   ==================================== */

:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --color-primary: #0d6efd;
  --color-primary-hover: #0b5ed7;
  --color-success: #198754;
  --color-warning: #ffc107;
  --color-danger: #dc3545;
  --color-info: #0dcaf0;
  --border-color: #dee2e6;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --focus-ring: 0 0 0 3px rgba(13, 110, 253, 0.25);
  --focus-ring-width: 3px;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --font-size-base: 16px;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --line-height-base: 1.5;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --transition-speed: 0.2s;
  --transition-easing: ease-in-out;
}

/* DARK MODE */
.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3d3d3d;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --text-muted: #6c757d;
  --color-primary: #3a8dff;
  --color-primary-hover: #5fa3ff;
  --color-success: #2dce89;
  --color-warning: #ffbe2e;
  --color-danger: #f5365c;
  --color-info: #11cdef;
  --border-color: #495057;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --focus-ring: 0 0 0 3px rgba(58, 141, 255, 0.35);
}

.dark body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.dark img {
  opacity: 0.9;
}

/* COLORBLIND MODE */
.colorblind-mode {
  --color-primary: #0077bb;
  --color-primary-hover: #005a8e;
  --color-success: #009988;
  --color-warning: #ee7733;
  --color-danger: #cc3311;
  --color-info: #33bbee;
}

.colorblind-mode.dark {
  --color-primary: #5599ff;
  --color-primary-hover: #77aaff;
  --color-success: #44ccbb;
  --color-warning: #ffaa55;
  --color-danger: #ee5544;
  --color-info: #66ddff;
}

.colorblind-mode .success-indicator::before,
.colorblind-mode [data-status="success"]::before {
  content: "✓ ";
  font-weight: bold;
}

.colorblind-mode .warning-indicator::before,
.colorblind-mode [data-status="warning"]::before {
  content: "⚠ ";
  font-weight: bold;
}

.colorblind-mode .error-indicator::before,
.colorblind-mode [data-status="error"]::before {
  content: "✗ ";
  font-weight: bold;
}

.colorblind-mode .info-indicator::before,
.colorblind-mode [data-status="info"]::before {
  content: "ℹ ";
  font-weight: bold;
}

/* HIGH CONTRAST MODE */
.high-contrast {
  --bg-primary: #ffffff;
  --bg-secondary: #f0f0f0;
  --bg-tertiary: #e0e0e0;
  --text-primary: #000000;
  --text-secondary: #333333;
  --text-muted: #666666;
  --color-primary: #0000ee;
  --color-primary-hover: #0000cc;
  --color-success: #008000;
  --color-warning: #ff8800;
  --color-danger: #cc0000;
  --color-info: #0066cc;
  --border-color: #000000;
  --shadow-sm: none;
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.high-contrast.dark {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-muted: #999999;
  --color-primary: #66b3ff;
  --color-primary-hover: #99ccff;
  --color-success: #00ff00;
  --color-warning: #ffcc00;
  --color-danger: #ff4444;
  --color-info: #66ccff;
  --border-color: #ffffff;
}

.high-contrast *,
.high-contrast *::before,
.high-contrast *::after {
  border-color: var(--border-color) !important;
}

.high-contrast a {
  text-decoration: underline;
  font-weight: var(--font-weight-medium);
}

.high-contrast button,
.high-contrast input,
.high-contrast select,
.high-contrast textarea {
  border: 2px solid var(--border-color) !important;
}

.high-contrast button:focus,
.high-contrast input:focus,
.high-contrast select:focus,
.high-contrast textarea:focus {
  outline: 3px solid var(--color-primary) !important;
  outline-offset: 2px;
}

/* LARGE TEXT MODE */
.large-text {
  --font-size-base: 18px;
  --font-size-sm: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --line-height-base: 1.6;
  --spacing-xs: 0.3rem;
  --spacing-sm: 0.6rem;
  --spacing-md: 1.2rem;
  --spacing-lg: 1.8rem;
  --spacing-xl: 2.4rem;
}

.large-text body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

.large-text h1 { font-size: 2.5rem; }
.large-text h2 { font-size: 2rem; }
.large-text h3 { font-size: 1.75rem; }
.large-text h4 { font-size: 1.5rem; }
.large-text h5 { font-size: 1.25rem; }
.large-text h6 { font-size: 1.125rem; }

.large-text button,
.large-text input,
.large-text select,
.large-text textarea {
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* REDUCED MOTION */
.reduce-motion,
.reduce-motion *,
.reduce-motion *::before,
.reduce-motion *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ENHANCED KEYBOARD FOCUS */
.keyboard-focus *:focus {
  outline: var(--focus-ring-width) solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: var(--focus-ring);
}

.keyboard-focus a:focus {
  outline: var(--focus-ring-width) solid var(--color-primary);
  outline-offset: 2px;
  text-decoration: underline;
  background-color: rgba(13, 110, 253, 0.1);
}

.keyboard-focus button:focus,
.keyboard-focus input:focus,
.keyboard-focus select:focus,
.keyboard-focus textarea:focus {
  outline: var(--focus-ring-width) solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: var(--focus-ring);
  border-color: var(--color-primary);
}

.keyboard-focus .skip-to-main {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  z-index: 9999;
  transition: top var(--transition-speed);
}

.keyboard-focus .skip-to-main:focus {
  top: 0;
}

.keyboard-focus *:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

.keyboard-focus *:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: var(--focus-ring);
}

/* COMMON STYLES */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-speed) var(--transition-easing),
              color var(--transition-speed) var(--transition-easing);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-speed) var(--transition-easing);
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-speed) var(--transition-easing);
}

button:hover {
  background-color: var(--color-primary-hover);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input,
select,
textarea {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: border-color var(--transition-speed) var(--transition-easing);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
`;

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

  // Inject accessibility styles on mount
  useEffect(() => {
    const styleId = 'accessibility-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = accessibilityStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

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