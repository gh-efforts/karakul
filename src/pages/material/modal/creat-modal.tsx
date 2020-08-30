import React from 'react'
import { Form, Input, Button } from 'antd'
import styles from './index.module.scss'
function CreateModalView(): React.ReactElement {
  const [form] = Form.useForm()
  return (
    <div>
      <span>订单编号：1234</span>
      <div className={styles.content}>
        <div>
          <Form layout={'inline'} form={form}>
            <Form.Item name='layout'>
              <Input size='large' placeholder='input placeholder' />
            </Form.Item>
            <Form.Item>
              <Input size='large' placeholder='input placeholder' />
            </Form.Item>
            <Form.Item>
              <Input size='large' placeholder='input placeholder' />
            </Form.Item>
            <Form.Item>
              <Input size='large' placeholder='input placeholder' />
            </Form.Item>
            <Form.Item>
              <Button type='link'>保存</Button>
              <Button type='text'>清空</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default CreateModalView
