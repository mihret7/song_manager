import { ThemeProvider } from "@emotion/react";
import type { ReactNode } from "react";
import { Box } from "@/styles/system";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

// Advanced animated background with multiple layers
const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.gradientHero};
    opacity: 0.08;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: ${theme.colors.gradientAccent};
    opacity: 0.04;
    transform: translate(-50%, -50%);
    animation: rotate 80s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

// Particle system for dynamic background
const Particle = styled.div<{
  delay: number;
  left: number;
  size: number;
  duration: number;
}>`
  position: absolute;
  left: ${(props) => props.left}%;
  top: -20px;
  font-size: ${(props) => props.size}px;
  opacity: 0.4;
  animation: float ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-30px) rotate(180deg) scale(1.2);
      opacity: 0.8;
    }
  }
`;

// Gradient overlay for depth
const GradientOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
`;

// Floating action elements
const FloatingElement = styled.div<{
  delay: number;
  left: number;
  top: number;
  size: number;
}>`
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  font-size: ${(props) => props.size}px;
  opacity: 0.2;
  animation: floatElement 12s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  @keyframes floatElement {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg) scale(1);
      opacity: 0.2;
    }
    33% {
      transform: translateY(-20px) rotate(120deg) scale(1.1);
      opacity: 0.4;
    }
    66% {
      transform: translateY(-10px) rotate(240deg) scale(0.9);
      opacity: 0.3;
    }
  }
`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bg="bg" color="text" position="relative">
        {/* Advanced Animated Background */}
        <AnimatedBackground />
        <GradientOverlay />

        {/* Dynamic Particle System */}
        <Particle delay={0} left={10} size={24} duration={8}>
          🎵
        </Particle>
        <Particle delay={2} left={20} size={32} duration={10}>
          🎼
        </Particle>
        <Particle delay={4} left={80} size={28} duration={9}>
          🎤
        </Particle>
        <Particle delay={6} left={90} size={20} duration={7}>
          💿
        </Particle>
        <Particle delay={1} left={70} size={36} duration={11}>
          🎹
        </Particle>
        <Particle delay={3} left={30} size={24} duration={8}>
          🎸
        </Particle>
        <Particle delay={5} left={60} size={32} duration={10}>
          🥁
        </Particle>

        {/* Floating Background Elements */}
        <FloatingElement delay={0} left={15} top={20} size={40}>
          ✨
        </FloatingElement>
        <FloatingElement delay={3} left={85} top={30} size={30}>
          🌟
        </FloatingElement>
        <FloatingElement delay={6} left={25} top={70} size={35}>
          💫
        </FloatingElement>
        <FloatingElement delay={9} left={75} top={80} size={25}>
          ⭐
        </FloatingElement>

        {/* Main Content */}
        <Box
          p={8}
          position="relative"
          zIndex={1}
          sx={{
            "@media (max-width: 768px)": {
              p: 6,
            },
            "@media (max-width: 480px)": {
              p: 4,
            },
          }}
        >
          <Box
            maxWidth={1400}
            mx="auto"
            sx={{
              "@media (max-width: 1400px)": {
                maxWidth: "100%",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
