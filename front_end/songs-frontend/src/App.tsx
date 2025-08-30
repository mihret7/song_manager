import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Layout from "@/components/layout";
import { Box, Row, HeroCard, Badge, Divider } from "@/styles/system";
import SongForm from "@/components/SongForm";
import SongsTable from "@/components/SongsTable";
import StatsPanel from "@/components/StatsPanel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createSong,
  deleteSong,
  fetchSongs,
  fetchStats,
  updateSong,
} from "@/features/songs/songsSlice";
import { CreateSongDto, Song } from "@/features/songs/types";
import {
  selectSongs,
  selectSongsLoading,
  selectStats,
} from "@/features/songs/selectors";
import "./App.css";

function AppInner() {
  const dispatch = useAppDispatch();
  const songs = useAppSelector(selectSongs);
  const loading = useAppSelector(selectSongsLoading);
  const stats = useAppSelector(selectStats);

  const [editing, setEditing] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchStats());
  }, [dispatch]);

  const handleCreate = (payload: CreateSongDto) => {
    dispatch(createSong(payload));
  };

  const handleUpdate = (payload: CreateSongDto) => {
    if (!editing) return;
    dispatch(updateSong({ id: editing._id, changes: payload }));
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this song?")) return;
    dispatch(deleteSong(id));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <HeroCard mb={10} textAlign="center">
        <Box
          as="h1"
          fontSize="6xl"
          fontWeight="black"
          mb={6}
          color="text"
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          🎵 Songs Manager
        </Box>
        <Box fontSize="xl" color="textSecondary" mb={6} fontWeight="medium">
          Organize your music collection with unparalleled style and
          sophistication
        </Box>
        <Row justifyContent="center" gap={4} flexWrap="wrap">
          <Badge fontSize="lg" px={4} py={2}>
            🎼 Total Songs: {songs?.length || 0}
          </Badge>
          {stats && (
            <>
              <Badge fontSize="lg" px={4} py={2}>
                🎤 Artists: {stats.totalArtists}
              </Badge>
              <Badge fontSize="lg" px={4} py={2}>
                💿 Albums: {stats.totalAlbums}
              </Badge>
              <Badge fontSize="lg" px={4} py={2}>
                🎼 Genres: {stats.totalGenres}
              </Badge>
            </>
          )}
        </Row>
      </HeroCard>

      {/* Main Content Grid */}
      <Row
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={8}
        mb={10}
        sx={{
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
            gap: 6,
          },
        }}
      >
        <SongForm
          onSubmit={editing ? handleUpdate : handleCreate}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />
        <StatsPanel stats={stats} />
      </Row>

      <Divider />

      {/* Songs Table Section */}
      <Box>
        <Box
          as="h2"
          fontSize="4xl"
          fontWeight="extrabold"
          mb={8}
          color="text"
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🎼 Your Music Collection
        </Box>
        <SongsTable
          songs={songs}
          loading={loading}
          onEdit={(s) => setEditing(s)}
          onDelete={handleDelete}
        />
      </Box>
    </Layout>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
