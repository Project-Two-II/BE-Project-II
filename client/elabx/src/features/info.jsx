import { createSlice } from '@reduxjs/toolkit'

export const credSlice = createSlice({
  name: 'cred',
  initialState: {
    isLoggedIn: false,
    role:null,
    token: '',
  },
  reducers: {
    setCred: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.token = action.payload.token
        state.role = action.payload.role
    },
    
  },
})

export const { setCred } = credSlice.actions

export default credSlice.reducer