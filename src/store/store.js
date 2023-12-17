import { configureStore } from '@reduxjs/toolkit'

import articlesReduser from './articlesSlice'

const store = configureStore({
  reducer: { articles: articlesReduser },
})

export default store
