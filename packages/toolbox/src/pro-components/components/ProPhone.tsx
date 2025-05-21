import {
  PhoneInput,
  PhoneInputProps,
} from "../../core-components/components/PhoneInput";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProPhoneValueType = "_Phone" as const;

export const ProPhone: React.FC<
  ProFormItemProps<PhoneInputProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<PhoneInputProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProPhoneValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProPhoneValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProPhoneTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProPhoneRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <PhoneInput {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
