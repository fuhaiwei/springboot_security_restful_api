import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom"
import { Radio } from 'antd'
import './App.css'

import Login from "./comps/Login"
import AddUser from "./comps/AddUser"
import ListUser from "./comps/ListUser"


export default function App() {

  const [session, setSession] = useState({})

  const isAdmin = session?.userRoles?.some(r => r === 'ROLE_ADMIN') === true

  const history = useHistory()

  return (
    <div className="App">
      <Radio.Group onChange={(e) => history.push(e.target.value)}>
        <Radio.Button value="/">Login</Radio.Button>
        <Radio.Button value="/user_list">UserList</Radio.Button>
        <Radio.Button value="/user_add">UserAdd</Radio.Button>
      </Radio.Group>
      <Switch>
        <Route exact path="/">
          <Login onQuery={setSession} session={session} />
        </Route>
        <Route path="/user_list">
          <ListUser isAdmin={isAdmin} />
        </Route>
        <Route path="/user_add">
          <AddUser />
        </Route>
      </Switch>
    </div >
  )

}
