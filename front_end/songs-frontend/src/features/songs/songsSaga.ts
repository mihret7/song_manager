import { call, put, takeLatest, all } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import api from "@/api/client";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  updateSong,
  deleteSong,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "./songsSlice";
import { CreateSongDto, UpdateSongDto, StatsSummary } from "./types";

function* fetchSongsWorker(): SagaIterator {
  try {
    const response = yield call(api.get, "/songs");
    const songs = response.data.items || response.data;
    yield put(fetchSongsSuccess(songs));
  } catch (err: any) {
    console.error("Saga error fetching songs:", err);
    yield put(fetchSongsFailure(err?.response?.data?.message ?? err.message));
  }
}

function* createSongWorker(action: {
  type: string;
  payload: CreateSongDto;
}): SagaIterator {
  try {
    yield call(api.post, "/songs", action.payload);
    yield put(fetchSongs());
    yield put(fetchStats());
  } catch (err: any) {
    yield put(fetchSongsFailure(err?.response?.data?.message ?? err.message));
  }
}

function* updateSongWorker(action: {
  type: string;
  payload: UpdateSongDto;
}): SagaIterator {
  try {
    const { id, changes } = action.payload;
    yield call(api.put, `/songs/${id}`, changes);
    yield put(fetchSongs());
    yield put(fetchStats());
  } catch (err: any) {
    yield put(fetchSongsFailure(err?.response?.data?.message ?? err.message));
  }
}

function* deleteSongWorker(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(api.delete, `/songs/${id}`);
    yield put(fetchSongs());
    yield put(fetchStats());
  } catch (err: any) {
    yield put(fetchSongsFailure(err?.response?.data?.message ?? err.message));
  }
}

function* fetchStatsWorker(): SagaIterator {
  try {
    const { data } = (yield call(api.get, "/stats/overview")) as {
      data: StatsSummary;
    };
    yield put(fetchStatsSuccess(data));
  } catch (err: any) {
    yield put(fetchStatsFailure(err?.response?.data?.message ?? err.message));
  }
}

export default function* songsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchSongs.type, fetchSongsWorker),
    takeLatest(createSong.type, createSongWorker),
    takeLatest(updateSong.type, updateSongWorker),
    takeLatest(deleteSong.type, deleteSongWorker),
    takeLatest(fetchStats.type, fetchStatsWorker),
  ]);
}
