import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebaseWithChildCondition, readDataFirebase } from '../../firebase/controllerDB';
import { convertDataSnapshotToArray, convertObjectToArray, filterObject } from '../../utilities/Object';

// Lấy tất cả các playlist của user hiện tại.
export const getAllPlaylistByUserId = createAsyncThunk('song/getAllSongByUseId',
    async ({ userId }, { dispatch, rejectWithValue }) => {

     
        const playlist = await readDataFirebaseWithChildCondition('playlists', 'userId', userId);
        // console.log('playlist:', playlist)
      
       console.log('convert playlist:', convertObjectToArray(playlist));
    if (playlist) dispatch(setPlayLists(convertObjectToArray(playlist)))
    })

export const getAllSongByPlaylist = createAsyncThunk('playlist/getAllSongByPlaylist',
    async({songId}) => {
        const song = await readDataFirebase(`songs/${songId}`);
        console.log(song)
        return song;
    }
)

export const getPlayListById = createAsyncThunk('playlist/getPlayListById',
async({playlistId}, {dispatch}) => {
    console.log('getPlayListById', playlistId)
    const playlist = await readDataFirebase(`playlists/${playlistId}`);
    // console.log('convertObjectToArray',[{'key':playlistId, ...playlist}])
    dispatch(setOnePlaylist([{'key':playlistId, ...playlist}]))
    // return convertObjectToArray(playlist);
}
    )
const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        playlists: null,
        onePlaylist: null,
        loading: false,
        error: null,
    },
    reducers: {
        setPlayLists: (state, action) => {
            state.playlists = action.payload;
            // console.log("action", action.payload)
        },
        setOnePlaylist: (state, action) => {
            state.onePlaylist = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
})
export const { setPlayLists ,setOnePlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;