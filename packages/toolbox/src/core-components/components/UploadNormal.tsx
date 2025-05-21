import { UploadToCos } from "./UploadToCos";
import { CosUploadProps, useCosUpload } from "../../hooks/useCosUpload";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Upload, UploadProps } from "antd";
import { createStyles } from "antd-style";
import React, { useContext, useMemo } from "react";

export type UploadNormalProps = CosUploadProps &
  Pick<UploadProps, "maxCount" | "accept" | "listType"> & {
    children?: React.ReactNode;
    hint?: React.ReactNode;
    multiple?: boolean;
  };

const useUploadStyle = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const selectPrefixCls = getPrefixCls("upload");
  return createStyles(({ css }) => ({
    upload: css`
      .${selectPrefixCls}-select {
        display: block;
      }
    `,
  }))();
};

export function UploadNormal(props: UploadNormalProps) {
  const {
    children,
    hint,
    multiple,
    maxCount,
    listType = "picture-card",
    ...reset
  } = props;

  const { styles } = useUploadStyle();

  const { defaultFileList, fileList, handleChange } = useCosUpload(props);

  const childrenDom = useMemo(() => {
    if (listType === "text") {
      return (
        children ?? (
          <Button icon={<UploadOutlined />} block>
            Upload
          </Button>
        )
      );
    } else {
      if (maxCount && fileList.length >= maxCount) {
        return null;
      }
      return (
        children ?? (
          <button
            style={{ border: 0, background: "none", cursor: "pointer" }}
            type="button"
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )
      );
    }
  }, [listType, children, maxCount, fileList]);

  return (
    <ConfigProvider
      upload={{
        className: styles.upload,
      }}
    >
      <UploadToCos
        maxCount={maxCount}
        listType={listType}
        accept=".png,.jpeg,.jpg,.pdf"
        {...reset}
        fileList={fileList}
        onChange={handleChange}
        defaultFileList={defaultFileList}
        render={(uploadProps) => (
          <Upload {...uploadProps}>{childrenDom}</Upload>
        )}
      />
    </ConfigProvider>
  );
}
