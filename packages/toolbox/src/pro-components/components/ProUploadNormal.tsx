import {
  UploadNormal,
  UploadNormalProps,
} from "../../core-components/components/UploadNormal";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProUploadNormalValueType = "_UploadNormal" as const;

export const ProUploadNormal: React.FC<
  ProFormItemProps<UploadNormalProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<UploadNormalProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProUploadNormalValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProUploadNormalValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProUploadNormalTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProUploadNormalRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <UploadNormal {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
