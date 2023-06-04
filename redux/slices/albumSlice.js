import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';

export const getAlbum = createAsyncThunk('album/getAlbum', async({album},{ rejectWithValue })=> {
    try {
        console.log('albumuid createAsyncThunk' , album)
        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, `albums/${album}`));
        // const user = {
        //     displayName: responeSnapshot.val().displayName,
        //     email: responeSnapshot.val().email,
        //     uid: responeSnapshot.key,
        //     imgUrl: responeSnapshot.val().imgUrl,
        //     emailVerified: responeSnapshot.val().emailVerified,
        //     typeUser: responeSnapshot.val().typeUser,
        // }
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
            state.user = action.payload;
            console.log("getArtistUid fulfilled")
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