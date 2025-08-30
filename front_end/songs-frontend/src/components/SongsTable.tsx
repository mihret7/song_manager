import { useMemo, useState } from "react";
import { Card, Box, Row, GlassInput, PrimaryButton, DangerButton, Badge } from "@/styles/system";
import { theme } from "@/styles/theme";
import type { Song } from "@/features/songs/types";
import styled from "@emotion/styled";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  songs: Song[];
  loading: boolean;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

export default function SongsTable({
  songs,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    // Ensure songs is always an array
    const songsArray = Array.isArray(songs) ? songs : [];
    const q = query.trim().toLowerCase();
    
    if (!q) return songsArray;
    
    if (songsArray.length === 0) return [];
    
    return songsArray.filter((s) => {
      if (!s) return false;
      
      const title = (s.title || '').toLowerCase();
      const artist = (s.artist || '').toLowerCase();
      const album = (s.album || '').toLowerCase();
      const genre = (s.genre || '').toLowerCase();
      
      return [title, artist, album, genre].some(field => field.includes(q));
    });
  }, [songs, query]);

  return (
    <Card>
      {/* Header with Search */}
      <Row
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
        sx={{
          "@media (max-width: 768px)": {
            flexDirection: "column",
            alignItems: "stretch",
            gap: theme.space[6],
          }
        }}
      >
        <Box>
          <Box as="h3" m={0} fontSize="3xl" fontWeight="extrabold" color="text" mb={3}
               sx={{
                 background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 backgroundClip: "text",
               }}>
            🎵 Music Library
          </Box>
          <Box color="textSecondary" fontSize="lg" fontWeight="medium">
            {filtered.length} song{filtered.length !== 1 ? 's' : ''} found in your collection
          </Box>
        </Box>
        <Box position="relative" width={350}>
          <GlassInput
            placeholder="Search songs, artists, albums, or genres..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            width="100%"
            fontSize="lg"
          />
          {query && (
            <Box
              position="absolute"
              right={20}
              top="50%"
              transform="translateY(-50%)"
              color="textMuted"
              fontSize="xl"
              cursor="pointer"
              onClick={() => setQuery("")}
              title="Clear search"
              sx={{
                "&:hover": {
                  color: theme.colors.primary,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease"
              }}
            >
              ❌
            </Box>
          )}
          {!query && (
            <Box
              position="absolute"
              right={20}
              top="50%"
              transform="translateY(-50%)"
              color="textMuted"
              fontSize="xl"
            >
              🔍
            </Box>
          )}
          
          {/* Search Status */}
          {query && (
            <Box
              position="absolute"
              top="100%"
              left={0}
              right={0}
              mt={3}
              p={3}
              background={theme.colors.glass}
              border={`1px solid ${theme.colors.glassBorder}`}
              borderRadius={theme.radii.xl}
              fontSize="sm"
              color="textSecondary"
              zIndex={10}
              backdropFilter="blur(20px)"
            >
              Searching for "{query}" • {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </Box>
          )}
        </Box>
      </Row>

      {/* Table */}
      <Box
        as="div"
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": {
            height: "12px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.colors.surface,
            borderRadius: theme.radii.full,
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.colors.primaryGradient,
            borderRadius: theme.radii.full,
            "&:hover": {
              background: theme.colors.primaryGradient,
            }
          },
        }}
      >
        <Box
          as="table"
          width="100%"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 12px",
          }}
        >
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>Album</Th>
              <Th>Genre</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((song, index) => (
              <TableRow key={song._id}>
                <Td>
                  <Box fontWeight="bold" color="text" fontSize="lg">
                    {song.title}
                  </Box>
                </Td>
                <Td>
                  <Box color="textSecondary" fontSize="base" fontWeight="medium">{song.artist}</Box>
                </Td>
                <Td>
                  <Box color="textSecondary" fontSize="base" fontWeight="medium">{song.album}</Box>
                </Td>
                <Td>
                  <Badge fontSize="sm" px={3} py={1}>{song.genre}</Badge>
                </Td>
                <Td style={{ textAlign: "right" }}>
                  <Row gap={3} justifyContent="flex-end">
                    <PrimaryButton
                      size="sm"
                      onClick={() => onEdit(song)}
                      fontSize="sm"
                      px={4}
                      py={2}
                    >
                      ✏️ Edit
                    </PrimaryButton>
                    <DangerButton
                      size="sm"
                      onClick={() => onDelete(song._id)}
                      fontSize="sm"
                      px={4}
                      py={2}
                    >
                      🗑️ Delete
                    </DangerButton>
                  </Row>
                </Td>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>
                  {loading ? (
                    <LoadingSpinner message="Loading your music collection..." />
                  ) : (
                    <Box
                      textAlign="center"
                      py={12}
                      color="textMuted"
                      fontSize="xl"
                    >
                      <Box fontSize="5xl" mb={4}>🎼</Box>
                      {query ? `No songs found matching "${query}"` : "No songs found. Start by adding some music!"}
                    </Box>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Box>
      </Box>
    </Card>
  );
}

// Enhanced Table Header
function Th({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return (
    <Box
      as="th"
      textAlign="left"
      py={20}
      px={20}
      color="textSecondary"
      fontSize="sm"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.1em"
      borderBottom={`3px solid ${theme.colors.border}`}
      {...props}
    >
      {children}
    </Box>
  );
}

// Enhanced Table Row with hover effects
const TableRow = styled("tr")(
  {
    transition: `all ${theme.transitions.normal}`,
    "&:hover": {
      transform: "translateX(12px)",
      "& td": {
        background: theme.colors.surfaceHover,
        boxShadow: theme.colors.shadowGlow,
      },
    },
  }
);

// Enhanced Table Cell
function Td({
  children,
  colSpan,
  ...props
}: {
  children: React.ReactNode;
  colSpan?: number;
  [key: string]: any;
}) {
  return (
    <Box
      as="td"
      py={20}
      px={20}
      fontSize="base"
      colSpan={colSpan}
      background={theme.colors.surface}
      borderBottom={`1px solid ${theme.colors.border}`}
      transition={`all ${theme.transitions.normal}`}
      {...props}
    >
      {children}
    </Box>
  );
}
