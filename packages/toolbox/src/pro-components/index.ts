import {
  ProSearchRenderConfig,
  ProSearchTransformCreator,
  ProSearchValueType,
  ProSearch,
} from "./components/ProSearch";
import {
  ProMoneyRenderConfig,
  ProMoneyTransformCreator,
  ProMoneyValueType,
  ProMoney,
} from "./components/ProMoney";
import {
  ProCusDateRenderConfig,
  ProCusDateTransformCreator,
  ProCusDateValueType,
  ProCusDate,
} from "./components/ProCusDate";
import {
  ProCusDateTimeRenderConfig,
  ProCusDateTimeTransformCreator,
  ProCusDateTimeValueType,
  ProCusDateTime,
} from "./components/ProCusDateTime";

import {
  ProColumns,
  ProFieldValueType,
  ProFormColumnsType,
  ProRenderFieldPropsType,
} from "@ant-design/pro-components";
import { SearchTransformKeyFn } from "@ant-design/pro-components";
import { isArray } from "lodash";

export type CusProComponentsPureType =
  | typeof ProSearchValueType
  | typeof ProMoneyValueType
  | typeof ProCusDateValueType
  | typeof ProCusDateTimeValueType;

export type CusProComponentsType = CusProComponentsPureType | ProFieldValueType;

export type CusProFormColumnsType = ProFormColumnsType<
  any,
  CusProComponentsType
>;

const placeholderMap: Partial<Record<CusProComponentsType, string | string[]>> =
  {
    text: "Please Enter",
    dateRange: ["Start Date", "End Date"],
    select: "Please Select",
    [ProSearchValueType]: "Please Enter",
    [ProMoneyValueType]: "Please Enter",
    [ProCusDateValueType]: "Please Select",
    [ProCusDateTimeValueType]: "Please Select",
  };

export const createPlaceholder = (
  colMeta: CusProFormColumnsType,
  sub?: string | string[]
) => {
  const placeholder =
    placeholderMap[colMeta?.valueType as CusProComponentsType];
  const cusSub = sub ?? colMeta?.title?.toString();
  if (placeholder) {
    return isArray(placeholder)
      ? placeholder.map((prev, index) => `${prev} ${sub?.[index] ?? ""}`)
      : `${placeholder} ${cusSub}`;
  }
};

export const transformMap: Partial<
  Record<CusProComponentsType, (col: ProColumns) => SearchTransformKeyFn>
> = {
  [ProSearchValueType]: ProSearchTransformCreator,
  [ProMoneyValueType]: ProMoneyTransformCreator,
  [ProCusDateValueType]: ProCusDateTransformCreator,
  [ProCusDateTimeValueType]: ProCusDateTimeTransformCreator,
};

export const valueTypeMap: Record<
  CusProComponentsPureType,
  ProRenderFieldPropsType
> = {
  [ProSearchValueType]: ProSearchRenderConfig,
  [ProMoneyValueType]: ProMoneyRenderConfig,
  [ProCusDateValueType]: ProCusDateRenderConfig,
  [ProCusDateTimeValueType]: ProCusDateTimeRenderConfig,
};

export { ProSearch, ProMoney, ProCusDate, ProCusDateTime };

export default valueTypeMap;
