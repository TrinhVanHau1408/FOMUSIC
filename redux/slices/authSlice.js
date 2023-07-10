import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth, signInWithEmailAndPassword, firebaseDatabaseRef, get, child, firebaseDatabase } from '../firebase/connectDB';
import { auth, fetchSignInMethodsForEmail, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, verifyPasswordResetCode } from '../../firebase/connectDB';
import {saveDataAsyncStorage} from '../../utilities/AsyncStorage';
// import { sendPasswordResetEmail } from 'firebase/auth';
export const logIn = createAsyncThunk('auth/logIn', async ({email, password}, { rejectWithValue }) => {
    // console.log('user/getUser', email + ',' + password)
    try {
        const respone = await signInWithEmailAndPassword(auth, email, password);
        // debugger
        if (respone.user) {
            const user = {
                uid: respone.user.uid,
                email: respone.user.email,
                emailVerified: respone.user.emailVerified,
                email: respone.user.email,
                provider: respone.user.id,
            }
    
            // Khi login thành công thì sẽ lưu trạng thái đăng nhập vào AsyncStrogae
            saveDataAsyncStorage("userUid", user.uid);

            console.log('Login succes');
            return user;
        } 

        console.log("Login fail")
        return null;
       
        
    } catch (error) {
        // console.log('error')
        return rejectWithValue(error.message);
    }
});

export const logOut = createAsyncThunk('auth/logout', async({},{ rejectWithValue } ) => {
    try {
        const respone = await signOut(auth);
        console.log(respone);
        return true;
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async({email},{ rejectWithValue } ) => {
    try {
        const user = fetchSignInMethodsForEmail(auth, email);
        const respone = await sendEmailVerification(user);
        console.log(respone);
        return true;
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null,
        loading: false,
        error: null
    },
    reducers: {
        Logout: (state) => {
            state.auth = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state) => {
            state.loading = true;
            console.log("logIn pending");
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.loading = false;
            state.auth = action.payload;
            console.log("logIn fulfilled");
        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("logIn rejected");
        })
        builder.addCase(logOut.pending, (state) => {
            state.loading = true;
            console.log("logOut pending");
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.loading = false;
            state.auth = action.payload;;
            console.log("logOut fulfilled");
        })
        builder.addCase(logOut.rejected, (state) => {
            state.loading = false;
            console.log("logOut rejected");
        })
       
    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer;