import { RecordAttachment } from "@/common/components/UploadToCos";
import { UploadProps } from "antd";
import { unionBy } from "lodash";
import { useEffect, useState } from "react";

export type CosUploadProps = {
  value?: RecordAttachment[];
  defaultValue?: RecordAttachment[];
  onChange?: (val: RecordAttachment[]) => void;
};

export const useCosUpload = (props: CosUploadProps) => {
  const { defaultValue, onChange, value } = props;
  const [fileList, setFileList] = useState<RecordAttachment[]>(value ?? []);

  const handleChange: UploadProps["onChange"] = (info: {
    file: RecordAttachment;
    fileList: RecordAttachment[];
  }) => {
    const { status } = info.file;
    setFileList(info.fileList);
    if (status === "done" || status === "removed") {
      const fileList = info.fileList.slice();
      setTimeout(() => {
        const changeVal = fileList
          ?.filter((item) => item.status === "done" || !item.status)
          .filter(Boolean)
          ?.map((item) => {
            const id = item.response?.cos?.meta?.Key;
            return {
              id: id,
              uid: item.uid,
              url: item.url,
              name: item.name,
              thumbUrl: item.url,
            };
          });
        onChange?.(changeVal);
      });
    }
  };

  useEffect(() => {
    setFileList((prev = []) => {
      let next = value ?? [];
      return unionBy(prev, next, "uid");
    });
  }, [value]);

  return {
    fileList,
    handleChange,
    defaultFileList: defaultValue ?? [],
  };
};
