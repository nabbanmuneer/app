import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, id: null, role: null },
    reducers: {
        setCredentials: (state, action) => {
            const { foundUser, accessToken } = action.payload;
            state.role = foundUser.position
            state.id = foundUser._id
            state.user = foundUser.userName
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.role = null
            state.id = null
            state.user = null
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentId = (state) => state.id
export const selectCurrentUser = (state) => state.user
export const selectCurrentToken = (state) => state.token
export const selectCurrentRole = (state) => state.role
