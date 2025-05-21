import {
  DictionarySelect,
  DictionarySelectProps,
} from "../../core-components/components/DictionarySelect";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProDictionarySelectValueType = "_DictionarySelect" as const;

export const ProDictionarySelect: React.FC<
  ProFormItemProps<DictionarySelectProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<DictionarySelectProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProDictionarySelectValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProDictionarySelectValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProDictionarySelectTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProDictionarySelectRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DictionarySelect {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
