import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findStartOfWeek } from '../../utilities/Date';
import { readDataFirebase, writeDataFirebase } from '../../firebase/controllerDB';
import { firebaseDatabase, firebaseDatabaseRef, firebaseUpdate, onAuthStateChanged } from '../../firebase/connectDB';
import { orderByChild, limitToLast, limitToFirst, orderByValue, onValue, query, get, child } from '../../firebase/connectDB';

export const getRankingCurrentWeek = createAsyncThunk('ranking/getRankingCurrentWeek',
    async (_, { dispatch }) => {

        // console.log("getRankingCurrentWeek")
        const currentDate = new Date()
        const timestampStartOfWeek = findStartOfWeek(currentDate);
        // console.log(timestampStartOfWeek)
        // const rankingData = await readDataFirebase(`ranking/${timestampStartOfWeek}`);

        // const databaseRef = firebaseDatabaseRef(firebaseDatabase, `ranking/${timestampStartOfWeek}`);
        // const database = getDatabase();
        const rankingRef = firebaseDatabaseRef(firebaseDatabase, `ranking/${timestampStartOfWeek}`);
        // const query = orderByChild(rankingRef, 'listen');
        // const sortedQuery = limitToFirst(query, 2); // Lấy 10 kết quả đầu tiên
        const rankingQuery = query(rankingRef, orderByChild('listen'), limitToLast(5));

        onValue(rankingQuery, async (snapshot) => {
            const data = snapshot.val();
            // console.log('data', data)
            let rankingData = [];
            if (data != null) {
                // Chuyển đổi dữ liệu thành một mảng
                const dataArray = Object.entries(data).map(([key, value]) => ({ key, ...value }));

                // Sắp xếp mảng theo trường "listen" giảm dần
                const sortedArray = dataArray.sort((a, b) => b.listen - a.listen);

                const dbRef = firebaseDatabaseRef(firebaseDatabase);
                for (let rank of sortedArray) {
                    // console.log(rank)
                    let songId = rank.key;
                   
                    const snapshotSong = await get(child(dbRef, `songs/${songId}`));
             
                    const song = {
                        id: snapshotSong.key,
                        albumName: snapshotSong.val().albumName,
                        artistId: snapshotSong.val().artistId,
                        artist: snapshotSong.val().artist,
                        url: snapshotSong.val().url,
                        duration: snapshotSong.val().duration,
                        genreId: snapshotSong.val().genreId,
                        genre: snapshotSong.val().genre,
                        artwork: snapshotSong.val().artwork,
                        lyrics: snapshotSong.val().lyrics,
                        title: snapshotSong.val().name,
                        reactHeart: snapshotSong.val().reactHeart,
                        releaseAt: snapshotSong.val().releaseAt,
                      
                    }

                    rankingData.push(song);
                }
                
            }
            // console.log("rankingData",rankingData);
            dispatch(setRanking(rankingData));
        });
    }
)

export const addRankingSongListen = createAsyncThunk('ranking/addRankingSongListen',
    async ({ songId }, { }) => {


        // lấy ngày hiện tại đổi ra timestamp

        // lấy data ranking
        // nếu mà key == timestamp ngày hiện tại
        // // chưa có song đó thì add listen = 1
        // // nếu đã có rồi thì cập nhật listen + 1

        const currentDate = new Date();

        const startDateOfWeek = findStartOfWeek(currentDate);

        const listenSong = await readDataFirebase(`ranking/${startDateOfWeek}/${songId}`);

        if (listenSong == null) {
            writeDataFirebase(`ranking/${startDateOfWeek}`, { listen: 1 }, songId);
        } else {
            console.log(listenSong.listen)
            const nodeRef = firebaseDatabaseRef(firebaseDatabase, `ranking/${startDateOfWeek}/${songId}`)
            await firebaseUpdate(nodeRef, {
                'listen': listenSong.listen + 1
            })
        }


    })

export const rankingSlice = createSlice({
    name: 'ranking',
    initialState: {
        ranking: null,
        loading: false,
        error: null
    },
    reducers: {
        setRanking: (state, action) => {
            state.ranking = action.payload;
        }
    }
})

export const { setRanking } = rankingSlice.actions;
export default rankingSlice.reducer;