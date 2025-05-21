import {
  ProDemoFieldRenderConfig,
  ProDemoFieldTransformCreator,
  ProDemoFieldValueType,
  ProDemoField,
} from "./components/DemoFiled";
import {
  ProDictionarySelectRenderConfig,
  ProDictionarySelectTransformCreator,
  ProDictionarySelectValueType,
  ProDictionarySelect,
} from "./components/ProDictionarySelect";
import {
  ProDictionaryRadioGroupRenderConfig,
  ProDictionaryRadioGroupTransformCreator,
  ProDictionaryRadioGroupValueType,
  ProDictionaryRadioGroup,
} from "./components/ProDictionaryRadioGroup";
import {
  ProDictionaryCheckboxGroupRenderConfig,
  ProDictionaryCheckboxGroupTransformCreator,
  ProDictionaryCheckboxGroupValueType,
  ProDictionaryCheckboxGroup,
} from "./components/ProDictionaryCheckboxGroup";
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
  ProCusRadioGroupRenderConfig,
  ProCusRadioGroupTransformCreator,
  ProCusRadioGroupValueType,
  ProCusRadioGroup,
} from "./components/ProCusRadioGroup";
import {
  ProColumns,
  ProFieldValueType,
  ProFormColumnsType,
  ProRenderFieldPropsType,
} from "@ant-design/pro-components";
import { SearchTransformKeyFn } from "@ant-design/pro-components";
import { isArray } from "lodash";

export type CusProComponentsPureType =
  | typeof ProDemoFieldValueType
  | typeof ProDictionarySelectValueType
  | typeof ProDictionaryRadioGroupValueType
  | typeof ProDictionaryCheckboxGroupValueType
  | typeof ProSearchValueType
  | typeof ProMoneyValueType
  | typeof ProCusDateValueType
  | typeof ProCusDateTimeValueType
  | typeof ProCusRadioGroupValueType;

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
    [ProDictionarySelectValueType]: "Please Select",
    [ProDictionaryRadioGroupValueType]: "Please Select",
    [ProDictionaryCheckboxGroupValueType]: "Please Select",
    [ProSearchValueType]: "Please Enter",
    [ProMoneyValueType]: "Please Enter",
    [ProCusDateValueType]: "Please Select",
    [ProCusDateTimeValueType]: "Please Select",
    [ProCusRadioGroupValueType]: "Please Select",
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
  [ProDemoFieldValueType]: ProDemoFieldTransformCreator,
  [ProDictionarySelectValueType]: ProDictionarySelectTransformCreator,
  [ProDictionaryRadioGroupValueType]: ProDictionaryRadioGroupTransformCreator,
  [ProDictionaryCheckboxGroupValueType]:
    ProDictionaryCheckboxGroupTransformCreator,
  [ProSearchValueType]: ProSearchTransformCreator,
  [ProMoneyValueType]: ProMoneyTransformCreator,
  [ProCusDateValueType]: ProCusDateTransformCreator,
  [ProCusDateTimeValueType]: ProCusDateTimeTransformCreator,
  [ProCusRadioGroupValueType]: ProCusRadioGroupTransformCreator,
};

export const valueTypeMap: Record<
  CusProComponentsPureType,
  ProRenderFieldPropsType
> = {
  [ProDemoFieldValueType]: ProDemoFieldRenderConfig,
  [ProDictionarySelectValueType]: ProDictionarySelectRenderConfig,
  [ProDictionaryRadioGroupValueType]: ProDictionaryRadioGroupRenderConfig,
  [ProDictionaryCheckboxGroupValueType]: ProDictionaryCheckboxGroupRenderConfig,
  [ProSearchValueType]: ProSearchRenderConfig,
  [ProMoneyValueType]: ProMoneyRenderConfig,
  [ProCusDateValueType]: ProCusDateRenderConfig,
  [ProCusDateTimeValueType]: ProCusDateTimeRenderConfig,
  [ProCusRadioGroupValueType]: ProCusRadioGroupRenderConfig,
};

export {
  ProDemoField,
  ProDictionarySelect,
  ProDictionaryRadioGroup,
  ProDictionaryCheckboxGroup,
  ProSearch,
  ProMoney,
  ProCusDate,
  ProCusDateTime,
  ProCusRadioGroup,
};

export default valueTypeMap;
