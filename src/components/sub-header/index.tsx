import React from 'react'
import { Space } from 'antd'

import Link from 'next/link'

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
}

interface SubNavProps {
  links?: NavLink[]
  active?: string
}

export function SubNav({ links, active }: SubNavProps) {
  const len = links?.length || 0

  return (
    <ul className={styles.navs}>
      {links?.map((link, idx) => {
        return (
          <React.Fragment key={`Fragment ${link.name} ${link.name}`}>
            <li key={link.name} className={`${active === link.name && styles['nav-active']}`}>
              {link?.url && (
                <Link href={link.url}>
                  <span>{link.name}</span>
                </Link>
              )}
            </li>
            {len > 1 && len > idx + 1 ? <li className={styles['nav-line']} /> : null}
          </React.Fragment>
        )
      })}
    </ul>
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
