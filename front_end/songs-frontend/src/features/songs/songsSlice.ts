import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Song,
  CreateSongDto,
  SongsState,
  UpdateSongDto,
  StatsSummary,
} from "./types";

const initialState: SongsState = {
  items: [],
  loading: false,
  error: undefined,
  stats: undefined,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createSong(state, action: PayloadAction<CreateSongDto>) {
      state.loading = true;
      state.error = undefined;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.items.push(action.payload);
      state.loading = false;
    },
    createSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateSong(state, action: PayloadAction<UpdateSongDto>) {
      state.loading = true;
      state.error = undefined;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.items.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSong(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = undefined;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchStats(state) {
      state.error = undefined;
    },
    fetchStatsSuccess(state, action: PayloadAction<StatsSummary>) {
      state.stats = action.payload;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
