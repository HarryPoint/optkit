import { checkCanPreview, PreviewFile } from "./PreviewFile";
import { useApp } from "../../hooks/useApp";
import { cos } from "../../utils/cos";
import { getEnv } from "../../utils/env";
import { UploadFile, UploadProps } from "antd";
import COS from "cos-js-sdk-v5";
import dayjs from "dayjs";
import { useState } from "react";

export type CosMeta = Pick<COS.UploadFileParams, "Bucket" | "Key" | "Region">;

export type ExtraData = {
  id: string;
  cos: {
    response: COS.UploadFileResult;
    meta: CosMeta;
  };
};

export type RecordAttachment = UploadFile<ExtraData>;

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export type UploadToCosProps = Pick<
  UploadProps,
  | "listType"
  | "name"
  | "multiple"
  | "showUploadList"
  | "maxCount"
  | "defaultFileList"
  | "fileList"
  | "onChange"
  | "children"
  | "disabled"
> & {
  render: (props: UploadProps) => React.ReactNode;
};

export const UploadToCos: React.FC<UploadToCosProps> = (props) => {
  const { render } = props;
  const { message } = useApp();
  const [previewFile, setPreviewFile] = useState<UploadFile | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const upload = async (file: File, onProgress?: (data: any) => void) => {
    // console.log('sdfsdf', file.uid)
    const meta: Pick<COS.UploadFileParams, "Bucket" | "Key" | "Region"> = {
      Bucket: getEnv().NEXT_PUBLIC_COS_BUCKET,
      Region: getEnv().NEXT_PUBLIC_COS_REGION,
      Key: `${getEnv()?.NEXT_PUBLIC_COS_PREFIX}/${dayjs().format(
        "YYYY_MM_DD__HH_mm_ss"
      )}_${file.name}`,
      // Key: `${file.name}`,
    };
    try {
      const data = await cos.uploadFile({
        ...meta,
        Body: file,
        SliceSize: 1024 * 1024 * 5,
        onProgress: function (progressData) {
          onProgress?.({ percent: progressData?.percent * 100 });
        },
      });
      console.log("upload success", data);
      return { err: null, data, meta };
    } catch (err) {
      return { err, data: null };
    }
  };

  const combineProps: UploadProps = {
    ...props,
    onPreview(file) {
      if (checkCanPreview(file)) {
        setPreviewFile(file);
        setPreviewVisible(true);
        return;
      }
      if (file.url) {
        window.open(file.url);
      }
      message.info(`Missing file link`);
    },
    async customRequest(options) {
      const { data, err, meta } = await upload(
        options.file as any,
        options.onProgress
      );
      if (options.file) {
        try {
          // @ts-ignore
          options.file.preview = await getBase64(options.file as File);
        } catch (err) {
          console.log("create preview error", err);
        }
      }
      if (err) {
        return options.onError?.(err as any);
      }

      // console.log("sdfdf", url);
      const response = { cos: { response: data, meta } };
      if (options.file) {
        // @ts-ignore
        options.file.url = `https://${data?.Location}`;
        // @ts-ignore
        options.file.cosMeta = meta;
        console.log("options.file", options.file);
      }
      return options.onSuccess?.(response);
    },
    onChange(info) {
      console.log("info", info);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`, info);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      props.onChange?.(info);
    },
    async onRemove(file) {
      // @ts-ignore
      // auto delete?
      // const cosMeta = file.cosMeta;
      // if (cosMeta) {
      //   cos.deleteObject(cosMeta).then(() => {
      //     console.log("file delete success", cosMeta);
      //   });
      // }
    },
  };

  return (
    <>
      {render(combineProps)}
      {previewFile && (
        <PreviewFile
          visible={previewVisible}
          file={previewFile}
          onVisibleChange={(bl) => {
            setPreviewVisible(bl);
          }}
        />
      )}
    </>
  );
};
