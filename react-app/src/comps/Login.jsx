import React, { useEffect, useCallback } from 'react'
import { Button, Input, Modal } from 'antd'
import { loginManager } from '../utils/manager'
import { KeyOutlined, UserOutlined } from "@ant-design/icons"

export default function Login({ onQuery, session }) {

  const isLogged = session?.isLogged === true

  const query = useCallback(async () => {
    const result = await loginManager.query()

    if (result.success) {
      onQuery(result.data)
    } else {
      Modal.error({ title: 'Query Current User Error', content: result.message })
    }
  }, [onQuery])

  useEffect(() => {
    query()
  }, [query])

  async function login() {
    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value

    if (!username || !password) {
      Modal.warning({ title: 'Check Input', content: 'You must input username and password' })
      return
    }

    const result = await loginManager.login(username, password)

    if (result.success) {
      onQuery(result.data)
    } else {
      Modal.error({ title: 'Login Error', content: result.message })
    }
  }

  async function logout() {
    const result = await loginManager.logout()

    if (result.success) {
      onQuery(result.session)
    } else {
      Modal.error({ title: 'Login Error', content: result.message })
    }
  }

  if (isLogged) {
    return (
      <div>
        <div style={{ padding: 20 }}>
          <h3>{session.userName}, You have successfully logged in</h3>
        </div>
        <div style={{ padding: 10 }}>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
        <Input
          id="login-username"
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Please enter username"
          onPressEnter={() => document.querySelector('#login-password').focus()}
        />
      </div>
      <div style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
        <Input
          id="login-password"
          type="password"
          prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Please enter password"
          onPressEnter={login}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Button onClick={login}>Login</Button>
      </div>
      <div style={{ padding: 10 }}>
        <h3>There are two default users here</h3>
        <h3>Admin User: name is <b>admin</b> and pass is <b>admin</b></h3>
        <h3>Basic User: name is <b>user</b> and pass is <b>user</b></h3>
      </div>
    </div>
  )

}
