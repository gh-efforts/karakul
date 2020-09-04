import React from 'react'
import styles from './index.module.scss'

export default function CallToActionButton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLButtonElement>): JSX.Element {
  return <button className={`${styles.button} ${className}`} {...restProps} />
}
