import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('posts/fetchArticles', async (offset = 0) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))

  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  const data = await response.json()
  return data
})

export const fetchArticle = createAsyncThunk('posts/fetchArticle', async (slug) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))

  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  const data = await response.json()
  return data.article
})

export const createArticle = createAsyncThunk('posts/createArticle', async (dataToSend) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(dataToSend),
  })

  if (!response.ok) {
    const rb = response.body
    const reader = rb.getReader()

    const stream = await new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
            push()
          })
        }

        push()
      },
    })

    const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()

    throw new Error(res)
  }

  const data = await response.json()
  return data
})

export const updateArticle = createAsyncThunk('posts/updateArticle', async (props) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch(`https://blog.kata.academy/api/articles/${props.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(props.dataToSend),
  })

  if (!response.ok) {
    const rb = response.body
    const reader = rb.getReader()

    const stream = await new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
            push()
          })
        }

        push()
      },
    })

    const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()

    throw new Error(res)
  }

  const data = await response.json()

  return data
})

export const deleteArticle = createAsyncThunk('posts/deleteArticle', async (slug) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!response.ok) {
    const rb = response.body
    const reader = rb.getReader()

    const stream = await new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
            push()
          })
        }

        push()
      },
    })

    const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()

    throw new Error(res)
  }
  window.location.href = '/articles'
})

export const favoriteArticle = createAsyncThunk('posts/favoriteArticle', async (slug) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!response.ok) {
    const rb = response.body
    const reader = rb.getReader()

    const stream = await new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
            push()
          })
        }

        push()
      },
    })

    const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()

    throw new Error(res)
  }

  const data = await response.json()
  return data
})

export const unfavoriteArticle = createAsyncThunk('posts/unfavoriteArticle', async (slug) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!response.ok) {
    const rb = response.body
    const reader = rb.getReader()

    const stream = await new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            controller.enqueue(value)
            push()
          })
        }

        push()
      },
    })

    const res = await new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()

    throw new Error(res)
  }

  const data = await response.json()
  return data
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    currentPage: 1,
    articles: [],
    article: null,
    loading: null,
    error: null,
    status: null,
  },
  reducers: {
    pageChange(state, action) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = null
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
        state.status = null
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
      .addCase(createArticle.pending, (state) => {
        state.status = null
        state.loading = true
        state.error = null
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.status = 'fulfilled'
        state.loading = false
        state.error = null
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.status = 'fulfilled'
        state.loading = false
        state.error = null
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteArticle.pending, (state) => {
        state.error = null
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'fulfilled'
        state.error = null
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(favoriteArticle.pending, (state) => {
        state.error = null
      })
      .addCase(favoriteArticle.fulfilled, (state) => {
        state.error = null
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(unfavoriteArticle.pending, (state) => {
        state.error = null
      })
      .addCase(unfavoriteArticle.fulfilled, (state) => {
        state.error = null
      })
      .addCase(unfavoriteArticle.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { pageChange } = articlesSlice.actions
export default articlesSlice.reducer
