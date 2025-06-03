import {
  valueTypeMap as optkitValueTypeMap,
  CusProComponentsPureType as OptkitCusProComponentsPureType,
  transformMap as optkitTransformMap,
} from "optkit-toolbox";
import {
  ProColumns,
  ProFieldValueType,
  ProFormColumnsType,
  ProRenderFieldPropsType,
} from "@ant-design/pro-components";
import { SearchTransformKeyFn } from "@ant-design/pro-components";
import { isArray } from "lodash";
import {
  ProDemoFieldRenderConfig,
  ProDemoFieldTransformCreator,
  ProDemoFieldValueType,
} from "./components/DemoFiled";

export type CusProComponentsPureType =
  | OptkitCusProComponentsPureType
  | typeof ProDemoFieldValueType;

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
    [ProDemoFieldValueType]: "Please Enter",
  };

export const createPlaceholder = (
  colMeta: CusProFormColumnsType,
  sub?: string | string[],
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
  ...optkitTransformMap,
  [ProDemoFieldValueType]: ProDemoFieldTransformCreator,
};

/**
 * 自定义 valueMap
 */
export const valueTypeMap: Record<
  CusProComponentsPureType,
  ProRenderFieldPropsType
> = {
  ...optkitValueTypeMap,
  [ProDemoFieldValueType]: ProDemoFieldRenderConfig,
};

export default valueTypeMap;
