import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';
import { readDataFirebase, updateDataFirebase } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';

export const getUserUid = createAsyncThunk('user/getUserUid', async ({ userUid }, { rejectWithValue }) => {
    try {
        console.log('useruid createAsyncThunk', userUid)
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
        console.log('error', error.message)
        return rejectWithValue(error.message);
    }
})


export const getAllArtistFollowByUserId = createAsyncThunk('user/getAllArtistFollowByUserId',
    async ({ userId }, { dispatch }) => {
        try {
            const resFollowArtist = await readDataFirebase(`follows/${userId}`);

            console.log('resFollowArtist', convertObjectToArray(resFollowArtist))
            const arrayFollow = convertObjectToArray(resFollowArtist);

            const artists = [];
            for (let follow of arrayFollow) {
                
                    const resArtist = await readDataFirebase(`artists/${follow.key}`);
                    const artist = {
                        key: follow.key,
                        active: follow.active,
                        ...resArtist
                    }

                    // console.log(artist)
                    artists.push(artist);
                
            }

            dispatch(setFollowArtist(artists))

        } catch {
            dispatch(setFollowArtist(null))
        }
    }
)

export const followingArtistByUserId = createAsyncThunk('user/followingArtistByUserId',
    async ({ userId, artistId, active, timestamp }, { }) => {
        try {
            console.log('followingArtistByUserId:', active)
            await updateDataFirebase(`follows/${userId}/${artistId}`, {active: active,timestamp:  timestamp})
            console.log(`Đã thêm thông tin "follows" cho nghệ sĩ ${artistId}`);
        } catch (error) {
            console.error(`Lỗi khi thêm thông tin "follows" cho nghệ sĩ ${artistId}:`, error);
        }
    }
)
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
        setFollowArtist: (state, action) => {
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
export const { setUser, setFollowArtist } = userSlice.actions;
export default userSlice.reducer;