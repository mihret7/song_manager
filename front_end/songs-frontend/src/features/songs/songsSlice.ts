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

    createSong(_state, _action: PayloadAction<CreateSongDto>) {},
    updateSong(_state, _action: PayloadAction<UpdateSongDto>) {},
    deleteSong(_state, _action: PayloadAction<string>) {},

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
  updateSong,
  deleteSong,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
