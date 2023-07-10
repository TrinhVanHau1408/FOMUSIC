import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';
import { readDataFirebase } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';
import { Album } from '../../views';

export const getAlbum = createAsyncThunk('album/getAlbum', async(_,{ dispatch }) => {
    try {
        console.log('Album');
        const album = await readDataFirebase('albums');
        // console.log('convertAlbum:', convertObjectToArray(album));
        dispatch(setAlbum(convertObjectToArray(album)));
    } catch (error) {
        console.log('Get all album error', error.message)
        // return rejectWithValue(error.message);
    }
})
export const getAllSongsByAlbum = createAsyncThunk('album/getAllSongsByAlbum', async({albumId}) => {
    try{

    } catch (error) {
        console.log('getAllSongsByAlbum error: ', error.message)
    }
})

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        album: null,
        loading: false,
        error: null,
      },
    reducers: {
        setAlbum: (state, action) => {
            state.album = action.payload;
        }
    },
    extraReducers: (builder) => {
        // getUserUid
        // builder.addCase(getAlbum.pending, (state) => {
        //     state.loading = true;
        //     console.log("getAlbumUid pending")
        // })
        // builder.addCase(getAlbum.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.album = action.payload;
        //     console.log("getAlbumtUid fulfilled")
        // })
        // builder.addCase(getAlbum.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        //     console.log("getAlbumUid rejected")
        // })
    }
})
export const { setAlbum } = albumSlice.actions;
export default albumSlice.reducer;