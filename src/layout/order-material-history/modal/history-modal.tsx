import React from 'react'

import ModalView from '../../order-material/modal/modal'
import styles from './index.module.scss'
import { Svg } from '../../../components'
import { HistoryInfo } from '../../../store/type.d'

export interface HistroyModalViewProps {
  data?: HistoryInfo
  children?: React.ReactNode
}

function HistroyModalView({ data }: HistroyModalViewProps): React.ReactElement {
  return (
    <ModalView id={data?.order_id?.id ?? ''} OKText={false}>
      <div className={styles.remake}>
        <div>
          <span>附件：</span>
          <div className={styles.content}>{data?.attachment_desc}</div>
          <div className={styles['picture-box']}>
            {data?.attachment
              ? data?.attachment?.map(item => {
                  return (
                    <div className={styles['picture-content']} key={item?.id}>
                      <a className={styles.download} href={item?.url ?? ''} target='_blank' download rel='noreferrer'>
                        <Svg name='btn-download-h' />
                      </a>
                      <div className={styles.picture}>
                        {item?.ext === '.png' || item?.ext === '.jpg' || item?.ext === '.jpeg' ? (
                          <img src={item?.url} alt='desc' width={230} height={180} />
                        ) : (
                          <>
                            <Svg name='ico-doc-h' width='30' height='30' />
                            <span>{item?.name}</span>
                          </>
                        )}
                      </div>
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
