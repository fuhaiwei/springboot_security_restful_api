import { useNav } from '#A/hooks'
import { Console } from '#P/console/container'
import NotFound from '#P/notfound/NotFound'
import { BarChartOutlined, GithubOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.scss'

const items: ItemType[] = [
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
              <Route path="/" element={<Navigate to="/console" />} />
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
