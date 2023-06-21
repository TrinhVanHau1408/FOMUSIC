import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebase, readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';


export const getAllAritist = createAsyncThunk('artist/getAllAritist', 
    async (_, {dispatch}) => {
        try {
            const resArtist = await readDataFirebase('artists');
            console.log('convertObjectToArray(resArtist))', convertObjectToArray(resArtist));
            dispatch(setArtist(convertObjectToArray(resArtist)));
        } catch (error) {
           console.log("get all artist error: ", error)
        }
    }
)
export const getArtistByUserId = createAsyncThunk('artist/getArtistByUserId', async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
        const resArtist = await readDataFirebase(`artists/${userId}`);
        dispatch(setArtist(resArtist));
    } catch (error) {
        dispatch(setArtist(null));

    }
})


export const getAllAlbumByAlbumIds = createAsyncThunk('artist/getAllAlbumByArtistId',
    async ({ albumIds }, { dispatch }) => {
        try {
            const dataAlbum = []

            for (let albumId of albumIds) {
                const resAlbum = await readDataFirebase(`albums/${albumId}`);
                dataAlbum.push({ key: albumId, ...resAlbum });
            }


            dispatch(setAlbum(dataAlbum));
        } catch (error) {
            return null;
        }
    }
)

export const getPopularRelease = createAsyncThunk('artist/getPopularRelease',
    async ({ songIds }, { dispatch }) => {

        const dataPopular = []
    try {
        for (let songId of songIds) {
            const resSong = await readDataFirebase(`songs/${songId}`);
            dataPopular.push({ key: songId, ...resSong });
        }


        dispatch(setPopularRelease(dataPopular));
    } catch (error) {
        return null;
    }
})

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: null,
        albums: null,
        popularRelease: null,
        loading: false,
        error: null,
    },
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        },
        setFollowedArtist: (state, action) => {
            state.followedArtist = action.payload;
        },
        setAlbum: (state, action) => {
            state.albums = action.payload;
        },
        setPopularRelease: (state, action) => {
            state.popularRelease = action.payload;
        },
      
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
export const { setArtist, setFollowedArtist, setAlbum, setPopularRelease } = artistSlice.actions;
export default artistSlice.reducer;