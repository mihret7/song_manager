import styled from "@emotion/styled";
import { theme } from "./theme";
import {
  space,
  layout,
  color,
  typography,
  flexbox,
  border,
  shadow,
  compose,
} from "styled-system";

export const system = compose(
  space,
  layout,
  color,
  typography,
  flexbox,
  border,
  shadow
);

export const Box = styled("div")(system);
export const Row = styled("div")(system);
export const Col = styled("div")(system);

// Ultra-modern Button with advanced hover effects
export const Button = styled("button")(
  {
    cursor: "pointer",
    borderRadius: theme.radii.lg,
    border: "none",
    padding: "14px 24px",
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.base,
    transition: `all ${theme.transitions.normal}`,
    position: "relative",
    overflow: "hidden",
    letterSpacing: "0.025em",
    textTransform: "none",

    // Advanced hover effects
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      transition: "left 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    },

    "&:hover::before": {
      left: "100%",
    },

    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: theme.colors.shadowHover,
    },

    "&:active": {
      transform: "translateY(-1px)",
    },

    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 3px ${theme.colors.primary}40`,
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  },
  system
);

// Primary Button with sophisticated gradient
export const PrimaryButton = styled(Button)(
  {
    background: theme.colors.primaryGradient,
    color: theme.colors.text,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      background: theme.colors.primaryGradient,
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, ${theme.colors.shadowGlow}`,
    },

    "&:active": {
      transform: "translateY(-1px) scale(1.01)",
    },
  },
  system
);

// Secondary Button with elegant styling
export const SecondaryButton = styled(Button)(
  {
    background: theme.colors.secondaryGradient,
    color: theme.colors.text,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      background: theme.colors.secondaryGradient,
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 20px rgba(139, 92, 246, 0.3)`,
    },
  },
  system
);

// Accent Button with vibrant styling
export const AccentButton = styled(Button)(
  {
    background: theme.colors.accentGradient,
    color: theme.colors.text,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      background: theme.colors.accentGradient,
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 20px rgba(6, 182, 212, 0.3)`,
    },
  },
  system
);

// Danger Button with professional styling
export const DangerButton = styled(Button)(
  {
    background: `linear-gradient(135deg, ${theme.colors.error} 0%, ${theme.colors.errorLight} 100%)`,
    color: theme.colors.text,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      background: `linear-gradient(135deg, ${theme.colors.error} 0%, ${theme.colors.errorLight} 100%)`,
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 20px rgba(239, 68, 68, 0.3)`,
    },
  },
  system
);

// Success Button with positive styling
export const SuccessButton = styled(Button)(
  {
    background: `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.successLight} 100%)`,
    color: theme.colors.text,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      background: `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.successLight} 100%)`,
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 20px rgba(16, 185, 129, 0.3)`,
    },
  },
  system
);

// Ultra-modern Input with sophisticated focus effects
export const Input = styled("input")(
  {
    borderRadius: theme.radii.xl,
    border: `2px solid ${theme.colors.border}`,
    padding: "16px 20px",
    outline: "none",
    fontSize: theme.fontSizes.base,
    background: theme.colors.surface,
    color: theme.colors.text,
    transition: `all ${theme.transitions.normal}`,
    fontWeight: theme.fontWeights.medium,

    "&:focus": {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 4px ${theme.colors.primary}20, ${theme.colors.shadowGlow}`,
      transform: "scale(1.02)",
      background: theme.colors.surfaceLight,
    },

    "&:hover": {
      borderColor: theme.colors.borderAccent,
      background: theme.colors.surfaceHover,
    },

    "&::placeholder": {
      color: theme.colors.textMuted,
      fontWeight: theme.fontWeights.normal,
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  system
);

// Glass Input with backdrop blur
export const GlassInput = styled(Input)(
  {
    background: theme.colors.glass,
    backdropFilter: "blur(24px)",
    border: `1px solid ${theme.colors.glassBorder}`,

    "&:focus": {
      background: theme.colors.surfaceLight,
      borderColor: theme.colors.primary,
      backdropFilter: "blur(0px)",
    },

    "&:hover": {
      background: theme.colors.glassHover,
      borderColor: theme.colors.borderAccent,
    },
  },
  system
);

// Premium Card with advanced glass morphism
export const Card = styled("div")(
  {
    borderRadius: theme.radii["3xl"],
    border: `1px solid ${theme.colors.glassBorder}`,
    boxShadow: theme.colors.shadow,
    padding: theme.space[8],
    background: theme.colors.glass,
    backdropFilter: "blur(32px)",
    transition: `all ${theme.transitions.normal}`,
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.radii["3xl"],
      padding: "1px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      opacity: 0,
      transition: `opacity ${theme.transitions.normal}`,
    },

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: theme.colors.shadowHover,
      borderColor: theme.colors.primary,

      "&::before": {
        opacity: 1,
      },
    },

    "&:focus-within": {
      borderColor: theme.colors.primary,
      boxShadow: `${theme.colors.shadowHover}, ${theme.colors.shadowGlow}`,
    },
  },
  system
);

// Hero Card with stunning gradient border
export const HeroCard = styled(Card)(
  {
    background: theme.colors.gradientCard,
    border: "none",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.radii["3xl"],
      padding: "2px",
      background: theme.colors.gradientHero,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    },

    "&:hover::before": {
      background: theme.colors.gradientHero,
      filter: "brightness(1.2)",
    },
  },
  system
);

// Interactive Card with hover animations
export const InteractiveCard = styled(Card)(
  {
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 30px rgba(59, 130, 246, 0.2)`,
    },

    "&:active": {
      transform: "translateY(-4px) scale(1.01)",
    },
  },
  system
);

