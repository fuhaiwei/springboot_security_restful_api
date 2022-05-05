import { MyCheckbox } from '#C/checkbox/Checkbox'
import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import { useRequest, useSetState } from 'ahooks'
import { Radio, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import { useState } from 'react'
import { allNames, allTypes, findAll, Message, Name, Options } from './service'

const typeOptions = allTypes.map((e) => ({ label: e, value: e }))

export function Console() {
  const [name, setName] = useState<Name>('SERVER_CORE')
  const [options, setOptions] = useSetState<Options>({ types: [...allTypes] })
  const { data, ...state } = useRequest(() => findAll(name, options), {
    refreshDeps: [name, options],
  })
  const msgs = data?.data
  const page = data?.page

  const onChange = (page: number, size: number = 20) => {
    setOptions({ page, size })
  }

  console.log(`render Console: loading=${state.loading} data=${data !== undefined}`)
  return (
    <div className="Console">
      <MyHeader
        state={state}
        title="Console"
        extra={
          <Radio.Group value={name} onChange={(e) => setName(e.target.value)}>
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
            value={options.types}
            options={typeOptions}
            onChange={(e) => setOptions({ types: e as any })}
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
