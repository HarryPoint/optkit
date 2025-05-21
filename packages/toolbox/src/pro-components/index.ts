import {
  ProDemoFieldRenderConfig,
  ProDemoFieldTransformCreator,
  ProDemoFieldValueType,
} from "./components/DemoFiled";
import {
  ProDictionarySelectRenderConfig,
  ProDictionarySelectTransformCreator,
  ProDictionarySelectValueType,
} from "./components/ProDictionarySelect";
import {
  ProDictionaryRadioGroupRenderConfig,
  ProDictionaryRadioGroupTransformCreator,
  ProDictionaryRadioGroupValueType,
} from "./components/ProDictionaryRadioGroup";
import {
  ProDictionaryCheckboxGroupRenderConfig,
  ProDictionaryCheckboxGroupTransformCreator,
  ProDictionaryCheckboxGroupValueType,
} from "./components/ProDictionaryCheckboxGroup";
import {
  ProUploadDraggerRenderConfig,
  ProUploadDraggerTransformCreator,
  ProUploadDraggerValueType,
} from "./components/ProUploadDragger";
import {
  ProUploadNormalRenderConfig,
  ProUploadNormalTransformCreator,
  ProUploadNormalValueType,
} from "./components/ProUploadNormal";
import {
  ProSearchRenderConfig,
  ProSearchTransformCreator,
  ProSearchValueType,
} from "./components/ProSearch";
import {
  ProPhoneRenderConfig,
  ProPhoneTransformCreator,
  ProPhoneValueType,
} from "./components/ProPhone";
import {
  ProMoneyRenderConfig,
  ProMoneyTransformCreator,
  ProMoneyValueType,
} from "./components/ProMoney";
import {
  ProCusDateRenderConfig,
  ProCusDateTransformCreator,
  ProCusDateValueType,
} from "./components/ProCusDate";
import {
  ProCusDateTimeRenderConfig,
  ProCusDateTimeTransformCreator,
  ProCusDateTimeValueType,
} from "./components/ProCusDateTime";
import {
  ProCusRadioGroupRenderConfig,
  ProCusRadioGroupTransformCreator,
  ProCusRadioGroupValueType,
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
  | typeof ProUploadDraggerValueType
  | typeof ProUploadNormalValueType
  | typeof ProSearchValueType
  | typeof ProPhoneValueType
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
    [ProUploadDraggerValueType]: "Please Select",
    [ProUploadNormalValueType]: "Please Select",
    [ProSearchValueType]: "Please Enter",
    [ProPhoneValueType]: "Please Enter",
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
  [ProUploadDraggerValueType]: ProUploadDraggerTransformCreator,
  [ProUploadNormalValueType]: ProUploadNormalTransformCreator,
  [ProSearchValueType]: ProSearchTransformCreator,
  [ProPhoneValueType]: ProPhoneTransformCreator,
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
  [ProUploadDraggerValueType]: ProUploadDraggerRenderConfig,
  [ProUploadNormalValueType]: ProUploadNormalRenderConfig,
  [ProSearchValueType]: ProSearchRenderConfig,
  [ProPhoneValueType]: ProPhoneRenderConfig,
  [ProMoneyValueType]: ProMoneyRenderConfig,
  [ProCusDateValueType]: ProCusDateRenderConfig,
  [ProCusDateTimeValueType]: ProCusDateTimeRenderConfig,
  [ProCusRadioGroupValueType]: ProCusRadioGroupRenderConfig,
};

export default valueTypeMap;
