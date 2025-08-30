export const theme = {
  colors: {
    // Primary colors - Professional blue palette
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryDark: "#1d4ed8",
    primaryGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",

    // Secondary colors - Elegant purple
    secondary: "#8b5cf6",
    secondaryLight: "#a78bfa",
    secondaryDark: "#6d28d9",
    secondaryGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",

    // Background colors - Deep, professional dark theme
    bg: "#0a0a0a",
    bgSecondary: "#111111",
    bgTertiary: "#1a1a1a",
    surface: "#1e1e1e",
    surfaceHover: "#2a2a2a",
    surfaceLight: "#2d2d2d",

    // Text colors - High contrast, readable
    text: "#ffffff",
    textSecondary: "#e5e7eb",
    textMuted: "#9ca3af",
    textInverse: "#000000",

    // Accent colors - Vibrant but professional
    accent: "#06b6d4",
    accentLight: "#22d3ee",
    accentDark: "#0891b2",
    accentGradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",

    // Status colors - Professional and accessible
    success: "#10b981",
    successLight: "#34d399",
    warning: "#f59e0b",
    warningLight: "#fbbf24",
    error: "#ef4444",
    errorLight: "#f87171",
    info: "#3b82f6",
    infoLight: "#60a5fa",

    // Gradients - Sophisticated combinations
    gradientPrimary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientAccent: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    gradientSurface: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)",
    gradientHero:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    gradientCard: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",

    // Borders and shadows - Subtle but effective
    border: "#333333",
    borderLight: "#404040",
    borderAccent: "#3b82f6",
    shadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    shadowHover: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
    shadowCard:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadowGlow: "0 0 20px rgba(59, 130, 246, 0.3)",

    // Glass effect - Modern, sophisticated
    glass: "rgba(30, 30, 30, 0.8)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
    glassHover: "rgba(30, 30, 30, 0.9)",

    // Overlay colors
    overlay: "rgba(0, 0, 0, 0.7)",
    overlayLight: "rgba(0, 0, 0, 0.3)",
  },

  // Typography scale - Professional hierarchy
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font weights - Professional typography
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Spacing scale - Consistent rhythm
  space: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
  },

  // Border radius - Modern, consistent
  radii: {
    none: "0",
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    "3xl": "2rem", // 32px
    full: "9999px",
  },

  // Transitions - Smooth, professional
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Z-index scale - Proper layering
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints - Responsive design
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};
