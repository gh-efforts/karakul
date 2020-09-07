import React from 'react'

import ModalView from '../../order-material/modal/modal'
import styles from './index.module.scss'
import { HistoryInfo } from '../history'
export interface HistroyModalViewProps {
  data?: HistoryInfo
  children?: React.ReactNode
}
function HistroyModalView({ data }: HistroyModalViewProps): React.ReactElement {
  return (
    <ModalView orderId={data?.order_id?.id ?? ''} OKText={false}>
      <div className={styles.remake}>
        <div>
          <span>附件：</span>
          <div className={styles.content}>{data?.attachment_desc}</div>
          <div className={styles['picture-box']}>
            {data?.attachment
              ? data?.attachment?.map(item => {
                  return (
                    <div className={styles.picture} key={item?._id}>
                      <img src={item?.url} alt='desc' width={230} height={180} />
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
        <div>
          <span>备注：</span>
          <div className={styles.content}>{data?.remark}</div>
        </div>
      </div>
    </ModalView>
  )
}
export default HistroyModalView
