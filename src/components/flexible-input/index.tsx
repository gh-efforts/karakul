import React, { useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import useOnClickOutside from 'use-onclickoutside'

import styles from './index.module.scss'

interface FlexibleInputProps {
  loading?: boolean
  onSubmit?: (val: string | undefined) => void
}

function FlexibleInput({ loading, onSubmit }: FlexibleInputProps) {
  const ref = React.useRef(null)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<undefined | string>()

  const onPressEnter = () => {
    onSubmit?.(value)
  }

  const onClickSearch = () => {
    if (visible) {
      onSubmit?.(value)
    } else {
      setVisible(true)
    }
  }

  const clear = () => {
    setVisible(false)
    setValue(undefined)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useOnClickOutside(ref, clear)

  return (
    <span ref={ref} className={styles.box}>
      <Input
        addonBefore={
          loading ? <LoadingOutlined /> : <SearchOutlined onClick={onClickSearch} className={styles['search-icon']} />
        }
        className={`${styles.search} ${visible && styles['search-active']}`}
        disabled={loading}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    </span>
  )
}

export default FlexibleInput
