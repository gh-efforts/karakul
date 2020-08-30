import React, { useState } from 'react'
import { Form, Input, Button, Upload } from 'antd'
import styles from './index.module.scss'
import { message } from '../../../../components'
import { PlusOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
export default function EditForm() {
  const [form] = Form.useForm()
  return (
    <div className={styles['edit-form']}>
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
  )
}
function beforeUpload(file: { type: string; size: number }) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
function RemarkFrom() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handleChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setFileList(fileList)
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className='ant-upload-text'>上传图片</div>
    </div>
  )
  return (
    <div className={styles['rename-form']}>
      <Form layout={'vertical'} form={form}>
        <Form.Item label='附件' name='附件'>
          <Input.TextArea placeholder='input placeholder' autoSize={{ minRows: 5, maxRows: 7 }} />
        </Form.Item>
        <Form.Item>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            fileList={fileList}
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {fileList?.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label='备注' name='备注'>
          <Input size='large' placeholder='input placeholder' />
        </Form.Item>
      </Form>
    </div>
  )
}

export { RemarkFrom }
