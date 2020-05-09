import React, { useState, useEffect, useCallback } from 'react'
import { Button, Checkbox, Input, Modal } from 'antd'
import { KeyOutlined, UserOutlined } from "@ant-design/icons"
import { Manager, md5Password } from '../utils/manager'
import Table from '../lib/table'

const userManager = new Manager('/api/admin/users')

export default function Users({ isAdmin }) {

  const [users, setUsers] = useState([])

  const listUser = useCallback(async () => {
    const result = await userManager.findAll()
    if (result.success) {
      setUsers(result.data)
    } else {
      Modal.error({ title: 'Update User List Error', content: result.message })
    }
  }, [setUsers])

  useEffect(() => {
    isAdmin && listUser()
  }, [isAdmin, listUser])

  const columns = [
    { key: 'id', title: '#', format: (t) => t.id },
    { key: 'username', title: 'Name', format: (t) => t.username },
    { key: 'enabled', title: 'Enabled', format: (t) => t.enabled ? 'Yes' : 'No' },
    { key: 'control', title: 'Control', format: (t) => buildLink(t) },
  ]

  function buildLink(t) {
    return <i style={{ cursor: 'pointer' }} onClick={() => showEditConfirm(t)}>Edit</i>
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Only administrators can view this page</h3>
      </div>
    )
  }

  return (
    <div>
      <div style={{ padding: 20 }}>
        <h3>You are administrators</h3>
      </div>
      <Table rows={users} columns={columns} />
    </div>
  )

  async function editUser(id) {
    const username = document.querySelector('#edit-username').value
    const password = document.querySelector('#edit-password').value
    const enabled = document.querySelector('#edit-enabled input').checked

    if (!username) {
      Modal.warning({ title: 'Check Input', content: 'You must input username' })
      return
    }

    const encode = password ? md5Password(username, password) : ''
    const result = await userManager.update({
      id, username, password: encode, enabled
    })

    if (result.success) {
      setUsers(replace(id, result))
    } else {
      Modal.error({ title: 'Edit User Error', content: result.message })
    }
  }

  function replace(id, result) {
    return users.map(user => user.id === id ? result.data : user)
  }

  function showEditConfirm(user) {
    Modal.confirm({
      title: 'Edit User',
      okText: 'Save',
      okType: 'primary',
      onOk: () => editUser(user.id),
      cancelText: 'Cancel',
      content: (
        <div>
          <div style={{ padding: 10 }}>
            <Input
              id="edit-username"
              defaultValue={user.username}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Please input username"
            />
          </div>
          <div style={{ padding: 10 }}>
            <Input
              id="edit-password"
              type="password"
              prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Leave blank if you do not need to change password"
            />
          </div>
          <div id="edit-enabled" style={{ padding: 10 }}>
            <Checkbox defaultChecked={user.enabled}>启用</Checkbox>
          </div>
        </div>
      ),
    })
  }


}
