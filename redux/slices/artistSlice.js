import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readDataFirebase, readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';
import { stat } from 'react-native-fs';


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
// export const getAllAritistByUserId = createAsyncThunk('artist/getAllAritistByUserId', async({userId}, {dispatch}) => {
//     try{
//         const resArtist = await readDataFirebase('artists');
//         // const resFollowedArtist = readDataFirebaseWithChildCondition('artists', 'follows/' + userId, userId)
//         dispatch(setArtist(convertObjectToArray(resFollowedArtist)));

//     }catch (error) {
//         console.log("get followed artist error: ", error)
//     }

// })

export const getArtistByUserId = createAsyncThunk('artist/getArtistByUserId', async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
        const resArtist = await readDataFirebase(`artists/${userId}`);
        dispatch(setArtist(resArtist));
    } catch (error) {
        dispatch(setArtist(null));

    }
})

export const getNumberFollowers = createAsyncThunk('artist/getCountFollowers', async({ artistId }, { dispatch })  => {
    try{
        const resFollowerArtist = await readDataFirebase(`artists/${artistId}/follows`);
       
        const Followers = convertObjectToArray(resFollowerArtist).filter(({ active }) => active == true);
        // Followers.filter(({ active }) => active == true);
        console.log('FOLLOWER: ', Followers);

        const numberFollowers = Followers.length;
        console.log('NUMBER FOLLOWER: ', numberFollowers);
        dispatch(setNumberFollowers(numberFollowers));
    }catch (error) {
        console.log('get Artist Follower false', error, artistId);
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

        
    try {
        const dataPopular = []
        for (let songId of songIds) {
            const resSong = await readDataFirebase(`songs/${songId}`);
            dataPopular.push({ key: songId, ...resSong });

        }

        console.log('dataPopular', dataPopular)
        dispatch(setPopularRelease(dataPopular));
    } catch (error) {
        return null;
    }
})

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: null,
        numberFollowers: 0,
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
        setNumberFollowers: (state, action) => {
            state.numberFollowers = action.payload;
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
export const { setArtist, setFollowedArtist, setNumberFollowers, setAlbum, setPopularRelease } = artistSlice.actions;
export default artistSlice.reducer;