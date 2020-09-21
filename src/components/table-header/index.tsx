import React from 'react'
import { Space } from 'antd'

import styles from './index.module.scss'

interface TableHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties | undefined
}

export default function TableHeader({ title, children, className, style }: TableHeaderProps): React.ReactElement {
  return (
    <div className={`${styles['table-header']} ${className ?? ''}`} style={style}>
      <div className={styles.title}>{title}</div>
      <div className={styles.slot}>
        <Space size='middle'>{children}</Space>
      </div>
    </div>
  )
}
