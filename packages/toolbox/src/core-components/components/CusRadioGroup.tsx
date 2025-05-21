import { GetProps, Radio } from "antd";
import { RadioGroupProps } from "antd/lib";
import React from "react";

const RadioGroup = Radio.Group;

export type CusRadioGroupOption = {
  label: string;
  value: string | number;
};

export type CusRadioGroupProps = Omit<
  GetProps<typeof RadioGroup>,
  "options"
> & {
  options: CusRadioGroupOption[];
  beforeChange?: (val: string) => Promise<boolean>;
  renderMode?: "edit" | "read";
};

export const CusRadioGroup: React.FC<CusRadioGroupProps> = (props) => {
  const {
    value,
    onChange,
    beforeChange,
    options,
    renderMode = "edit",
    ...rest
  } = props;
  if (renderMode === "read") {
    return <>{options.find((item) => item.value === value)?.label ?? "-"}</>;
  }
  const innerOnChange: NonNullable<RadioGroupProps["onChange"]> = (env) => {
    const val = env.target?.value;
    if (beforeChange) {
      beforeChange(val).then((bl) => {
        if (bl) {
          onChange?.(val);
        }
      });
    } else {
      onChange?.(val);
    }
  };
  return (
    <RadioGroup
      options={options}
      value={value}
      onChange={innerOnChange}
      {...rest}
    />
  );
};

export default CusRadioGroup;
