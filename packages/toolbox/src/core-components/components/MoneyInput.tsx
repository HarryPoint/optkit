import { GetProps, InputNumber } from "antd";
import React from "react";

export type MoneyInputProps = GetProps<typeof InputNumber> & {
  renderMode: "edit" | "read";
};

export const MoneyInput: React.FC<MoneyInputProps> = (props) => {
  const { renderMode, value, ...reset } = props;
  if (renderMode === "read") {
    return value === undefined ? "-" : `S$ ${Number(value)?.toFixed(2)}`;
  }
  return (
    <InputNumber
      addonBefore="S$"
      controls={false}
      className="w-full"
      placeholder="Please Input"
      value={value}
      {...reset}
    />
  );
};
