import React from 'react'
import styles from './index.module.scss'

const ActionButton: React.ForwardRefRenderFunction<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>> = (
  { className, ...restProps }: React.HTMLAttributes<HTMLButtonElement>,
  ref
) => {
  return <button className={`${styles.button} ${className}`} {...restProps} ref={ref} />
}

export default React.forwardRef(ActionButton)
