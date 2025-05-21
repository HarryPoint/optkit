import { SearchOutlined } from "@ant-design/icons";
import { GetProps, Input } from "antd";
import React from "react";

export type SearchInputProps = GetProps<typeof Input>;

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { ...reset } = props;

  return (
    <Input
      allowClear
      placeholder="Please Input"
      addonAfter={<SearchOutlined />}
      {...reset}
    />
  );
};
