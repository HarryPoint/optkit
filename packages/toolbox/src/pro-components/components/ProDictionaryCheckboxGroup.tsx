import {
  DictionaryCheckboxGroup,
  DictionaryCheckboxGroupProps,
} from "../../core-components/components/DictionaryCheckboxGroup";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProDictionaryCheckboxGroupValueType =
  "_DictionaryCheckboxGroup" as const;

export const ProDictionaryCheckboxGroup: React.FC<
  ProFormItemProps<DictionaryCheckboxGroupProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<DictionaryCheckboxGroupProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProDictionaryCheckboxGroupValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProDictionaryCheckboxGroupValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProDictionaryCheckboxGroupTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProDictionaryCheckboxGroupRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DictionaryCheckboxGroup {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
