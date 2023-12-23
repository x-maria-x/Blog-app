import { configureStore } from '@reduxjs/toolkit'

import articlesReduser from './articlesSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: { articles: articlesReduser, user: userSlice },
})

export default store
