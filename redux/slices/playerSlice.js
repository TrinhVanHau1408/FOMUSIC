import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TrackPlayer, {RepeatMode, State, Capability} from 'react-native-track-player';
import { addRankingSongListen } from './rankingSlice';


export const setupPlayMusic = createAsyncThunk(
    'player/setupPlayMusic',
    async(_, {dispatch, getState}) => {

        // console.log("player/setupPlayMusic");
        try {

            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                compactCapabilities: [
                  Capability.Play, 
                  Capability.Pause, 
                  Capability.SkipToPrevious,
                  Capability.SkipToNext,]
            });
            // if (getState().player.tracks != null) {
            //   await TrackPlayer.add(getState().player.tracks);
            //   // const track = getState().player.tracks;
            //   console.log('track',await TrackPlayer.getQueue())
            //   // await TrackPlayer.prepare(track,0, true);
            //   // dispatch(playTrackBySongId({songId}))
            //   await TrackPlayer.play();
            // }
           
        }
        catch (e) {
            console.log("Error setup: ", e)
        }
    }
)


export const playTrackBySongId = createAsyncThunk('player/playTrackBySongId',
    async({songId}) => {
      // const track = await TrackPlayer.getTrack(songId);
      // await TrackPlayer.skip(track.id);
      // await TrackPlayer.play();
      // const currentQueue = await TrackPlayer.getQueue();
      console.log('queue',songId )
      const currentQueue = await TrackPlayer.getQueue();
      if (currentQueue) {
        console.log('playTrackBySongId currentQueue',currentQueue )
      } else {
        console.log('playTrackBySongId currentQueue chưa' )
      }
      
    }
)
export const addTracks = createAsyncThunk(
    'player/addTracks',
    async({songs, songCurrentId}, {getState, dispatch}) => {
        // console.log("player/addTracks: ", getState().player.tracks);
        // await TrackPlayer.add(getState().player.tracks);
        // await TrackPlayer.play();
        await TrackPlayer.reset();
        if (songs != null) {
          dispatch(setTracks(songs))
          await TrackPlayer.add(songs);
          // const track = getState().player.tracks;
          // console.log('track',await TrackPlayer.getQueue())
          const currentTrack = await TrackPlayer.getQueue();
          await TrackPlayer.play();
          const indexPlay = currentTrack.findIndex(({id, key}) => id ?id == songCurrentId: key ==songCurrentId);
          
          await TrackPlayer.skip(indexPlay);
          //
          //
          // Nhớ bật lại
          //
          await TrackPlayer.play();
          const currentPlay = await TrackPlayer.getTrack(indexPlay);
          console.log('currentPlay',currentPlay)
          dispatch(addRankingSongListen({songId: currentPlay.id&&currentPlay.key}))
          // dispatch(setCurrentPlay(currentPlay))
          
          console.log('indexPlay',indexPlay + " " + songCurrentId)
          
        }
    }
)
;
export const togglePlayback = createAsyncThunk(
    'player/togglePlayback',
    async ({playBackState}, {dispatch ,getState }) => {

        
        // const playBackState = getState().player.playBackState;
        const currentTrack = await TrackPlayer.getCurrentTrack();

        console.log('player/togglePlayback',playBackState + " " + currentTrack);
        if (currentTrack != null) {
            if (playBackState != State.Playing) {
              // console.log('TrackPlayer.play()');
                await TrackPlayer.play();
               
            } else {
                await TrackPlayer.pause();
               
            }
        }
    }
);
export const playCurrentSongClick = createAsyncThunk('song/playCurrentSongClick',
async({songId}, {dispatch}) => {
  
})
export const playPreviousTrack = createAsyncThunk(
    'player/playPreviousTrack',
    async (_, { getState, dispatch }) => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
  
      if (currentTrack != null) {
        await TrackPlayer.seekTo(0);
        const queue = await TrackPlayer.getQueue();
  
        if (currentTrack > 0) {
          const preTrackIndex = currentTrack - 1;
          await TrackPlayer.skipToPrevious(preTrackIndex);
          // 
          // await TrackPlayer.play();
          //  
        } else {
          const lastTrackIndex = queue.length - 1;
          await TrackPlayer.skipToNext(lastTrackIndex);
          await TrackPlayer.play();
        }
      }
    }
  );

  export const playNextTrack = createAsyncThunk(
    'player/playNextTrack',
    async (_, { getState, dispatch }) => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
  
      if (currentTrack != null) {
        await TrackPlayer.seekTo(0);
        const queue = await TrackPlayer.getQueue();
  
        if (currentTrack < queue.length - 1) {
          const nextTrackIndex = currentTrack + 1;
          await TrackPlayer.skipToNext(nextTrackIndex);
          // 
          // await TrackPlayer.play();
          // 
        } else {
          const firstTrackIndex = 0;
          await TrackPlayer.skipToNext(firstTrackIndex);
          await TrackPlayer.play();
        }
      }
    }
  );

  export const toggleShuffleMode = createAsyncThunk(
    'player/toggleShuffleMode',
    async (_, { dispatch }) => {
      const playBackState = getState().player.playBackState;
      const queue = await TrackPlayer.getQueue();
  
      await TrackPlayer.reset();
      queue.sort(() => Math.random() - 0.5);
      await TrackPlayer.add(queue);
      await TrackPlayer.play();
  
      dispatch(setPlaybackState(playBackState));
    }
  );


  export const changeRepeatMode = createAsyncThunk(
    'player/changeRepeatMode',
    async (_, { getState, dispatch }) => {
      const repeatMode = getState().player.repeatMode;
  
      console.log(repeatMode);
      if (repeatMode === 'off') {
        TrackPlayer.setRepeatMode(RepeatMode.Track);
        return 'track';
      }
  
      if (repeatMode === 'track') {
        TrackPlayer.setRepeatMode(RepeatMode.Queue);
        return 'repeat';
        
      }
  
      if (repeatMode === 'repeat') {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        return 'off';
      }
    }
  );

  export const getCurrentHeartPlaying = createAsyncThunk('song/getCurrentHeartPlaying', async (_, {dispatch ,rejectWithValue }) => {
    const songRef = firebaseDatabaseRef(firebaseDatabase, 'songs/song1/reactHeart')
    await onValue(songRef, (snapshot) => {
        const song = snapshot.val();
        console.log("react heart: ",song)
        // const song = Object.keys(songs).filter(song => song.id =='3XUNpCHKq3bC64NzVwHNRBEzzFx2s');
        console.log("user id: ",song['3XUNpCHKq3bC64NzVwHNRBEzzFx2'])
        const isHeart = song['3XUNpCHKq3bC64NzVwHNRBEzzFx2'];
        dispatch(setHeart(isHeart));
        // if (isHeart == true) {
        //   d
        // } else {
        //   return false;
        // }
       
    })
})

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playBackState: null,
        progress: {
            position: 0,
            duration: 0,
        },
        tracks: null,
        repeatMode: 'off',
        isHeart: false,
        currentPlay: null
    },
    reducers: {
        setPlaybackState: (state, action) => {
            state.playBackState = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setTracks: (state, action) => {
          
            state.tracks = action.payload;
        },
        setRepeatMode: (state, action) => {
            state.repeatMode = action.payload;
        },
        setHeart: (state, action) => {
          state.isHeart = action.payload;
          // console.log("getCurrentHeartPlaying",action.payload)
        },
        setCurrentPlay: (state, action) => {
          state.currentPlay = action.payload
         
        }
    },
    extraReducers: (builder) => {
      builder.addCase(changeRepeatMode.fulfilled,(state, action) => {
        state.repeatMode = action.payload;

      })
     
    }
});



export const {
    setPlaybackState,
    setProgress,
    setTracks,
    setRepeatMode,
    setHeart, setCurrentPlay
} = playerSlice.actions;

export default playerSlice.reducer;