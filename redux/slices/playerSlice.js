import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TrackPlayer, {RepeatMode, State, Capability} from 'react-native-track-player';


export const setupPlayMusic = createAsyncThunk(
    'player/setupPlayMusic',
    async(_, {getState}) => {

        console.log("player/setupPlayMusic");
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
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious,]
            });
            await TrackPlayer.add(getState().player.tracks);
        }
        catch (e) {
            console.log("Error setup: ", e)
        }
    }
)


export const addTracks = createAsyncThunk(
    'player/addTracks',
    async(_, {getState}) => {
        console.log("player/addTracks: ", getState().player.tracks);
        await TrackPlayer.add(getState().player.tracks);
      
       
    }
)
;
export const togglePlayback = createAsyncThunk(
    'player/togglePlayback',
    async ({playBackState}, { getState }) => {

        
        // const playBackState = getState().player.playBackState;
        const currentTrack = await TrackPlayer.getCurrentTrack();

        console.log('player/togglePlayback',playBackState + " " + currentTrack);
        if (currentTrack != null) {
            if (playBackState != State.Playing) {
              console.log('TrackPlayer.play()');
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }
);

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
          await TrackPlayer.play();
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
          await TrackPlayer.play();
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
    },
    reducers: {
        setPlaybackState: (state, action) => {
            state.playBackState = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        settracks: (state, action) => {
          
            state.tracks = action.payload;
        },
        setRepeatMode: (state, action) => {
            state.repeatMode = action.payload;
        },
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
    settracks,
    setRepeatMode,
} = playerSlice.actions;

export default playerSlice.reducer;