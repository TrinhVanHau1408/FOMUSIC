import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';

// Lấy tất cả các playlist của user hiện tại.
export const getAllPlaylistByUserId = createAsyncThunk('song/getAllSongByUseId',
    async ({ userId }, { dispatch, rejectWithValue }) => {

        console.log('getAllSongByUserId:', userId)

        const playlist = await readDataFirebaseWithChildCondition('playlists', 'userId', userId);
        // console.log('playlist:', playlist)
        dispatch(setPlayLists(playlist));
    })


const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        playlists: null,
        loading: false,
        error: null,
    },
    reducers: {
        setPlayLists: (state, action) => {
            state.playlists = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
})
export const { setPlayLists } = playlistsSlice.actions;
export default playlistsSlice.reducer;