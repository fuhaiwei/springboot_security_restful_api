import React from 'react'
import { Button, Input, Modal, message } from 'antd'
import { Manager, md5Password } from '../utils/manager'
import { KeyOutlined, UserOutlined } from "@ant-design/icons"

const userManager = new Manager('/api/admin/users')

export default function AddUser() {

  async function addUser() {
    const username = document.querySelector('#add-username').value
    const password = document.querySelector('#add-password').value

    if (!username | !password) {
      Modal.warning({ title: 'Check Input', content: 'You must input username and password' })
      return
    }

    const encode = password ? md5Password(username, password) : ''
    const result = await userManager.addOne({
      username, password: encode
    })

    if (result.success) {
      message.success('Add User Success')
    } else {
      Modal.error({ title: 'Add User Error', content: result.message })
    }
  }

  return (
    <div>
      <div style={{ padding: 20 }}>
        <h3>Only administrators can add user</h3>
      </div>
      <div style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
        <Input
          id="add-username"
          maxLength={20}
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Please enter username"
          onPressEnter={() => document.querySelector('#add-password').focus()}
        />
      </div>
      <div style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
        <Input
          id="add-password"
          type="password"
          maxLength={20}
          prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Please enter password"
          onPressEnter={addUser}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Button onClick={addUser}>Save</Button>
      </div>
    </div>
  )

}
