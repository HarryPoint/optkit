import { Modal, UploadFile } from "antd";

export const PreviewPdf: React.FC<{
  file: UploadFile;
  visible?: boolean;
  onVisibleChange?: (bl: boolean) => Promise<void> | void;
}> = (props) => {
  const { file, visible, onVisibleChange } = props;
  return (
    <Modal
      open={visible}
      title={file.name}
      width={900}
      footer={false}
      afterOpenChange={onVisibleChange}
      onCancel={() => onVisibleChange?.(false)}
    >
      <iframe
        className="min-h-dvh w-full"
        src={`${file?.preview ?? file.url}#toolbar=0`}
      ></iframe>
    </Modal>
  );
};
