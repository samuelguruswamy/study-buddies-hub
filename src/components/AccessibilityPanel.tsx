import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAccessibility } from "@/hooks/useAccessibility";
import {
  Accessibility,
  X,
  Eye,
  Type,
  MousePointer2,
  Sparkles,
  RotateCcw,
  Contrast,
  Palette,
} from "lucide-react";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleColorblindMode,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleKeyboardFocus,
    resetSettings,
  } = useAccessibility();

  const accessibilityOptions = [
    {
      id: "colorblind",
      label: "Colorblind Friendly",
      description: "Use colors that are distinguishable for colorblind users",
      icon: Palette,
      checked: settings.colorblindMode,
      onChange: toggleColorblindMode,
    },
    {
      id: "highContrast",
      label: "High Contrast",
      description: "Increase contrast between text and background",
      icon: Contrast,
      checked: settings.highContrast,
      onChange: toggleHighContrast,
    },
    {
      id: "largeText",
      label: "Larger Text",
      description: "Increase font size for better readability",
      icon: Type,
      checked: settings.largeText,
      onChange: toggleLargeText,
    },
    {
      id: "reducedMotion",
      label: "Reduce Motion",
      description: "Minimize animations and transitions",
      icon: Sparkles,
      checked: settings.reducedMotion,
      onChange: toggleReducedMotion,
    },
    {
      id: "keyboardFocus",
      label: "Enhanced Focus",
      description: "Show visible focus indicators for keyboard navigation",
      icon: MousePointer2,
      checked: settings.keyboardFocus,
      onChange: toggleKeyboardFocus,
    },
  ];

  return (
    <>
      {/* Floating Accessibility Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="accessibility-title"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Accessibility className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 id="accessibility-title" className="text-xl font-display font-semibold text-foreground">
                        Accessibility
                      </h2>
                      <p className="text-sm text-muted-foreground">Customize your experience</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Close accessibility panel"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Vision Info */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Vision Accessibility</h3>
                      <p className="text-sm text-muted-foreground">
                        These settings help make the website more accessible for users with visual impairments or color vision deficiency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {accessibilityOptions.map((option) => (
                    <div
                      key={option.id}
                      className="p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shrink-0">
                            <option.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <label
                              htmlFor={option.id}
                              className="font-medium text-foreground cursor-pointer"
                            >
                              {option.label}
                            </label>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          id={option.id}
                          checked={option.checked}
                          onCheckedChange={option.onChange}
                          aria-describedby={`${option.id}-description`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reset Button */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetSettings}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Defaults
                  </Button>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="mt-6 p-4 rounded-2xl bg-muted/50">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <MousePointer2 className="w-4 h-4" />
                    Keyboard Navigation
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center justify-between">
                      <span>Navigate elements</span>
                      <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono">Tab</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Activate buttons</span>
                      <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono">Enter / Space</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Close dialogs</span>
                      <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono">Esc</kbd>
                    </li>
                  </ul>
                </div>

                {/* Screen Reader Info */}
                <div className="mt-4 p-4 rounded-2xl bg-success/5 border border-success/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Screen Reader Support:</strong> This website uses semantic HTML, ARIA labels, and proper heading structure for optimal screen reader compatibility.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
