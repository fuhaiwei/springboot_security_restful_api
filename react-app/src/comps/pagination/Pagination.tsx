import { Page } from '#H/UseResult'
import { Pagination } from 'antd'
import { useCallback } from 'react'

interface Props {
  page?: Page
  onChange: (page: number, size?: number) => void
}

export function MyPagination({ page, onChange }: Props) {
  const onChangePage = useCallback(
    (page: number, size?: number) => onChange(page, size),
    [onChange]
  )
  if (page === undefined) return null
  return (
    <Pagination
      showSizeChanger
      showQuickJumper
      pageSize={page.pageSize}
      current={page.currentPage}
      total={page.totalElements}
      onChange={onChangePage}
      onShowSizeChange={onChangePage}
      pageSizeOptions={[10, 20, 30, 40]}
    />
  )
}
