import React from 'react'
import { Space, Breadcrumb } from 'antd'

import styles from './index.module.scss'

interface SubHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties | undefined
}

interface NavLink {
  name: string
  url?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement, MouseEvent>) => void
}

interface SubNavProps {
  links?: NavLink[]
}

export function SubNav({ links }: SubNavProps) {
  const len = links?.length || 0

  return (
    <Breadcrumb separator=' | '>
      {links?.map((link, idx) => {
        return (
          link?.url && (
            <Breadcrumb.Item
              href={len === 1 || idx === len - 1 ? undefined : link.url}
              onClick={link?.onClick}
              key={link.url ?? idx}
            >
              {link.name}
            </Breadcrumb.Item>
          )
        )
      })}
    </Breadcrumb>
  )
}

export default function SubHeader({ title, children, className, style }: SubHeaderProps): React.ReactElement {
  return (
    <div className={`${styles['sub-header']} ${className ?? ''}`} style={style}>
      <div className={styles.title}>{title}</div>
      <div className={styles.slot}>
        <Space size='middle'>{children}</Space>
      </div>
    </div>
  )
}
