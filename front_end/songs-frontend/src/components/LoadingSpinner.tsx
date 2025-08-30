import { Box } from "@/styles/system";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.space[8]};
  text-align: center;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.glassBorder};
  border-top: 4px solid ${theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${theme.space[4]};
`;

const MusicNote = styled.div<{ delay: number }>`
  font-size: 24px;
  animation: ${bounce} 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  margin: 0 4px;
`;

const LoadingText = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.lg};
  font-weight: 500;
  margin-top: ${theme.space[4]};
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.full};
  overflow: hidden;
  margin-top: ${theme.space[4]};

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 30%;
    background: ${theme.colors.gradientAccent};
    border-radius: ${theme.radii.full};
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

interface LoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
}

export default function LoadingSpinner({
  message = "Loading your music collection...",
  showProgress = true,
}: LoadingSpinnerProps) {
  return (
    <LoadingContainer>
      <Spinner />

      <Box display="flex" gap={2} mb={3}>
        <MusicNote delay={0}>🎵</MusicNote>
        <MusicNote delay={0.2}>🎼</MusicNote>
        <MusicNote delay={0.4}>🎤</MusicNote>
        <MusicNote delay={0.6}>💿</MusicNote>
      </Box>

      <LoadingText>{message}</LoadingText>

      {showProgress && <ProgressBar />}
    </LoadingContainer>
  );
}
