import React, { Component, createContext, ComponentType, useContext } from 'react'
import { Modal, Button } from 'antd'

import styles from './index.module.scss'

export type ShowModal<T> = (title: string, component: ComponentType<T>, props: T, width?: number) => void

export type CancelModalProps = { onSuccess?: () => void }

export interface GlobalModalState<T> {
  showModal: ShowModal<T>
  hideModal: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlobalModalContext = createContext<GlobalModalState<any>>({
  showModal: () => {
    return false
  },
  hideModal: () => {
    return false
  },
})

interface GlobalModalProviderState<T> {
  component: ComponentType<T> | null
  props: T
  title: string
  width: number
  visiable: boolean
}

export class GlobalModalProvider<T, P> extends Component<P, GlobalModalProviderState<T>> {
  constructor(props: P) {
    super(props)
    this.state = {
      title: '',
      visiable: false,
      props: {} as T,
      component: null,
      width: 800,
    }
  }

  showModal: ShowModal<T> = (title: string, component: ComponentType<T> | null, props: T, width?: number) => {
    return this.setState({
      title,
      props,
      visiable: true,
      component,
      width: width ?? 800,
    })
  }

  hideModal: () => void = () =>
    this.setState({
      title: '',
      visiable: false,
      props: {} as T,
      component: null,
    })

  render(): React.ReactElement {
    const { visiable, component: ModalView, title, width, props } = this.state
    const { children } = this.props

    return (
      <GlobalModalContext.Provider
        value={{
          showModal: this.showModal.bind(this),
          hideModal: this.hideModal.bind(this),
        }}
      >
        <Modal
          title={title}
          visible={visiable}
          destroyOnClose
          footer={null}
          onCancel={this.hideModal}
          centered
          width={width}
          // wrapClassName='modal-small'
        >
          {ModalView ? <ModalView {...props} /> : null}
        </Modal>
        {children}
      </GlobalModalContext.Provider>
    )
  }
}

export const GlobalModalConsumer = GlobalModalContext.Consumer

export function CancelButton({ primary }: { primary?: boolean }): React.ReactElement {
  return (
    <GlobalModalConsumer>
      {({ hideModal }) => {
        return primary ? (
          <Button shape='round' htmlType='button' type='primary' onClick={hideModal}>
            确定
          </Button>
        ) : (
          <Button shape='round' htmlType='button' onClick={hideModal}>
            取消
          </Button>
        )
      }}
    </GlobalModalConsumer>
  )
}

export interface ModalButtonGroupProps {
  OKText?: string
  onOK?: () => void
  loading?: boolean
  position?: 'left' | 'center' | 'right'
  className?: string
}
export function ModalButtonGroup({ OKText, onOK, loading, className, position = 'center' }: ModalButtonGroupProps) {
  return (
    <GlobalModalConsumer>
      {({ hideModal }) => {
        return (
          <div className={`${styles.btns} ${styles[`btns-${position}`]} ${className ?? ''}`}>
            <Button shape='round' size='large' htmlType='submit' type='primary' loading={loading} onClick={onOK}>
              {OKText ?? '确定'}
            </Button>
            <Button shape='round' size='large' htmlType='button' type='default' onClick={hideModal}>
              取消
            </Button>
          </div>
        )
      }}
    </GlobalModalConsumer>
  )
}

export function useGlobalModal<T>(): GlobalModalState<T> {
  const ctx = useContext(GlobalModalContext)
  return ctx
}
