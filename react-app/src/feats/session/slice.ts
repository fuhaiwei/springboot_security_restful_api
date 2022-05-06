import { fetchResult } from '#H/UseResult'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

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
    failureName: 'Login Failid',
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
  },
  extraReducers: (builder) => {
    builder.addCase(sessionQuery.fulfilled, sessionSlice.caseReducers.sessionUpdate)
    builder.addCase(sessionLogin.fulfilled, sessionSlice.caseReducers.sessionUpdate)
    builder.addCase(sessionLogout.fulfilled, () => initialState)
    builder.addCase(sessionLogout.rejected, () => initialState)
  },
})

export default sessionSlice.reducer
