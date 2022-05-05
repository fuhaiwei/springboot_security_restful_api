import { Alert, Button, PageHeader, PageHeaderProps, Space } from 'antd'

const defaultOnBack = () => window.history.back()

interface State {
  error?: { name: string; message: string }
  loading?: boolean
  refresh?: () => void
}

interface Props extends PageHeaderProps {
  state?: State
  error?: { name: string; message: string }
  loading?: boolean
  refresh?: () => void
}

export function MyHeader(props: Props) {
  const { state, title, ...other } = props
  const { error, loading, refresh } = state ?? props
  const lastTitle = (
    <Space>
      {title}
      {refresh && (
        <Button loading={loading} onClick={refresh}>
          刷新
        </Button>
      )}
    </Space>
  )
  return (
    <div className="MyHeader">
      <PageHeader title={lastTitle} onBack={defaultOnBack} {...other} />
      {error && <Alert type="error" message={`${error.name}: ${error.message}`} />}
    </div>
  )
}
