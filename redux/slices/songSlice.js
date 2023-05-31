import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseDatabaseRef, get, child, firebaseDatabase, firebaseUpdate, firebaseDatabaseSet } from '../../firebase/connectDB';

const getAllSongByUserId = createAsyncThunk('song/getAllSongByUseId', async ({ userId }, { rejectWithValue }) => {

})


const getAllSong = createAsyncThunk('song/getAllSong', async (_, { rejectWithValue }) => {

})

export const reactHeartSong = createAsyncThunk('song/reactHeartSong', async ({ songId, userId }, { rejectWithValue }) => {
    // path: songs/songId/reactHeart/userId =>> nếu tồn tại thì xóa bỏ nếu chứa thì thêm vào

    console.log('handle click heart');
    const dbRef = firebaseDatabaseRef(firebaseDatabase);
    const responeSnapshot = await get(child(dbRef, `songs/song1/reactHeart/3XUNpCHKq3bC64NzVwHNRBEzzFx2`));
    
    console.log(responeSnapshot.val());
    // True đã like rồi thì unlike
    // False thì update lại true thành like
    // Null thì add userid and value == true
    if (responeSnapshot.val()) {
        // true: update value false
        console.log("responeSnapshot.key: ", responeSnapshot.val());
       
            // await firebaseDatabaseSet(firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart'), {
            //     '3XUNpCHKq3bC64NzRBEzzFx2': false,
            // })

            nodeRef =  firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart');

           await firebaseUpdate(nodeRef, {
                '3XUNpCHKq3bC64NzVwHNRBEzzFx2': false,
            })
       
    } else {

       
        // false: update value true
        if (responeSnapshot.val() == false) {
            console.log("responeSnapshot.key: false");
            nodeRef = firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart');

            await firebaseUpdate(nodeRef, {
                '3XUNpCHKq3bC64NzVwHNRBEzzFx2': true,
            })
        }

        // null: add new
        if (responeSnapshot.val() == null) {
            console.log("responeSnapshot.key: null", responeSnapshot.val());
            nodeRef = firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart');
            const newChildRef = ref(nodeRef);
            await firebaseDatabaseSet(newChildRef, {
                '3XUNpCHKq3bC64NzVwHNRBEzzFx2': true,
            })
            // await firebaseDatabaseSet(firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart'), {
            //     '3XUNpCHKq3bC64NzRBEzzFx2': true,
            // });



        }
    }

})


const songSlice = createSlice({
    name: 'song',
    initialState: {
        songs: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reactHeartSong.pending, (state) => {
            state.loading = true;
            console.log("reactHeartSong pending")
        })
    },
    extraReducers: (builder) => {
        builder.addCase(reactHeartSong.fulfilled, (state) => {
            state.loading = false;
            console.log("reactHeartSong fulfilled")
        })
    },
    extraReducers: (builder) => {
        builder.addCase(reactHeartSong.rejected, (state, action) => {
            state.loading = false;
            console.log("reactHeartSong rejected: ", action.error.code)
        })
    }
})

export default songSlice.reducer;