import { isArray } from "lodash";

export const transformValuesToSearch = (val: Record<string, any> = {}) => {
  return Object.keys(val).reduce((acc, key, index) => {
    if (val[key]) {
      acc += `${key}|${val[key]}`;
      console.log(index);
    }
    return acc;
  }, "");
};

export const dataIndexToKey = (dataIndex: string | string[]) => {
  return isArray(dataIndex) ? dataIndex?.join(".") : dataIndex;
};

export const hiddenColumnsCacheKey = (prefix: string) => {
  return `${prefix}-hidden-columns`;
};

export const sortColumnsCacheKey = (prefix: string) => {
  return `${prefix}-sort-columns`;
};
