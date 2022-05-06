import { useNav } from '#A/hooks'
import { sessionQuery } from '#F/session/slice'
import { Console } from '#P/console/container'
import NotFound from '#P/notfound/NotFound'
import { Session } from '#P/session/container'
import { Users } from '#P/users/container'
import { BarChartOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useEffect } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.scss'
import { appDispatch } from './store'

const items: ItemType[] = [
  { label: 'Users', icon: <UserOutlined />, key: '/users' },
  { label: 'Session', icon: <UserOutlined />, key: '/session' },
  { label: 'Console', icon: <BarChartOutlined />, key: '/console' },
  {
    label: 'Source',
    icon: <GithubOutlined />,
    key: 'https://github.com/fuhaiwei/springboot_security_restful_api',
  },
]

function addNavLink(item: any) {
  if (item.children) {
    item.children.forEach(addNavLink)
  } else if (item.key.startsWith('http')) {
    item.label = (
      <a href={item.key} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  } else {
    item.label = <NavLink to={item.key}>{item.label}</NavLink>
  }
}

items.forEach(addNavLink)

function App() {
  const { pathname } = useNav()
  useEffect(() => {
    appDispatch(sessionQuery())
  }, [])
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Menu selectedKeys={[pathname]} mode="horizontal" items={items} />
          </Header>
          <Content style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/session" />} />
              <Route path="/users" element={<Users />} />
              <Route path="/session" element={<Session />} />
              <Route path="/console" element={<Console />}>
                <Route path=":name" />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
