import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';

export const getAlbum = createAsyncThunk('album/getAlbum', async({ },{ rejectWithValue }) => {
    try {
        // console.log('albumuid createAsyncThunk' , album)
        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, 'albums'));
        // const album = {
        //     id: responeSnapshot.key,
        //     name: responeSnapshot.val().name,
        //     imgUrl: responeSnapshot.val().imgUrl,

        // }
        console.log('ALBUM IN SLICE: ', responeSnapshot.val())
        return responeSnapshot.val();
    } catch (error) {
        console.log('error', error.message)
        return rejectWithValue(error.message);
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
        builder.addCase(getAlbum.pending, (state) => {
            state.loading = true;
            console.log("getAlbumUid pending")
        })
        builder.addCase(getAlbum.fulfilled, (state, action) => {
            state.loading = false;
            state.album = action.payload;
            console.log("getAlbumtUid fulfilled")
        })
        builder.addCase(getAlbum.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getAlbumUid rejected")
        })
    }
})
export const { setAlbum } = albumSlice.actions;
export default albumSlice.reducer;