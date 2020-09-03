import React, { useState } from 'react'
import { Form, Input, Button, Upload, Select } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'

import styles from './index.module.scss'
import { message, OrderMaterialsSelect } from '../../../components'
import { Material } from '../material'
import { Store } from 'antd/lib/form/interface'

const { Option } = Select
export interface EditFormProps {
  orderId?: string
  onSubmit: ({ id, amount, material, model }: Material) => void
}

export interface RenameFormProps {
  onFinish: ({
    attachment,
    attachment_desc,
    remark,
  }: {
    attachment: string[]
    attachment_desc: string
    remark: string
  }) => void
}

export default function EditForm({ orderId, onSubmit }: EditFormProps) {
  const [form] = Form.useForm()

  const onFinish = (values: Store) => {
    const { amount, material, model, action } = values

    if (amount && material && model && action) {
      const id = material.split('__')[0]
      const Tmaterial = material.split('__')[1]

      onSubmit({ id, amount, material: Tmaterial, model, action: parseInt(action) })
      form.resetFields()
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className={styles['edit-form']}>
      <Form layout={'inline'} form={form} onFinish={onFinish} onReset={onReset}>
        <OrderMaterialsSelect name='material' noLabel style={{ width: 180 }} required id={orderId} />
        <Form.Item name='model'>
          <Input size='large' placeholder='请输入型号' />
        </Form.Item>
        <Form.Item name='amount'>
          <Input size='large' type={'number'} placeholder='请输入数量' />
        </Form.Item>
        <Form.Item name='action'>
          <Select size='large' style={{ width: 170 }} placeholder='请选择行为'>
            <Option value={1}>增货</Option>
            <Option value={2}>退货</Option>
            <Option value={3}>换货</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='link' htmlType='submit'>
            保存
          </Button>
          <Button type='text' htmlType='reset'>
            清空
          </Button>
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

function RemarkFrom({ onFinish }: RenameFormProps) {
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

  const onSubmit = (values: Store) => {
    const { attachment, attachment_desc, remark } = values
    console.log(values)
    onFinish({ attachment, attachment_desc, remark })
  }

  return (
    <div className={styles['rename-form']}>
      <Form layout={'vertical'} form={form} onFinish={onSubmit}>
        <Form.Item label='附件' name='attachment_desc'>
          <Input.TextArea placeholder='请输入附件信息' autoSize={{ minRows: 5, maxRows: 7 }} />
        </Form.Item>
        <Form.Item name='attachment' valuePropName='fileList'>
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
        <Form.Item label='备注' name='remark'>
          <Input size='large' placeholder='请输入备注信息' />
        </Form.Item>
      </Form>
    </div>
  )
}

export { RemarkFrom }
