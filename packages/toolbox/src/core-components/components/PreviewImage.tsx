import { UploadFile, Image } from "antd";

export const PreviewImage: React.FC<{
  file: UploadFile;
  visible?: boolean;
  onVisibleChange?: (bl: boolean) => Promise<void> | void;
}> = (props) => {
  const { file, visible, onVisibleChange } = props;
  return (
    <Image
      wrapperStyle={{ display: "none" }}
      preview={{
        visible,
        onVisibleChange(vis) {
          onVisibleChange?.(vis);
        },
      }}
      src={file.preview ?? file.url}
    />
  );
};
