import { createSlice } from '@reduxjs/toolkit'

export const credSlice = createSlice({
  name: 'cred',
  initialState: {
    isLoggedIn: false,
    role:null,
    token: '',
    refreshToken: ''
  },
  reducers: {
    setCred: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.token = action.payload.token
        state.role = action.payload.role
        state.refreshToken = action.payload.refreshToken
    },
    
  },
})

export const { setCred } = credSlice.actions

export default credSlice.reducer