import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';

export const getArtist = createAsyncThunk('artist/getArtist', async({artist},{ rejectWithValue })=> {
    try {
        console.log('useruid createAsyncThunk' , artist)
        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, `artists/${artist}`));
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

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: null,
        loading: false,
        error: null,
      },
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        }
    },
    extraReducers: (builder) => {
        // getUserUid
        builder.addCase(getArtist.pending, (state) => {
            state.loading = true;
            console.log("getArtistUid pending")
        })
        builder.addCase(getArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log("getArtistUid fulfilled")
        })
        builder.addCase(getArtist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getArtistUid rejected")
        })
    }
})
export const { setArtist } = artistSlice.actions;
export default artistSlice.reducer;