import {createSlice} from '@reduxjs/toolkit';

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState: null,
    reducers: {
        signin: (state, action) => {
            return state = action.payload;
        },
        signout: (state, action) => {
            return state = null;
        },
    },
})

export const {signin, signout} = authUserSlice.actions;
export default authUserSlice.reducer;