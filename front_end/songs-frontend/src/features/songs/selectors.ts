import { RootState } from "@/store/store";

export const selectSongs = (s: RootState) => s.songs.items;
export const selectSongsLoading = (s: RootState) => s.songs.loading;
export const selectSongsError = (s: RootState) => s.songs.error;
export const selectStats = (s: RootState) => s.songs.stats;
