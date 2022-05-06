import { useNav } from '#A/hooks'
import { MyCheckbox } from '#C/checkbox/Checkbox'
import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import { useSerach } from '#H/useSearch'
import { useRequest } from 'ahooks'
import { Radio, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { allNames, allTypes, findAll, Message, Name, Search } from './service'

const typeOptions = allTypes.map((e) => ({ label: e, value: e }))

export function Console() {
  const { navigate } = useNav()
  const { name = 'SERVER_CORE' } = useParams<{ name: Name }>()
  const [search, setSearch] = useSerach<Search>(undefined, { arrayNames: ['types'] })
  const { data, ...state } = useRequest(() => findAll(name, search), {
    refreshDeps: [name, search],
  })
  const msgs = data?.data
  const page = data?.page

  const onChange = (page: number, size: number = 20) => {
    setSearch({ page, size })
  }

  return (
    <div className="Console">
      <MyHeader
        state={state}
        title="Console"
        extra={
          <Radio.Group value={name} onChange={(e) => navigate(`/console/${e.target.value}`)}>
            {allNames.map((e) => (
              <Radio key={e} value={e}>
                {e}
              </Radio>
            ))}
          </Radio.Group>
        }
        children={
          <MyCheckbox
            allSelectText="ALL"
            value={search.types}
            options={typeOptions}
            onChange={(values) => setSearch({ types: values })}
          />
        }
      />
      <Table dataSource={msgs} rowKey="id" pagination={false}>
        <Column width={170} title="Date" key="date" render={renderDate} />
        <Column title="Type" key="Type" render={renderType} />
        <Column title="Content" key="content" render={renderContent} />
      </Table>
      {page && <MyPagination page={page} onChange={onChange} />}
    </div>
  )
}

function renderDate(row: Message) {
  return dayjs(row.createOn).format('YYYY-MM-DD HH:mm:ss')
}

function renderType(row: Message) {
  return row.type
}

function renderContent(row: Message) {
  return row.text
}
