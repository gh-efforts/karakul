import React, { useState } from 'react'
import getConfig from 'next/config'
import { Form, Input, Button, Upload, Select, message } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'
import { Store } from 'antd/lib/form/interface'
import { FormInstance } from 'antd/lib/form'

import { OrderMaterialsSelect, getRealValue } from '../../../components'
import { Material, ActionTypeMap, ActionType } from '../../../store/type.d'
import { getLocalStore } from '../../../helpers/cookie'

import styles from './index.module.scss'

const { Option } = Select
export interface EditFormProps {
  orderId?: string | null | undefined
  onSubmit: ({ id, amount, material }: Material) => void
}

export const ActionTypeOptions = Object.keys(ActionTypeMap)
  .filter(item => {
    if (item !== '4') return item
  })
  .map(type => {
    return (
      <Option key={type} value={(type as unknown) as ActionType}>
        {ActionTypeMap[(type as unknown) as ActionType]}
      </Option>
    )
  })

export default function EditForm({ orderId, onSubmit }: EditFormProps) {
  const [form] = Form.useForm()

  const onFinish = (values: Store) => {
    const { amount, material, action } = values

    if (amount && material && action) {
      const [mid, mname, model] = getRealValue(material)

      onSubmit({ id: mid, amount: parseInt(amount), material: mname, model, action: parseInt(action) })
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
        <Form.Item name='amount' rules={[{ required: true, message: '请输入数量' }]}>
          <Input size='large' type={'number'} placeholder='请输入数量' />
        </Form.Item>
        <Form.Item name='action' rules={[{ required: true, message: '请选择行为' }]}>
          <Select size='large' style={{ width: 170 }} placeholder='请选择行为'>
            {ActionTypeOptions}
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

export interface RenameFormProps {
  form: FormInstance
}

export type File = UploadFile<{ id: string }[]> & { id?: string }

type FileList = File[]

const normalizeFile = ({ fileList }: { fileList: FileList }) => fileList ?? []
// eslint-disable-next-line no-sparse-arrays
const acceptFileTypes = [
  'image/*',
  'application/pdf',
  '.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  ,
  'application/*',
]
const acceptFileSize = 1024 * 1024 * 2

const isAcceptFileTypes = (type: string) => acceptFileTypes.includes(type)
const isAcceptFileSize = (size: number) => acceptFileSize > size

function beforeUpload(file: { type: string; size: number }) {
  if (!isAcceptFileTypes(file.type)) {
    message.error('请确认附件格式!')

    return false
  }

  if (!isAcceptFileSize(file.size)) {
    message.error('Image must smaller than 2MB!')
    return false
  }

  return true
}

export function RemarkFrom({ form }: RenameFormProps) {
  const [fileList, setFileList] = useState<FileList>([])

  const Authorization = getLocalStore('Authorization') as string

  const backendURL = getConfig().publicRuntimeConfig.ENDPOINT

  const requestURL = `${backendURL}/upload`

  const handleChange = ({ fileList }: { fileList: FileList }) => {
    const fileListWithURL = fileList.map((file: File) => {
      if (file.response && Array.isArray(file.response)) {
        file.id = file.response[0].id
      }
      return file
    })

    setFileList(fileListWithURL)
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
        <Form.Item label='附件' name='attachment_desc'>
          <Input.TextArea placeholder='请输入附件信息' autoSize={{ minRows: 5, maxRows: 7 }} />
        </Form.Item>
        <Form.Item name='attachment' valuePropName='fileList' getValueFromEvent={normalizeFile}>
          <Upload
            name='files'
            listType='picture-card'
            className='avatar-uploader'
            fileList={fileList}
            headers={{
              Authorization,
            }}
            action={requestURL}
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
