import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import {
  renderAccessOn,
  renderCreateOn,
  renderEnabled,
  renderId,
  renderName,
  renderRoles,
} from '#P/session/view-profile'
import useUrlState from '@ahooksjs/use-url-state'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { findAll, Search } from './service'

export function Users() {
  const [search, setSearch] = useUrlState<Search>()
  const { data, ...state } = useRequest(() => findAll(search), { refreshDeps: [search] })
  const { data: users, page } = data ?? {}
  return (
    <div className="Users">
      <MyHeader state={state} title="Users" />
      <Table dataSource={users} rowKey="id">
        <Column title="ID" render={renderId} />
        <Column title="Name" render={renderName} />
        <Column title="Roles" render={renderRoles} />
        <Column title="Enabled" render={renderEnabled} />
        <Column title="CreateOn" render={renderCreateOn} />
        <Column title="AccessOn" render={renderAccessOn} />
      </Table>
      <MyPagination page={page} onChange={(page, size) => setSearch({ page, size })} />
    </div>
  )
}
