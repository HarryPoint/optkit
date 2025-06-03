import {
  DictionaryCategory,
  useDictionary,
} from "@/common/hooks/useDictionary";
import { GetProps, Select } from "antd";
import React, { useMemo } from "react";

type SelectProps = GetProps<typeof Select<string>>;

export type DictionarySelectProps = Omit<
  SelectProps,
  "options" | "filterOption"
> & {
  category: DictionaryCategory;
  filterOption?: (option: { label: string; value: string }) => boolean;
  renderMode?: "edit" | "read";
};

const defaultFilterOptionLogic = () => true;

export const DictionarySelect: React.FC<DictionarySelectProps> = (props) => {
  const {
    category,
    renderMode = "edit",
    value,
    filterOption = defaultFilterOptionLogic,
    ...reset
  } = props;
  const { loading, categoryGroup } = useDictionary();
  const options = useMemo<SelectProps["options"]>(() => {
    const baseData = categoryGroup?.[category] || [];
    return baseData?.filter(filterOption).map((item) => ({
      value: item.value,
      label: item.label,
      origin: item,
    }));
  }, [categoryGroup, category, filterOption]);
  if (renderMode === "read") {
    return options?.find((item) => item.value === value)?.label ?? value;
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
};
