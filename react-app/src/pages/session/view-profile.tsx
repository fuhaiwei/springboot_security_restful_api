import { appDispatch } from '#A/store'
import { sessionLogout } from '#F/session/slice'
import { IUser } from '#P/users/service'
import { useRequest } from 'ahooks'
import { Alert, Button, Card } from 'antd'
import dayjs from 'dayjs'
import { findCurrnet } from './service'

export function Profile() {
  const { data: user, error } = useRequest(findCurrnet)
  const extra = (
    <Button type="link" onClick={() => appDispatch(sessionLogout())}>
      Logout
    </Button>
  )
  return (
    <Card title="Profile" extra={extra} style={{ width: 320 }}>
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
      {user && (
        <>
          <p>ID: {renderId(user)}</p>
          <p>Name: {renderName(user)}</p>
          <p>Roles: {renderRoles(user)}</p>
          <p>Enabled: {renderEnabled(user)}</p>
          <p>CreateOn: {renderCreateOn(user)}</p>
          <p>AccessOn: {renderAccessOn(user)}</p>
        </>
      )}
    </Card>
  )
}

export function renderId(row: IUser) {
  return row.id
}

export function renderName(row: IUser) {
  return row.username
}

export function renderRoles(row: IUser) {
  return row.roles.join(',')
}

export function renderEnabled(row: IUser) {
  return row.enabled ? 'Enabled' : 'Disabled'
}

export function renderCreateOn(row: IUser) {
  return dayjs(row.createOn).format('YY-MM-DD HH:mm:ss')
}

export function renderAccessOn(row: IUser) {
  if (row.accessOn === undefined) return '---'
  return dayjs(row.accessOn).format('YY-MM-DD HH:mm:ss')
}
