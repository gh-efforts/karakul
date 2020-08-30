import React, { useState } from 'react'
import { Form, Input, Button, Upload, Select } from 'antd'
import styles from './index.module.scss'
import { message } from '../../../../components'
import { PlusCircleFilled } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
export default function EditForm() {
  const [form] = Form.useForm()
  const { Option } = Select
  const handleChange = () => {
    return false
  }
  return (
    <div className={styles['edit-form']}>
      <Form layout={'inline'} form={form}>
        <Form.Item name='layout'>
          <Select size='large' style={{ width: 188 }} onChange={handleChange} placeholder='请选择分类'>
            <Option value='lucy'>Jack</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input size='large' placeholder='请输入型号' />
        </Form.Item>
        <Form.Item>
          <Input size='large' placeholder='请输入备注信息' />
        </Form.Item>
        <Form.Item>
          <Select size='large' style={{ width: 188 }} onChange={handleChange} placeholder='请选择行为'>
            <Option value='lucy'>Jack</Option>
          </Select>
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
      <PlusCircleFilled style={{ color: '#00B2B6' }} />
      <div className='ant-upload-text'>上传图片</div>
    </div>
  )
  return (
    <div className={styles['rename-form']}>
      <Form layout={'vertical'} form={form}>
        <Form.Item label='附件' name='附件'>
          <Input.TextArea placeholder='请输入附件信息' autoSize={{ minRows: 5, maxRows: 7 }} />
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
          <Input size='large' placeholder='请输入备注信息' />
        </Form.Item>
      </Form>
    </div>
  )
}

export { RemarkFrom }
