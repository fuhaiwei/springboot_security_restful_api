import { useAppSelector } from '#A/hooks'
import { Card, Space } from 'antd'
import { Login } from './view-login'
import { Profile } from './view-profile'

export function Session() {
  const session = useAppSelector((state) => state.session)
  return (
    <div className="Session">
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
        {session.hasBasic ? <Profile /> : <Login />}
      </Space>
    </div>
  )
}
