import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseDatabaseRef, get, child, firebaseDatabase } from '../../firebase/connectDB';
import { equalTo, orderByChild, ref } from 'firebase/database';

export const getArtist = createAsyncThunk('artist/getArtist', async ({ artist }, { rejectWithValue }) => {
    try {
        console.log('useruid createAsyncThunk', artist)
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


// Truy vấn tất cả các nghệ sĩ đã theo dõi
export const queryFollowedArtists = createAsyncThunk('followedArtist/queryFollowedArtists',
    async ({ userId }, { dispatch, rejectWithValue }) => {
        try {
            const dbRef = firebaseDatabaseRef(firebaseDatabase);
            const snapshot = await get(orderByChild(child(dbRef, 'artists'), 'follows/' + userId), equalTo('', 'value'));

            // Lấy giá trị của tất cả các nghệ sĩ đã theo dõi
            const followedArtists = snapshot.val();

            // Kiểm tra nếu không có nghệ sĩ nào đã theo dõi
            if (!followedArtists) {
                console.log('Không có nghệ sĩ nào đã theo dõi!');
                return;
            }
            dispatch(setFollowedArtist(followedArtists))

            // Lặp qua từng nghệ sĩ đã theo dõi và truy cập thông tin của họ
            // Object.keys(followedArtists).forEach((artistId) => {
            //     const artist = followedArtists[artistId];
            //     console.log('Thông tin nghệ sĩ:', artist);
            // });
        } catch (error) {
            console.log('Lỗi truy vấn:', error);
        }
        
    }
)


const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: null,
        followedArtist: null,
        loading: false,
        error: null,
    },
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        },
        setFollowedArtist: (state, action) => {
            state.followedArtist = action.payload;
        }
    },
    extraReducers: (builder) => {
        // getUserUid
        builder.addCase(queryFollowedArtists.pending, (state) => {
            state.loading = true;
            console.log("getArtistUid pending")
        })
        builder.addCase(queryFollowedArtists.fulfilled, (state, action) => {
            state.loading = false;
            // state.artist = action.payload;
            console.log("getArtistUid fulfilled")
        })
        builder.addCase(queryFollowedArtists.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("getArtistUid rejected")
        })
    }
})
export const { setArtist, setFollowedArtist } = artistSlice.actions;
export default artistSlice.reducer;