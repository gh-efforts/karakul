import React, {
  Component,
  createContext,
  ComponentType,
  useContext,
} from "react";
import { Modal, Button } from "antd";

export type ShowModal<T> = (
  title: string,
  component: ComponentType<T>,
  props: T
) => void;

export type CancelModalProps = { onSuccess?: () => void };

export interface GlobalModalState<T> {
  showModal: ShowModal<T>;
  hideModal: () => void;
}

const GlobalModalContext = createContext<GlobalModalState<any>>({
  showModal: () => {},
  hideModal: () => {},
});

interface GlobalModalProviderState<T> {
  component: ComponentType<T> | null;
  props: T;
  title: string;
  visiable: boolean;
}

export class GlobalModalProvider<T> extends Component<
  any,
  GlobalModalProviderState<T>
> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      visiable: false,
      props: {} as T,
      component: null,
    };
  }

  showModal: ShowModal<T> = (title, component, props) => {
    this.setState({
      title,
      props,
      visiable: true,
      component,
    });
  };

  hideModal = () =>
    this.setState({
      title: "",
      visiable: false,
      props: {} as T,
      component: null,
    });

  render() {
    const { visiable, component: ModalView, title, props } = this.state;
    const { children } = this.props;

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
          // wrapClassName='modal-small'
        >
          {ModalView ? <ModalView {...props} /> : null}
        </Modal>
        {children}
      </GlobalModalContext.Provider>
    );
  }
}

export const GlobalModalConsumer = GlobalModalContext.Consumer;

export function CancelButton({ primary }: { primary?: boolean }) {
  return (
    <GlobalModalConsumer>
      {({ hideModal }) => {
        return primary ? (
          <Button
            shape="round"
            htmlType="button"
            type="primary"
            onClick={hideModal}
          >
            确定
          </Button>
        ) : (
          <Button shape="round" htmlType="button" onClick={hideModal}>
            取消
          </Button>
        );
      }}
    </GlobalModalConsumer>
  );
}

export function useGlobalModal() {
  const ctx = useContext(GlobalModalContext);
  return ctx;
}
