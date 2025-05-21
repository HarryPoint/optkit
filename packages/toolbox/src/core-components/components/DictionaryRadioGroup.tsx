import { DictionaryCategory, useDictionary } from "../../hooks/useDictionary";
import { GetProps, Radio, Spin } from "antd";
import React, { useMemo } from "react";

const RadioGroup = Radio.Group;

type RadioGroupProps = GetProps<typeof RadioGroup>;

export type DictionaryRadioGroupProps = Omit<
  RadioGroupProps,
  "options" | "onChange"
> & {
  category: DictionaryCategory;
  onChange?: (value: string) => void;
};

export const DictionaryRadioGroup: React.FC<DictionaryRadioGroupProps> = (
  props
) => {
  const { category, onChange, ...reset } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<RadioGroupProps["options"]>(() => {
    if (!categoryGroup?.[category]) return [];
    return categoryGroup[category].map(
      (item) =>
        ({
          value: item.value,
          label: item.label,
        } as any)
    );
  }, [categoryGroup, category]);
  return (
    <Spin spinning={loading}>
      <RadioGroup
        options={options}
        onChange={(e) => onChange?.(e.target.value)}
        {...reset}
      />
    </Spin>
  );
};
