import {
  CusRadioGroup,
  CusRadioGroupProps,
} from "../../core-components/components/CusRadioGroup";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProCusRadioGroupValueType = "_CusRadioGroup" as const;

export const ProCusRadioGroup: React.FC<
  ProFormItemProps<CusRadioGroupProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<CusRadioGroupProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProCusRadioGroupValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProCusRadioGroupValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProCusRadioGroupTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProCusRadioGroupRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <CusRadioGroup {...props.fieldProps} />;
  },
  render: (_text, props) => {
    return (
      <CusRadioGroup
        {...props.fieldProps}
        value={props.text}
        renderMode={props.mode}
      />
    );
  },
};
