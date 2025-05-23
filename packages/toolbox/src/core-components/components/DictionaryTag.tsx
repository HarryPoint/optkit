import { useDictionary } from "../../hooks/useDictionary";
import { GetProps, Tag } from "antd";
import React, { useMemo } from "react";
import { IDictionaryData } from "src/context/toolboxContext";

type TagProps = GetProps<typeof Tag>;

export type Color = TagProps["color"];

export type DictionaryTagProps<T extends IDictionaryData = any> = TagProps & {
  category: keyof T;
  value?: string;
};

export const DictionaryTag: React.FC<DictionaryTagProps> = (props) => {
  const { category, value, ...reset } = props;
  const { categoryGroup } = useDictionary();

  const options = useMemo(() => {
    if (!categoryGroup?.[category as any]) return [];
    return categoryGroup[category as any].map((item) => ({
      value: item.value,
      label: item.label,
    }));
  }, [categoryGroup, category]);

  const valueLabel = useMemo(() => {
    if (!value) {
      return "";
    }
    const option = options.find((item) => item.value === value);
    return option ? option.label : value;
  }, [options, value]);

  return <Tag {...reset}>{valueLabel}</Tag>;
};
