import { configureStore } from '@reduxjs/toolkit'
import credReducer from './features/info.jsx'

export default configureStore({
  reducer: {
    cred: credReducer
   },
})