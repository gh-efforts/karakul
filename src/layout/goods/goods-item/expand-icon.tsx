import React from 'react'

interface ExpandIconProps {
  expanded?: boolean
  onClick?: () => void
  disabled?: boolean
}
function ExpandIcon({ expanded, onClick, disabled }: ExpandIconProps) {
  return (
    <button
      type='button'
      className={`ant-table-row-expand-icon ${
        expanded ? 'ant-table-row-expand-icon-expanded' : 'ant-table-row-expand-icon-collapsed'
      }`}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

export default ExpandIcon
