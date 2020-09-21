import React, { useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'

import styles from './index.module.scss'

interface SearchInputProps {
  loading?: boolean
  onSubmit?: (val: string | undefined) => void
}

function SearchInput({ loading, onSubmit }: SearchInputProps) {
  const [value, setValue] = useState<undefined | string>()

  const onPressEnter = () => {
    onSubmit?.(value)
  }

  const onClickSearch = () => {
    onSubmit?.(value)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Input
      addonBefore={loading ? <LoadingOutlined /> : <SearchOutlined onClick={onClickSearch} />}
      className={styles.search}
      disabled={loading}
      onChange={onChange}
      onPressEnter={onPressEnter}
    />
  )
}

export default SearchInput
