import {
  CusDatePicker,
  CusDatePickerProps,
} from "../../core-components/components/CusDatePicker";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProCusDateValueType = "_CusDate" as const;

export const ProCusDate: React.FC<
  ProFormItemProps<CusDatePickerProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<CusDatePickerProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProCusDateValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProCusDateValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProCusDateTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProCusDateRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <CusDatePicker {...props.fieldProps} />;
  },
  render: (_text, props) => {
    return (
      <CusDatePicker
        {...props.fieldProps}
        value={props.text}
        renderMode={props.mode}
      />
    );
  },
};
