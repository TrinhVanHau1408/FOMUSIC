import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebase, readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';
import { firebaseDatabaseRef, firebaseDatabase, get, orderByChild, equalTo, query } from '../../firebase/connectDB';
export const getArtistByUserId = createAsyncThunk('artist/getArtistByUserId', async ({ userId }, {dispatch, rejectWithValue }) => {
    try {
        const resArtist = await readDataFirebase(`artists/${userId}`);
        dispatch(setArtist(resArtist));
    } catch (error) {
        dispatch(setArtist(null));
      
    }
})


// Truy vấn tất cả các nghệ sĩ đã theo dõi
// export const getFollowedArtists = createAsyncThunk('artist/getFollowedArtists',
//     async ({ userId }, { dispatch, rejectWithValue }) => {
//         console.log("getFollowedArtists");

//         // const artistsRef = firebaseDatabaseRef(firebaseDatabase, 'artists');
//         // console.log(`follows/${userId}`)
//         // const queryRef = query(artistsRef, orderByChild(userId+'/active'), equalTo(""));

//         // try {
//         //   const snapshot = await get(queryRef);
//         //   const artists = snapshot.val();
//         //   console.log("artists",artists);
//         // } catch (error) {
//         //   console.log("Lỗi khi truy vấn dữ liệu:", error);
//         //   return null;
//         // }

//         // const as =await readDataFirebase('artists');
//         // console.log(as)

//         const artistsRef = firebaseDatabaseRef(firebaseDatabase, 'artists');

//         // Tạo query với orderByChild và equalTo
//         const followsQuery = query(
//             firebaseDatabaseRef(artistsRef, "follows"),
//             orderByChild('active'),
//             equalTo(false)
//         );

//         // Truy vấn dữ liệu
//         get(followsQuery)
//             .then((snapshot) => {
//                 console.log(snapshot)
//                 if (snapshot.exists()) {
                  
//                     snapshot.forEach((childSnapshot) => {
//                         const followId = childSnapshot.key;
//                         const followData = childSnapshot.val();

//                         // Xử lý dữ liệu theo ý muốn
//                         console.log(`Follow: ${followId}, Active: ${followData.active}`);
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//     }
// )


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
        // builder.addCase(queryFollowedArtists.pending, (state) => {
        //     state.loading = true;
        //     console.log("getArtistUid pending")
        // })
        // builder.addCase(queryFollowedArtists.fulfilled, (state, action) => {
        //     state.loading = false;
        //     // state.artist = action.payload;
        //     console.log("getArtistUid fulfilled")
        // })
        // builder.addCase(queryFollowedArtists.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        //     console.log("getArtistUid rejected")
        // })
    }
})
export const { setArtist, setFollowedArtist } = artistSlice.actions;
export default artistSlice.reducer;