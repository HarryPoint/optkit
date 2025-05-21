import {
  MoneyInput,
  MoneyInputProps,
} from "../../core-components/components/MoneyInput";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProMoneyValueType = "_Money" as const;

export const ProMoney: React.FC<
  ProFormItemProps<MoneyInputProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<MoneyInputProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProMoneyValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProMoneyValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProMoneyTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProMoneyRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <MoneyInput {...props.fieldProps} />;
  },
  render: (_text, props) => {
    return (
      <MoneyInput
        {...props.fieldProps}
        value={props.text}
        renderMode={props.mode}
      />
    );
  },
};
