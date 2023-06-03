import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findStartOfWeek } from '../../utilities/Date';
import { readDataFirebase, writeDataFirebase } from '../../firebase/controllerDB';
import { firebaseDatabase, firebaseDatabaseRef, firebaseUpdate, onAuthStateChanged } from '../../firebase/connectDB';
import { orderByChild, limitToLast, limitToFirst,orderByValue, onValue,query, get } from '../../firebase/connectDB';

export const getRankingCurrentWeek = createAsyncThunk('ranking/getRankingCurrentWeek',
    async (_, { dispatch }) => {

        console.log("getRankingCurrentWeek")
        const currentDate = new Date()
        const timestampStartOfWeek = findStartOfWeek(currentDate);
        console.log(timestampStartOfWeek)
        // const rankingData = await readDataFirebase(`ranking/${timestampStartOfWeek}`);

        // const databaseRef = firebaseDatabaseRef(firebaseDatabase, `ranking/${timestampStartOfWeek}`);
        // const database = getDatabase();
        const rankingRef = firebaseDatabaseRef(firebaseDatabase, `ranking/${timestampStartOfWeek}`);
        // const query = orderByChild(rankingRef, 'listen');
        // const sortedQuery = limitToFirst(query, 2); // Lấy 10 kết quả đầu tiên
        const rankingQuery = query(rankingRef, orderByChild('listen'), limitToLast(5));

        onValue(rankingQuery, (snapshot) => {
            const data = snapshot.val();
            // Chuyển đổi dữ liệu thành một mảng
            const dataArray = Object.entries(data).map(([key, value]) => ({key, ...value }));
  
            // Sắp xếp mảng theo trường "listen" giảm dần
            const sortedArray = dataArray.sort((a, b) => b.listen - a.listen);
            // Xử lý dữ liệu tại đây
            dispatch(setRanking(sortedArray));
          });

        // const res = await get(rankingQuery);
        // console.log(res.val())
        // dispatch(setRanking(sortedQuery));
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
            console.log(action.payload)
        }
    }
})

export const { setRanking } = rankingSlice.actions;
export default rankingSlice.reducer;