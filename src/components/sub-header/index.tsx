import React from "react";
import styles from "./index.module.scss";
import { Space } from "antd";

interface SubHeaderProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
}

export default function SubHeader({
  title,
  children,
  className,
  style,
}: SubHeaderProps): React.ReactElement {
  return (
    <div className={`${styles["sub-header"]} ${className ?? ""}`} style={style}>
      <div className={styles.title}>{title}</div>
      <div className={styles.slot}>
        <Space size="middle">{children}</Space>
      </div>
    </div>
  );
}
