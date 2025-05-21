import { UploadToCos } from "./UploadToCos";
import { CosUploadProps, useCosUpload } from "../../hooks/useCosUpload";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import React from "react";

export type UploadDraggerProps = CosUploadProps &
  Pick<UploadProps, "maxCount" | "accept"> & {
    children?: React.ReactNode;
    hint?: React.ReactNode;
    multiple?: boolean;
  };

const { Dragger } = Upload;

export function UploadDragger(props: UploadDraggerProps) {
  const { children, hint, multiple = true, maxCount, ...reset } = props;
  const { defaultFileList, fileList, handleChange } = useCosUpload(props);

  return (
    <UploadToCos
      maxCount={multiple ? maxCount : 1}
      accept=".png,.jpeg,.jpg,.pdf"
      {...reset}
      fileList={fileList}
      onChange={handleChange}
      defaultFileList={defaultFileList}
      render={(uploadProps) => (
        <Dragger {...uploadProps}>
          {children ?? (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">{hint}</p>
            </>
          )}
        </Dragger>
      )}
    />
  );
}
