import React, {Component} from 'react'
import {Button, Checkbox, Icon, Input, Modal, Tabs} from 'antd'
import Table from './lib/table'
import {loginManager, Manager, md5Password} from './utils/manager'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.userManager = new Manager('/api/admin/users')
  }

  componentDidMount() {
    this.query()
  }

  async query() {
    const result = await loginManager.query()

    if (result.success) {
      this.setState({...this.state, session: result.data})
    } else {
      Modal.error({title: 'Query Current User Error', content: result.message})
    }
  }

  login = async () => {
    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value

    if (!username || !password) {
      Modal.warning({title: 'Check Input', content: 'You must input username and password'})
      return
    }

    const result = await loginManager.login(username, password)

    if (result.success) {
      this.setState({...this.state, session: result.data})
    } else {
      Modal.error({title: 'Login Error', content: result.message})
    }
  }

  logout = async () => {
    const result = await loginManager.logout()

    if (result.success) {
      this.setState({...this.state, session: result.session})
    } else {
      Modal.error({title: 'Login Error', content: result.message})
    }

  }

  listUser = async () => {
    const result = await this.userManager.findAll()

    if (result.success) {
      this.setState({...this.state, users: result.data})
    } else {
      Modal.error({title: 'Update User List Error', content: result.message})
    }
  }

  addUser = async () => {
    const username = document.querySelector('#add-username').value
    const password = document.querySelector('#add-password').value

    if (!username | !password) {
      Modal.warning({title: 'Check Input', content: 'You must input username and password'})
      return
    }

    const encode = password ? md5Password(username, password) : ''
    const result = await this.userManager.addOne({
      username, password: encode
    })

    if (result.success) {
      this.setState({...this.state, users: [...this.state.users, result.data]})
    } else {
      Modal.error({title: 'Add User Error', content: result.message})
    }
  }

  editUser = async (id) => {
    const username = document.querySelector('#edit-username').value
    const password = document.querySelector('#edit-password').value
    const enabled = document.querySelector('#edit-enabled input').checked

    if (!username) {
      Modal.warning({title: 'Check Input', content: 'You must input username'})
      return
    }

    const encode = password ? md5Password(username, password) : ''
    const result = await this.userManager.update({
      id, username, password: encode, enabled
    })

    if (result.success) {
      this.setState({...this.state, users: this.replace(id, result)})
    } else {
      Modal.error({title: 'Edit User Error', content: result.message})
    }
  }

  replace(id, result) {
    return this.state.users.map(user => user.id === id ? result.data : user)
  }

  showEditConfirm(user) {
    Modal.confirm({
      title: 'Edit User',
      okText: 'Save',
      okType: 'primary',
      onOk: () => this.editUser(user.id),
      cancelText: 'Cancel',
      content: (
        <div>
          <div style={{padding: 10}}>
            <Input
              id="edit-username"
              defaultValue={user.username}
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Please input username"
            />
          </div>
          <div style={{padding: 10}}>
            <Input
              id="edit-password"
              type="password"
              prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Leave blank if you do not need to change password"
            />
          </div>
          <div id="edit-enabled" style={{padding: 10}}>
            <Checkbox defaultChecked={user.enabled}>启用</Checkbox>
          </div>
        </div>
      ),
    })
  }

  columns = [
    {key: 'id', title: '#', format: (t) => t.id},
    {key: 'username', title: 'Name', format: (t) => t.username},
    {key: 'enabled', title: 'Enabled', format: (t) => t.enabled ? 'Yes' : 'No'},
    {key: 'control', title: 'Control', format: (t) => this.buildLink(t)},
  ]

  buildLink(t) {
    return <i style={{cursor: 'pointer'}} onClick={() => this.showEditConfirm(t)}>Edit</i>
  }

  renderTestLogin_Logged() {
    return (
      <div>
        <h3>{this.state.session.userName}, You have successfully logged in !</h3>
        <div style={{padding: 10}}>
          <Button onClick={this.logout}>Logout</Button>
        </div>
      </div>
    )
  }

  renderTestLogin_Logout() {
    return (
      <div>
        <div style={{padding: 10}}>
          <Input
            id="login-username"
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            placeholder="Please enter username"
            onPressEnter={() => document.querySelector('#login-password').focus()}
          />
        </div>
        <div style={{padding: 10}}>
          <Input
            id="login-password"
            type="password"
            prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
            placeholder="Please enter password"
            onPressEnter={this.login}
          />
        </div>
        <div style={{padding: 10}}>
          <Button onClick={this.login}>Login</Button>
        </div>
        <div style={{padding: 10}}>
          <h3>There are two default users here</h3>
          <h3>Admin Role User: name is admin and pass is 123456</h3>
          <h3>Basic Role User: pass is test and pass is test</h3>
        </div>
      </div>
    )
  }

  renderUserList() {
    return (
      <Tabs.TabPane tab="User List" key="2">
        <div style={{padding: 10}}>
          <h3>This page must be administrator to access</h3>
        </div>
        <div style={{padding: 10}}>
          <Button onClick={this.listUser}>Update User List</Button>
        </div>
        {this.state.users && (
          <Table rows={this.state.users} columns={this.columns}/>
        )}
      </Tabs.TabPane>
    )
  }

  renderAddUser() {
    return (
      <Tabs.TabPane tab="Add User" key="3">
        <div style={{padding: 10}}>
          <h3>This page must be logged in to access</h3>
        </div>
        <div>
          <div style={{padding: 10}}>
            <Input
              id="add-username"
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Please enter username"
              onPressEnter={() => document.querySelector('#add-password').focus()}
            />
          </div>
          <div style={{padding: 10}}>
            <Input
              id="add-password"
              type="password"
              prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Please enter password"
              onPressEnter={this.addUser}
            />
          </div>
          <div style={{padding: 10}}>
            <Button onClick={this.addUser}>Save</Button>
          </div>
        </div>
      </Tabs.TabPane>
    )
  }

  render() {
    const isLogged = this.state.session && this.state.session.isLogged
    const isAdmin = isLogged && this.state.session.userRoles.some(r => r === 'ROLE_ADMIN')

    return (
      <div className="App">
        <Tabs>
          <Tabs.TabPane tab="Login Test" key="1">
            {isLogged && this.renderTestLogin_Logged()}
            {!isLogged && this.renderTestLogin_Logout()}
          </Tabs.TabPane>
          {isAdmin && this.renderUserList()}
          {isLogged && this.renderAddUser()}
        </Tabs>
      </div>
    )
  }
}

export default App
