import { useDictionary } from "../../hooks/useDictionary";
import { Checkbox, GetProps, Spin } from "antd";
import React, { useMemo } from "react";
import { IDictionaryData } from "src/context/toolboxContext";

const CheckboxGroup = Checkbox.Group;

type CheckboxGroupProps = GetProps<typeof CheckboxGroup<string>>;

export type DictionaryCheckboxGroupProps<T extends IDictionaryData = any> =
  Omit<CheckboxGroupProps, "options"> & {
    category: keyof T;
  };

export function DictionaryCheckboxGroup<T extends IDictionaryData = any>(
  props: DictionaryCheckboxGroupProps<T>
) {
  const { category, ...reset } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<CheckboxGroupProps["options"]>(() => {
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
      <CheckboxGroup options={options} {...reset} />
    </Spin>
  );
}
