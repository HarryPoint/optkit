import { DictionaryCategory, useDictionary } from "../../hooks/useDictionary";
import { Checkbox, GetProps, Spin } from "antd";
import React, { useMemo } from "react";

const CheckboxGroup = Checkbox.Group;

type CheckboxGroupProps = GetProps<typeof CheckboxGroup<string>>;

export type DictionaryCheckboxGroupProps = Omit<
  CheckboxGroupProps,
  "options"
> & {
  category: DictionaryCategory;
};

export const DictionaryCheckboxGroup: React.FC<DictionaryCheckboxGroupProps> = (
  props
) => {
  const { category, ...reset } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<CheckboxGroupProps["options"]>(() => {
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
      <CheckboxGroup options={options} {...reset} />
    </Spin>
  );
};
