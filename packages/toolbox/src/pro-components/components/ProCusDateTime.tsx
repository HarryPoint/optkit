import {
  CusDateTimePicker,
  CusDateTimePickerProps,
} from "../../core-components/components/CusDateTimePicker";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProCusDateTimeValueType = "_CusDateTime" as const;

export const ProCusDateTime: React.FC<
  ProFormItemProps<CusDateTimePickerProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<CusDateTimePickerProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProCusDateTimeValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProCusDateTimeValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProCusDateTimeTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProCusDateTimeRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <CusDateTimePicker {...props.fieldProps} />;
  },
  render: (_text, props) => {
    return (
      <CusDateTimePicker
        {...props.fieldProps}
        value={props.text}
        renderMode={props.mode}
      />
    );
  },
};
