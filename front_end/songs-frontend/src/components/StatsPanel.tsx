import { useMemo } from "react";
import { Card, Box, Row } from "@/styles/system";
import { theme } from "@/styles/theme";
import { StatsSummary } from "@/features/songs/types";

export default function StatsPanel({ stats }: { stats?: StatsSummary }) {
  const entries = useMemo(() => {
    if (!stats)
      return [] as Array<{
        label: string;
        value: number;
        icon: string;
        color: string;
        gradient: string;
      }>;
    return [
      {
        label: "Total Songs",
        value: stats.totalSongs,
        icon: "🎵",
        color: theme.colors.primary,
        gradient: theme.colors.primaryGradient,
      },
      {
        label: "Artists",
        value: stats.totalArtists,
        icon: "🎤",
        color: theme.colors.accent,
        gradient: theme.colors.accentGradient,
      },
      {
        label: "Albums",
        value: stats.totalAlbums,
        icon: "💿",
        color: theme.colors.success,
        gradient: `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.successLight} 100%)`,
      },
      {
        label: "Genres",
        value: stats.totalGenres,
        icon: "🎼",
        color: theme.colors.warning,
        gradient: `linear-gradient(135deg, ${theme.colors.warning} 0%, ${theme.colors.warningLight} 100%)`,
      },
    ];
  }, [stats]);

  return (
    <Card>
      {/* Header */}
      <Box mb={8}>
        <Box
          as="h3"
          fontSize="3xl"
          fontWeight="extrabold"
          color="text"
          mb={3}
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          📊 Collection Overview
        </Box>
        <Box color="textSecondary" fontSize="lg" fontWeight="medium">
          Your music library statistics at a glance
        </Box>
      </Box>

      {/* Stats Grid */}
      <Row
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridGap={6}
        mb={8}
        sx={{
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
            gridGap: 5,
          },
        }}
      >
        {entries.map((entry) => (
          <StatCard key={entry.label} {...entry} />
        ))}
      </Row>

      {/* Summary */}
      {stats && (
        <Box
          mt={8}
          p={6}
          background="rgba(6, 182, 212, 0.1)"
          border={`2px solid ${theme.colors.accent}`}
          borderRadius={theme.radii.xl}
          textAlign="center"
          position="relative"
          overflow="hidden"
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)",
              zIndex: -1,
            },
          }}
        >
          <Box fontSize="2xl" color="accent" fontWeight="bold" mb={3}>
            🎉 Great Collection!
          </Box>
          <Box color="textSecondary" fontSize="lg" fontWeight="medium">
            You have {stats.totalSongs} songs across {stats.totalGenres}{" "}
            different genres
          </Box>
        </Box>
      )}

      {!stats && (
        <Box textAlign="center" py={12} color="textMuted">
          <Box fontSize="5xl" mb={4}>
            📈
          </Box>
          <Box fontSize="2xl" mb={3} fontWeight="bold">
            No statistics yet
          </Box>
          <Box fontSize="lg">Add some songs to see your collection stats</Box>
        </Box>
      )}
    </Card>
  );
}

// Enhanced Stat Card with professional styling
function StatCard({
  label,
  value,
  icon,
  color,
  gradient,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
  gradient: string;
}) {
  return (
    <Box
      p={6}
      background={theme.colors.glass}
      border={`2px solid ${theme.colors.glassBorder}`}
      borderRadius={theme.radii["2xl"]}
      textAlign="center"
      transition={`all ${theme.transitions.normal}`}
      position="relative"
      overflow="hidden"
      sx={{
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradient,
          opacity: 0.1,
          zIndex: -1,
        },

        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `${theme.colors.shadowHover}, 0 0 30px ${color}20`,
          borderColor: color,

          "& .stat-icon": {
            transform: "scale(1.2) rotate(10deg)",
          },

          "& .stat-value": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box
        className="stat-icon"
        fontSize="4xl"
        mb={4}
        transition={`transform ${theme.transitions.normal}`}
      >
        {icon}
      </Box>
      <Box
        className="stat-value"
        fontSize="3xl"
        fontWeight="black"
        color="text"
        mb={2}
        transition={`transform ${theme.transitions.normal}`}
      >
        {value}
      </Box>
      <Box color="textSecondary" fontSize="base" fontWeight="semibold">
        {label}
      </Box>
    </Box>
  );
}
