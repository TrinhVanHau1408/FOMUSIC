import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    firebaseDatabaseRef,
    get,
    child,
    firebaseDatabase,
    firebaseUpdate,
    firebaseDatabaseSet,
    equalTo,
    query,
    orderByChild
} from '../../firebase/connectDB';
import { parse } from 'react-native-svg';
import { readDataFirebase, readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';


// const getAllSong = createAsyncThunk('song/getAllSong', async ({}))
export const getAllSong = createAsyncThunk('song/getAllSong', 
    async(_, {dispatch}) => {
        try {
            const resSong = await readDataFirebase('songs');
            console.log("convertObjectToArray(resSong)", convertObjectToArray(resSong))
            dispatch(setSong(convertObjectToArray(resSong)))
        } catch (error) {
            console.log("Get all song error: ", error)
        }
    }
)

export const reactHeartSong = createAsyncThunk('song/reactHeartSong', async ({ songId, userId }, { rejectWithValue }) => {
    // path: songs/songId/reactHeart/userId =>> nếu tồn tại thì xóa bỏ nếu chứa thì thêm vào

    console.log('handle click heart');
    const dbRef = firebaseDatabaseRef(firebaseDatabase);
    const responeSnapshot = await get(child(dbRef, `songs/${songId}/reactHeart/${userId}`));

    console.log(responeSnapshot.val());
    // True đã like rồi thì unlike
    // False thì update lại true thành like
    // Null thì add userid and value == true
    if (responeSnapshot.val()) {
        // true: update value false
        console.log("responeSnapshot.key: ", responeSnapshot.val());
        nodeRef = firebaseDatabaseRef(firebaseDatabase, 'songs/${songId}/reactHeart');

        await firebaseUpdate(nodeRef, {
            '${songId}': false,
        })

    } else {
        // false: update value true
        if (responeSnapshot.val() == false) {
            console.log("responeSnapshot.key: false");
            nodeRef = firebaseDatabaseRef(firebaseDatabase, 'songs/${songId}/reactHeart');

            await firebaseUpdate(nodeRef, {
                '${songId}': true,
            })
        }

        // null: add new
        if (responeSnapshot.val() == null) {
            console.log("responeSnapshot.key: null", responeSnapshot.val());
            nodeRef = firebaseDatabaseRef(firebaseDatabase, 'songs/${songId}/reactHeart');
            const newChildRef = ref(nodeRef);
            await firebaseDatabaseSet(newChildRef, {
                '${songId}': true,
            })
        }
    }

})


export const getHistorySong = createAsyncThunk('song/getHistorySong',
    async ({ userId }, {dispatch, rejectWithValue }) => {

        console.log('getHistorySong')

        const dbRef = firebaseDatabaseRef(firebaseDatabase);
        const responeSnapshot = await get(child(dbRef, `userHistorys/${userId}`));

        const songIds = Object.keys(responeSnapshot.val());
        // console.log(`songIds ${songIds} \\n`);

        const dataSong = [];
        // console.log("getHistorySong: ");
        for (let songId of songIds) {

            // console.log(songId)
            const snapshotSong = await get(child(dbRef, `songs/${songId}`));
            // console.log(`song id ${snapshotSong.key} + ${snapshotSong.val()} `)
            let song = {
                id: snapshotSong.key,
                ...snapshotSong.val()
            }
            // console.log(`song id ${snapshotSong.key} + ${snapshotSong.val().name} + ${snapshotSong.val().artwork}`)
        
            dataSong.push(song);
        }

        dispatch(setHistorySong(dataSong))
    }
)

const songSlice = createSlice({
    name: 'song',
    initialState: {
        songs: null,
        historySongs: null,
        loading: false,
        error: null
    },
    reducers: {
        setSong: (state, action) => {
            state.songs = action.payload;
            // console.log('setSong: ', action.payload)
        },
        setHistorySong: (state, action) => {
            state.historySongs = action.payload;
            // console.log('setHistorySong: ', action.payload)
        }
    },
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
    // ,
    // extraReducers: (builder) => {
    //     builder.addCase(getAllSongByUseId.pending, (state) => {
    //         state.loading =true;
    //     })
    // },
    // extraReducers: (builder) => {
    //     builder.addCase(getAllSongByUseId.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.songs = action.payload;
    //         console.log('getAllSongByUseId: ',action.payload )
    //     })
    // },
    // extraReducers: (builder) => {
    //     builder.addCase(getAllSongByUseId.rejected, (state, action) => {
    //         state.loading = false;
    //         console.log("reactHeartSong rejected: ", action.error.code)
    //     })
    // }
})
export const { setSong, setHistorySong } = songSlice.actions;
export default songSlice.reducer;