import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialStateUser = {
  email: null,
  token: null,
  username: null,
  bio: null,
  image: null,
}

export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
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
  localStorage.setItem('Authorization', JSON.stringify(data.user.token))

  return data.user
})

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
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
  localStorage.setItem('Authorization', JSON.stringify(data.user.token))
  return data.user
})

export const logOut = createAsyncThunk('user/logOut', async () => {
  localStorage.removeItem('Authorization')
  return initialStateUser
})

export const getUser = createAsyncThunk('user/getUser', async (token) => {
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
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
  localStorage.setItem('Authorization', JSON.stringify(data.user.token))
  return data.user
})

export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
  const token = JSON.parse(localStorage.getItem('Authorization'))
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(user),
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
  return data.user
})

const userSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: null,
    error: null,
    user: {
      ...initialStateUser,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearError } = userSlice.actions

export default userSlice.reducer
