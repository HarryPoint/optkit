import { useDictionary } from "../../hooks/useDictionary";
import { GetProps, Select } from "antd";
import React, { useMemo } from "react";
import { IDictionaryData } from "src/context/toolboxContext";

type SelectProps = GetProps<typeof Select<string>>;

export type DictionarySelectProps<T extends IDictionaryData> = Omit<
  SelectProps,
  "options" | "filterOption"
> & {
  category: keyof T;
  filterOption?: (option: { label: string; value: string }) => boolean;
  renderMode?: "edit" | "read";
};

const defaultFilterOptionLogic = () => true;

export function DictionarySelect<T extends IDictionaryData>(
  props: DictionarySelectProps<T>
) {
  const {
    category,
    renderMode = "edit",
    value,
    filterOption = defaultFilterOptionLogic,
    ...reset
  } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<SelectProps["options"]>(() => {
    const baseData = categoryGroup?.[category as any] || [];
    return baseData?.filter(filterOption).map((item) => ({
      value: item.value,
      label: item.label,
      origin: item,
    }));
  }, [categoryGroup, category, filterOption]);
  if (renderMode === "read") {
    return options?.find((item) => item.value === value)?.label;
  }
  return (
    <Select
      value={value}
      loading={loading}
      showSearch
      allowClear
      options={options}
      optionFilterProp="label"
      placeholder="Please Select"
      {...reset}
    />
  );
}
