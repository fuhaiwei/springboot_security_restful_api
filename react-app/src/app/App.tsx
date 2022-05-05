import { useNav } from '#A/hooks'
import { sessionQuery } from '#F/session/slice'
import { Console } from '#P/console/container'
import NotFound from '#P/notfound/NotFound'
import { Profile } from '#P/profile/container'
import { BarChartOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useEffect } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.scss'
import { dispatch } from './store'

const items: ItemType[] = [
  { label: 'Profile', icon: <UserOutlined />, key: '/profile' },
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
    dispatch(sessionQuery())
  }, [])
  console.log(`render: App, key=${pathname}`)
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Menu selectedKeys={[pathname]} mode="horizontal" items={items} />
          </Header>
          <Content style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/console" element={<Console />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
