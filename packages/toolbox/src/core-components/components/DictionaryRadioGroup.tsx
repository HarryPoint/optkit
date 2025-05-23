import { useDictionary } from "../../hooks/useDictionary";
import { GetProps, Radio, Spin } from "antd";
import React, { useMemo } from "react";
import { IDictionaryData } from "src/context/toolboxContext";

const RadioGroup = Radio.Group;

type RadioGroupProps = GetProps<typeof RadioGroup>;

export type DictionaryRadioGroupProps<T extends IDictionaryData = any> = Omit<
  RadioGroupProps,
  "options" | "onChange"
> & {
  category: keyof T;
  onChange?: (value: string) => void;
};

export function DictionaryRadioGroup<T extends IDictionaryData = any>(
  props: DictionaryRadioGroupProps<T>
) {
  const { category, onChange, ...reset } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<RadioGroupProps["options"]>(() => {
    if (!categoryGroup?.[category as any]) return [];
    return categoryGroup[category as any].map(
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
}
