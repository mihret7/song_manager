import { useEffect, useMemo, useState } from "react";
import {
  Card,
  GlassInput,
  Row,
  Box,
  PrimaryButton,
  AccentButton,
} from "@/styles/system";
import { theme } from "@/styles/theme";
import type { CreateSongDto } from "@/features/songs/types";
import type { Song } from "@/features/songs/types";
import { useAppSelector } from "@/store/hooks";
import { selectSongsError } from "@/features/songs/selectors";

interface Props {
  onSubmit: (payload: CreateSongDto) => void;
  editing?: Song | null;
  onCancelEdit?: () => void;
}

const empty: CreateSongDto = { title: "", artist: "", album: "", genre: "" };

export default function SongForm({ onSubmit, editing, onCancelEdit }: Props) {
  const [form, setForm] = useState<CreateSongDto>(empty);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const error = useAppSelector(selectSongsError);

  // Reset form when editing changes
  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        artist: editing.artist,
        album: editing.album,
        genre: editing.genre,
      });
      setShowSuccess(false);
      setIsSubmitting(false);
    } else {
      // Only clear form if we were previously editing or if we just submitted successfully
      if (isSubmitting) {
        setForm(empty);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setIsSubmitting(false);
      }
    }
  }, [editing, isSubmitting]);

  const isValid = useMemo(
    () => Object.values(form).every((v) => v.trim().length > 0),
    [form]
  );

  function handleChange<K extends keyof CreateSongDto>(
    key: K,
    value: CreateSongDto[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    onSubmit(form);

    // Don't clear form immediately - let the parent component handle it
    // The form will be cleared when editing changes to null (successful submission)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
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
            {editing ? "✏️ Edit Song" : "🎵 Add New Song"}
          </Box>
          <Box color="textSecondary" fontSize="lg" fontWeight="medium">
            {editing
              ? "Update your song information with precision"
              : "Add a new masterpiece to your collection"}
          </Box>
        </Box>

        {/* Form Fields */}
        {showSuccess && (
          <Box
            mb={6}
            p={4}
            background="rgba(34, 197, 94, 0.1)"
            border={`2px solid ${theme.colors.success}`}
            borderRadius={theme.radii.xl}
            color="success"
            fontSize="base"
          >
            <Box fontWeight="bold" mb={2} fontSize="lg">
              ✅ Success!
            </Box>
            <Box>Song created successfully!</Box>
          </Box>
        )}

        {error && (
          <Box
            mb={6}
            p={4}
            background="rgba(239, 68, 68, 0.1)"
            border={`2px solid ${theme.colors.error}`}
            borderRadius={theme.radii.xl}
            color="error"
            fontSize="base"
          >
            <Box fontWeight="bold" mb={2} fontSize="lg">
              ❌ Error
            </Box>
            <Box>{error}</Box>
          </Box>
        )}

        <Row
          display="grid"
          gridGap={6}
          gridTemplateColumns="repeat(2, 1fr)"
          mb={8}
          sx={{
            "@media (max-width: 768px)": {
              gridTemplateColumns: "1fr",
              gridGap: 5,
            },
          }}
        >
          <Box>
            <Box
              as="label"
              display="block"
              mb={3}
              color="textSecondary"
              fontSize="base"
              fontWeight="semibold"
            >
              🎼 Song Title
            </Box>
            <GlassInput
              placeholder="Enter song title..."
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("title", e.target.value)
              }
              width="100%"
              fontSize="lg"
            />
          </Box>

          <Box>
            <Box
              as="label"
              display="block"
              mb={3}
              color="textSecondary"
              fontSize="base"
              fontWeight="semibold"
            >
              🎤 Artist
            </Box>
            <GlassInput
              placeholder="Enter artist name..."
              value={form.artist}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("artist", e.target.value)
              }
              width="100%"
              fontSize="lg"
            />
          </Box>

          <Box>
            <Box
              as="label"
              display="block"
              mb={3}
              color="textSecondary"
              fontSize="base"
              fontWeight="semibold"
            >
              💿 Album
            </Box>
            <GlassInput
              placeholder="Enter album name..."
              value={form.album}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("album", e.target.value)
              }
              width="100%"
              fontSize="lg"
            />
          </Box>

          <Box>
            <Box
              as="label"
              display="block"
              mb={3}
              color="textSecondary"
              fontSize="base"
              fontWeight="semibold"
            >
              🎼 Genre
            </Box>
            <GlassInput
              placeholder="Enter genre..."
              value={form.genre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("genre", e.target.value)
              }
              width="100%"
              fontSize="lg"
            />
          </Box>
        </Row>

        {/* Action Buttons */}
        <Row display="flex" gap={5} alignItems="center" flexWrap="wrap">
          <PrimaryButton
            type="submit"
            disabled={!isValid}
            opacity={isValid ? 1 : 0.6}
            cursor={isValid ? "pointer" : "not-allowed"}
            fontSize="lg"
            px={6}
            py={3}
          >
            {editing ? "🔄 Update Song" : "✨ Add Song"}
          </PrimaryButton>

          {editing && onCancelEdit && (
            <AccentButton
              type="button"
              onClick={onCancelEdit}
              fontSize="lg"
              px={6}
              py={3}
            >
              ❌ Cancel
            </AccentButton>
          )}

          {!isValid && (
            <Box
              color="warning"
              fontSize="base"
              display="flex"
              alignItems="center"
              gap={3}
              px={4}
              py={2}
              background="rgba(245, 158, 11, 0.1)"
              border={`1px solid ${theme.colors.warning}`}
              borderRadius={theme.radii.lg}
            >
              <Box fontSize="xl">⚠️</Box>
              Please fill in all fields to continue
            </Box>
          )}
        </Row>

        {/* Form Status */}
        {editing && (
          <Box
            mt={6}
            p={4}
            background="rgba(59, 130, 246, 0.1)"
            border={`2px solid ${theme.colors.primary}`}
            borderRadius={theme.radii.xl}
            color="primary"
            fontSize="base"
          >
            <Box fontWeight="bold" mb={2} fontSize="lg">
              ✏️ Editing: {editing.title}
            </Box>
            <Box color="textSecondary">
              Make your changes and click Update Song to save
            </Box>
          </Box>
        )}
      </form>
    </Card>
  );
}
