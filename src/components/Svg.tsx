import React from "react";

interface SvgProps {
  name: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  offsetY?: string | number; // 临时解决方案，某些图标需要上下左右微调,y 默认 2，x 默认 0
  offsetX?: string | number;
}

export default function Svg({
  width,
  height,
  className,
  color,
  name,
  offsetX,
  offsetY,
}: SvgProps): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ?? 24}`}
      height={`${height ?? 24}`}
      fill={`${color ?? "#00b2b6"}`}
      style={{ transform: `translate(${offsetX ?? 0}px, ${offsetY ?? 6}px)` }}
      className={`${className ?? ""}`}
    >
      <use xlinkHref={`/images/sprite.svg#${name}`} />
    </svg>
  );
}
