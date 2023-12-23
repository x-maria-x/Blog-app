import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('posts/fetchArticles', async (offset = 0) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)

  const data = await response.json()
  return data
})

export const fetchArticle = createAsyncThunk('posts/fetchArticle', async (slug) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)

  const data = await response.json()
  return data.article
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    currentPage: 1,
    articles: [],
    article: null,
    loading: null,
    error: null,
  },
  reducers: {
    pageChange(state, action) {
      state.currentPage = action.payload
    },
    createArticles() {},
    updateArticles() {},
    deleteArticles() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articles = []
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload
        state.error = null
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchArticle.pending, (state) => {
        state.article = null
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false
        state.article = action.payload
        state.error = null
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { pageChange, createArticles, updateArticles, deleteArticles } = articlesSlice.actions
export default articlesSlice.reducer
