import { appDispatch } from '#A/store'
import { encodePassword } from '#A/utils'
import { sessionLogin } from '#F/session/slice'
import { Button, Card, Form, Input, Modal, Space } from 'antd'
import { useState } from 'react'
import { postRegister } from './service'

export function Login() {
  const [onLogin, setOnLogin] = useState(true)

  const onFinish = (values: any) => {
    const encode = encodePassword(values.username, values.password)
    const form = { ...values, password: encode }
    if (onLogin) {
      appDispatch(sessionLogin(form))
    } else {
      postRegister(form)
    }
  }

  const onFinishFailed = () => {
    Modal.warn({ title: 'Verification failed', content: 'Please check the form' })
  }

  return (
    <Card title={onLogin ? 'Login' : 'Register'} style={{ width: 320 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              {onLogin ? 'Login' : 'Register'}
            </Button>
            <Button
              type="link"
              onClick={() => {
                setOnLogin(!onLogin)
              }}
            >
              {onLogin ? 'toRegister' : 'toLogin'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
