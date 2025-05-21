import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Col, ModalFuncProps, Row } from "antd";
import { useAppProps } from "antd/es/app/context";

export let message: useAppProps["message"];
export let notification: useAppProps["notification"];
export let modal: useAppProps["modal"];

export const useApp = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  notification = staticFunction.notification;
  const originConfirm = staticFunction.modal.confirm;
  modal = {
    ...staticFunction.modal,
    confirm: (props: ModalFuncProps) => {
      return originConfirm({
        ...props,
        icon: null,
        title: (
          <div className="flex flex-col gap-3">
            <div className="text-center text-6xl text-yellow-500">
              {props?.icon ?? <ExclamationCircleFilled />}
            </div>
            <div className="text-center text-lg">{props.title}</div>
          </div>
        ),
        content: <div className="text-center">{props.content}</div>,
        okText: props?.okText ?? "Confirm",
        okButtonProps: {
          block: true,
        },
        cancelButtonProps: {
          block: true,
        },
        footer: (_, { OkBtn, CancelBtn }) => {
          return (
            <Row gutter={8}>
              <Col span={12}>
                <CancelBtn />
              </Col>
              <Col span={12}>
                <OkBtn />
              </Col>
            </Row>
          );
        },
      });
    },
  };

  return { message, notification, modal };
};
