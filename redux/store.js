import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import userHistoryReducer from './slices/historySlice';
import playlistsReducer from './slices/playlistsSlice';
import artistSlice from './slices/artistSlice';
import albumSlice from './slices/albumSlice';  


// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
// })

const store = configureStore({
  reducer:
  {
    auth: authReducer,
    user: userReducer,
    userHistory: userHistoryReducer,
    playlists: playlistsReducer,
    artist: artistSlice,
    album: albumSlice,
  }
,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false

    //{
    // Ignore these action types
    // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // // Ignore these field paths in all actions
    // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    // // Ignore these paths in the state
    // ignoredPaths: ['items.dates'],
    //},
  }),
});

export default store;