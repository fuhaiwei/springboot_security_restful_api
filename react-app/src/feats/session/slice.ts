import { fetchResult } from '#H/UseResult'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message, Modal } from 'antd'

interface SessionState {
  userName: string
  hasBasic: boolean
  hasAdmin: boolean
  userRoles: string[]
}

const initialState: SessionState = {
  userName: 'Guest',
  hasBasic: false,
  hasAdmin: false,
  userRoles: ['NONE'],
}

export const sessionQuery = createAsyncThunk('session/query', async () => {
  const token = localStorage['session-token']
  const result = await fetchResult<SessionState>('/api/session', {
    headers: { 'session-token': token },
  })
  return result.data
})

interface LoginForm {
  username: string
  password: string
}

export const sessionLogin = createAsyncThunk('session/login', async (from: LoginForm) => {
  const result = await fetchResult<SessionState>('/api/session', {
    method: 'POST',
    body: JSON.stringify(from),
  })
  return result.data
})

export const sessionLogout = createAsyncThunk('session/logout', async () => {
  const result = await fetchResult<SessionState>('/api/session', {
    method: 'DELETE',
  })
  return result.data
})

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    sessionUpdate(_, action: any) {
      if (action.payload.isLogged) {
        message.success('You have successfully logged in')
      }
      return action.payload
    },
    sessionReject(_, action: any) {
      const { name, message } = action.error
      Modal.error({ title: name, content: message })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sessionQuery.fulfilled, sessionSlice.caseReducers.sessionUpdate)
    builder.addCase(sessionQuery.rejected, sessionSlice.caseReducers.sessionReject)

    builder.addCase(sessionLogin.fulfilled, sessionSlice.caseReducers.sessionUpdate)
    builder.addCase(sessionLogin.rejected, sessionSlice.caseReducers.sessionReject)

    builder.addCase(sessionLogout.fulfilled, () => initialState)
    builder.addCase(sessionLogout.rejected, () => initialState)
  },
})

export const {} = sessionSlice.actions

export default sessionSlice.reducer
