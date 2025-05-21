import {
  SearchInput,
  SearchInputProps,
} from "../../core-components/components/SearchInput";
import {
  ProColumns,
  ProFormField,
  ProFormItemProps,
  ProRenderFieldPropsType,
  SearchTransformKeyFn,
} from "@ant-design/pro-components";
import { InputRef } from "antd";
import React from "react";

export const ProSearchValueType = "_Search" as const;

export const ProSearch: React.FC<
  ProFormItemProps<SearchInputProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<SearchInputProps, InputRef>) => {
  return (
    <ProFormField
      valueType={ProSearchValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProSearchValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProSearchTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value) => {
    return value;
  };
};

export const ProSearchRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <SearchInput {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
