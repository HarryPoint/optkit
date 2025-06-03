import { ButtonProps, Modal, ModalProps } from "antd";
import React, { useState } from "react";

export type CtaProps = ButtonProps;

export type ContentProps<T = any> = { close: () => void } & T;

export const withModal = <
  T = CtaProps,
  F = ContentProps,
  A = React.FC<T>,
  B = React.FC<F>,
  C = ModalProps,
>(
  Cta: A,
  Content: B,
  config: C
) => {
  return function WithModalInner(props: {
    disabled?: boolean;
    ctaProps?: T;
    contentProps?: F;
    modalProps?: Omit<ModalProps, keyof C>;
  }) {
    const CtaCom = Cta as any;
    const ContextCom = Content as any;
    const { ctaProps, contentProps, modalProps, disabled } = props;
    const [open, setOpen] = useState(false);
    return (
      <>
        <span
          onClick={() => {
            console.log("onClick");
            if (disabled) {
              return;
            }
            setOpen(true);
          }}
        >
          <CtaCom disabled={disabled} {...ctaProps} />
        </span>
        <Modal
          {...config}
          {...modalProps}
          open={open}
          footer={null}
          onCancel={() => setOpen(false)}
        >
          <ContextCom {...contentProps} close={() => setOpen(false)} />
        </Modal>
      </>
    );
  };
};
