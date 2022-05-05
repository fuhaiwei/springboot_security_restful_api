import { dispatch } from '#A/store'
import { encodePassword } from '#A/utils'
import { sessionLogin } from '#F/session/slice'
import { Button, Form, Input, Modal } from 'antd'

export function Login() {
  const onFinish = (values: any) => {
    const encode = encodePassword(values.username, values.password)
    dispatch(sessionLogin({ ...values, password: encode }))
  }

  const onFinishFailed = () => {
    Modal.warn({ title: 'Verification failed', content: 'Please check the form' })
  }

  return (
    <div className="Login">
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
