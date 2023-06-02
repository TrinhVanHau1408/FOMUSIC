import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';

// Lấy tất cả các playlist của user hiện tại.
export const getAllPlaylistByUserId = createAsyncThunk('song/getAllSongByUseId',
    async ({ userId }, { dispatch, rejectWithValue }) => {

        console.log('getAllSongByUserId:', userId)

        const playlist = await readDataFirebaseWithChildCondition('playlists', 'userId', userId);
        console.log('playlist:', playlist)
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
        // getUserUid
        builder.addCase(getPlayLists.pending, (state) => {
            state.loading = true;
            console.log("getPlayLists pending")
        })
        builder.addCase(getPlayLists.fulfilled, (state, action) => {
            state.loading = false;
            state.playlists = action.payload;
            console.log("getPlayLists fulfilled")
        })
        builder.addCase(getPlayLists.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getPlayLists rejected")
        })
    }
})
export const { setPlayLists } = playlistsSlice.actions;
export default playlistsSlice.reducer;