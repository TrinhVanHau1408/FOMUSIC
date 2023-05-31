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
import playlistsReducer from './slices/playlistsSlice';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
// })

const store = configureStore({
  reducer:
  {
    auth: authReducer,
    user: userReducer,
    playlists: playlistsReducer
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