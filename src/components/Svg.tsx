import React from 'react'

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  name: string
  color?: string
  width?: string | number
  height?: string | number
  className?: string
  offsetY?: string | number // 临时解决方案，某些图标需要上下左右微调,y 默认 2，x 默认 0
  offsetX?: string | number
  disabled?: boolean
  loading?: boolean
}

export default function Svg({
  width,
  height,
  className,
  color,
  name,
  offsetX,
  offsetY,
  disabled,
  loading,
  onClick,
  ...resetProps
}: SvgProps): React.ReactElement {
  const onClickProxy = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (loading || disabled) {
      return
    }

    onClick?.(e)
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={`${width ?? 24}`}
      height={`${height ?? 24}`}
      fill={`${color ?? '#00b2b6'}`}
      style={{
        transform: `translate(${offsetX ?? 0}px, ${offsetY ?? 0}px)`,
        cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer',
      }}
      className={` ${className ?? ''}`}
      onClick={onClickProxy}
      {...resetProps}
    >
      <use xlinkHref={`/images/sprite.svg#${name}`} />
    </svg>
  )
}