// Premium Badge with gradient background
export const Badge = styled("span")(
  {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: theme.radii.full,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semibold,
    background: theme.colors.primaryGradient,
    color: theme.colors.text,
    boxShadow: theme.colors.shadowCard,
    transition: `all ${theme.transitions.normal}`,
    letterSpacing: "0.025em",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: `${theme.colors.shadowCard}, 0 0 15px rgba(59, 130, 246, 0.3)`,
    },
  },
  system
);

// Accent Badge with different styling
export const AccentBadge = styled(Badge)(
  {
    background: theme.colors.accentGradient,

    "&:hover": {
      boxShadow: `${theme.colors.shadowCard}, 0 0 15px rgba(6, 182, 212, 0.3)`,
    },
  },
  system
);

// Elegant Divider with gradient
export const Divider = styled("hr")(
  {
    border: "none",
    height: "3px",
    background: theme.colors.gradientPrimary,
    margin: `${theme.space[8]} 0`,
    borderRadius: theme.radii.full,
    opacity: 0.8,
    transition: `opacity ${theme.transitions.normal}`,

    "&:hover": {
      opacity: 1,
    },
  },
  system
);

// Professional Icon Button
export const IconButton = styled(Button)(
  {
    width: "56px",
    height: "56px",
    padding: 0,
    borderRadius: theme.radii.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.colors.glass,
    border: `1px solid ${theme.colors.glassBorder}`,
    fontSize: theme.fontSizes.xl,

    "&:hover": {
      background: theme.colors.surfaceHover,
      transform: "scale(1.1) rotate(5deg)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 20px rgba(59, 130, 246, 0.2)`,
    },

    "&:active": {
      transform: "scale(1.05) rotate(2deg)",
    },
  },
  system
);

// Floating Action Button
export const FloatingButton = styled(IconButton)(
  {
    position: "fixed",
    bottom: theme.space[8],
    right: theme.space[8],
    zIndex: theme.zIndex.docked,
    background: theme.colors.primaryGradient,
    border: "none",
    boxShadow: `${theme.colors.shadow}, 0 0 20px rgba(59, 130, 246, 0.3)`,

    "&:hover": {
      background: theme.colors.primaryGradient,
      transform: "scale(1.15) rotate(10deg)",
      boxShadow: `${theme.colors.shadowHover}, 0 0 30px rgba(59, 130, 246, 0.5)`,
    },
  },
  system
);

// Professional Tooltip
export const Tooltip = styled("div")(
  {
    position: "absolute",
    background: theme.colors.surface,
    color: theme.colors.text,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    borderRadius: theme.radii.lg,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    boxShadow: theme.colors.shadow,
    border: `1px solid ${theme.colors.border}`,
    zIndex: theme.zIndex.tooltip,
    opacity: 0,
    transform: "translateY(10px)",
    transition: `all ${theme.transitions.normal}`,
    pointerEvents: "none",
    whiteSpace: "nowrap",

    "&.visible": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  system
);
