import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';

export const getUserHistoryUid = createAsyncThunk('userHistory/getUserHistoryUid', async ({ userHistoryUid }, { rejectWithValue }) => {
    try {
        console.log('songuid createAsyncThunk', userHistoryUid)
        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, `userHistorys/${userHistoryUid}`));
        const userHistory = {
            uid: responeSnapshot.key,
            nameSong: responeSnapshot.child
            // song: responeSnapshot.song,
            // displayName: responeSnapshot.val().displayName,
            // email: responeSnapshot.val().email,
            // imgUrl: responeSnapshot.val().imgUrl,
            // emailVerified: responeSnapshot.val().emailVerified,
            // typeUser: responeSnapshot.val().typeUser,
        }
        return userHistory.uid;
    } catch (error) {
        console.log('error', error.message)
        return rejectWithValue(error.message);
    }
})

// export const getSongInUserHistory = createAsyncThunk('userHistory/getUserHistoryUid', async ({ userHistoryUid }, { rejectWithValue }) => {
//     try {
//         const dbRef = firebaseDatabaseRef(firebaseDatabase);
//         const historyUid = getUserHistoryUid({});
//         const responeSnapshot = await get(child(dbRef, ))
//         const songInUserhistory = {

//         }
//         return songInUserhistory;
//     }
//     catch (error) {
//         console.log('error', error.message)
//         return rejectWithValue(error.message);
//     }
// })

const userHistorySlice = createSlice({
    name: 'userHistory',
    initialState: {
        userHistory: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUserHistory: (state, action) => {
            state.userHistory = action.payload;
        }
    },
    extraReducers: (builder) => {
        // getUserHistoryUid
        builder.addCase(getUserHistoryUid.pending, (state) => {
            state.loading = true;
            console.log("getUserHistoryUid pending")
        })
        builder.addCase(getUserHistoryUid.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log("getUserHistoryUid fulfilled")
        })
        builder.addCase(getUserHistoryUid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getUserHistoryUid rejected")
        })
    }
})
// export const { setUserHistory } = userHistorySlice.actions;
// export default userHistorySlice.reducer;
export const { setUserHistory } = userHistorySlice.actions;
export default userHistorySlice.reducer;