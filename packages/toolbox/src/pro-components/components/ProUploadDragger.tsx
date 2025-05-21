import {
  UploadDragger,
  UploadDraggerProps,
} from "../../core-components/components/UploadDragger";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProUploadDraggerValueType = "_UploadDragger" as const;

export const ProUploadDragger: React.FC<
  ProFormItemProps<UploadDraggerProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<UploadDraggerProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProUploadDraggerValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProUploadDraggerValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProUploadDraggerTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProUploadDraggerRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <UploadDragger {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
