import React from 'react'

interface ExpandIconProps {
  expanded?: boolean
  onClick?: () => void
}
function ExpandIcon({ expanded, onClick }: ExpandIconProps) {
  return (
    <button
      type='button'
      className={`ant-table-row-expand-icon ${
        expanded ? 'ant-table-row-expand-icon-expanded' : 'ant-table-row-expand-icon-collapsed'
      }`}
      onClick={onClick}
    />
  )
}

export default ExpandIcon
