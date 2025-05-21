import {
  DictionaryRadioGroup,
  DictionaryRadioGroupProps,
} from "../../core-components/components/DictionaryRadioGroup";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProDictionaryRadioGroupValueType =
  "_DictionaryRadioGroup" as const;

export const ProDictionaryRadioGroup: React.FC<
  ProFormItemProps<DictionaryRadioGroupProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<DictionaryRadioGroupProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProDictionaryRadioGroupValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProDictionaryRadioGroupValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProDictionaryRadioGroupTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProDictionaryRadioGroupRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DictionaryRadioGroup {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
