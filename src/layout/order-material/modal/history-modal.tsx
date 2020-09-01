import React from 'react'

import ModalView from './modal'
import { OrderMaterial } from '../../../services'
import { KTable } from '../../../components'
import modalColumns from '../table/history-modal-column'
import styles from './index.module.scss'

function HistroyModalView(): React.ReactElement {
  return (
    <ModalView orderId={'123'} OKText={false}>
      <KTable<OrderMaterial>
        data={[] as OrderMaterial[]}
        columns={modalColumns}
        total={10}
        currentPage={1}
        rowKey={item => item.id}
      />
      <div className={styles.remake}>
        <div>
          <span>附件：</span>
          <div className={styles.content}>
            500条里有10条内存条有问题，建议换货 物流单号：中通快递 92364646568868 请尽快完成换货
          </div>
          <div className={styles['picture-box']}>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
            <div className={styles.picture}></div>
          </div>
        </div>
        <div>
          <span>备注：</span>
          <div className={styles.content}>
            500条里有10条内存条有问题，建议换货 物流单号：中通快递 92364646568868 请尽快完成换货
            500条里有10条内存条有问题，建议换货 物流单号：中通快递 92364646568868 请尽快完成换货
            500条里有10条内存条有问题，建议换货 物流单号：中通快递 92364646568868 请尽快完成换货
          </div>
        </div>
      </div>
    </ModalView>
  )
}
export default HistroyModalView
