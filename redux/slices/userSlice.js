import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';
import { readDataFirebase } from '../../firebase/controllerDB';

export const getUserUid = createAsyncThunk('user/getUserUid', async({userUid},{ rejectWithValue })=> {
    try {
        console.log('useruid createAsyncThunk' , userUid)
        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, `users/${userUid}`));
        const user = {
            displayName: responeSnapshot.val().displayName,
            email: responeSnapshot.val().email,
            uid: responeSnapshot.key,
            imgUrl: responeSnapshot.val().imgUrl,
            emailVerified: responeSnapshot.val().emailVerified,
            typeUser: responeSnapshot.val().typeUser,
        }
        return user;
    } catch (error) {
        console.log('error' , error.message)
        return rejectWithValue(error.message);
    }
})

export const getArtistFollowByUserUid = createAsyncThunk('user/getArtistFollowByUserUid', 
    async(_, {getState,dispatch, rejectWithValue}) => {
        console.log("getArtistFollowByUserUid")
        const {uid} = getState().user.user;
        // console.log('userId 29: ',uid)
        const followArtist = await readDataFirebase(`follows/${uid}`);
        // console.log("followArtist - 31: ", followArtist);
        dispatch(setFollow(followArtist));
    })
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        follows: null,
        loading: false,
        error: null,
      },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setFollow: (state, action) => {
            state.follows = action.payload;
        }
    },
    extraReducers: (builder) => {
        // getUserUid
        builder.addCase(getUserUid.pending, (state) => {
            state.loading = true;
            console.log("getUserUid pending")
        })
        builder.addCase(getUserUid.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log("getUserUid fulfilled")
        })
        builder.addCase(getUserUid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getUserUid rejected")
        })
    }
})
export const { setUser, setFollow } = userSlice.actions;
export default userSlice.reducer;