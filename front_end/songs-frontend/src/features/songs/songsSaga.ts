import { call, put, takeLatest, all } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import api from "@/api/client";
import {
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
    const response = yield call(api.post, "/songs", action.payload);
    const newSong = response.data;
    yield put(createSongSuccess(newSong));
    yield put(fetchStats());
  } catch (err: any) {
    yield put(createSongFailure(err?.response?.data?.message ?? err.message));
  }
}

function* updateSongWorker(action: {
  type: string;
  payload: UpdateSongDto;
}): SagaIterator {
  try {
    const { id, changes } = action.payload;
    const response = yield call(api.patch, `/songs/${id}`, changes);
    const updatedSong = response.data;
    yield put(updateSongSuccess(updatedSong));
    yield put(fetchStats());
  } catch (err: any) {
    yield put(updateSongFailure(err?.response?.data?.message ?? err.message));
  }
}

function* deleteSongWorker(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(api.delete, `/songs/${id}`);
    yield put(deleteSongSuccess(id));
    yield put(fetchStats());
  } catch (err: any) {
    yield put(deleteSongFailure(err?.response?.data?.message ?? err.message));
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
  console.log("Saga: songsSaga initialized");
  yield all([
    takeLatest(fetchSongs.type, fetchSongsWorker),
    takeLatest(createSong.type, createSongWorker),
    takeLatest(updateSong.type, updateSongWorker),
    takeLatest(deleteSong.type, deleteSongWorker),
    takeLatest(fetchStats.type, fetchStatsWorker),
  ]);
}
