import { PreviewImage } from "./PreviewImage";
import { UploadFile } from "antd";
import { PreviewPdf } from "./PreviewPdf";

export const checkFileIsImage = (file: UploadFile) => {
  const suffix = file.name.slice(file.name.lastIndexOf("."));
  return [".png", ".jpg", ".jpeg", ".gif"].includes(suffix.toLowerCase());
};

export const checkFileIsPdf = (file: UploadFile) => {
  const suffix = file.name.slice(file.name.lastIndexOf("."));
  return [".pdf"].includes(suffix.toLowerCase());
};

export const checkCanPreview = (file: UploadFile) => {
  return checkFileIsImage(file) || checkFileIsPdf(file);
};

export const PreviewFile: React.FC<{
  file: UploadFile;
  visible?: boolean;
  onVisibleChange?: (bl: boolean) => Promise<void> | void;
}> = (props) => {
  const { file, visible = false, onVisibleChange } = props;
  if (checkFileIsImage(file)) {
    return (
      <PreviewImage
        file={file}
        visible={visible}
        onVisibleChange={onVisibleChange}
      />
    );
  }
  if (checkFileIsPdf(file)) {
    return (
      <PreviewPdf
        file={file}
        visible={visible}
        onVisibleChange={onVisibleChange}
      />
    );
  }
  return null;
};
