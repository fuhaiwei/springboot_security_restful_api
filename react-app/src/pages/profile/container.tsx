import { useAppSelector } from '#A/hooks'
import { dispatch } from '#A/store'
import { MyHeader } from '#C/header/Header'
import { sessionLogout } from '#F/session/slice'
import { Button, Card, Space } from 'antd'
import { Login } from './login'

export function Profile() {
  const session = useAppSelector((state) => state.session)
  return (
    <div className="Profile">
      <MyHeader title="Profile" />
      <Space className="row-stretch">
        <Card title="Session" style={{ width: 240 }}>
          <p>Username: {session.userName}</p>
          <p>hasBasic: {String(session.hasBasic)}</p>
          <p>hasAdmin: {String(session.hasAdmin)}</p>
          <p>userRoles:</p>
          {session.userRoles.map((role) => (
            <ul key={role}>{role}</ul>
          ))}
        </Card>
        {!session.hasBasic ? (
          <Card title="Login From" style={{ width: 320 }}>
            <Login />
          </Card>
        ) : (
          <Card title="Login Form" style={{ width: 320 }}>
            <Button type="primary" onClick={() => dispatch(sessionLogout())}>
              Logout
            </Button>
          </Card>
        )}
      </Space>
    </div>
  )
}
