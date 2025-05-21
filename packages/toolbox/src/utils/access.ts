import { groupBy } from "lodash";

type IV1GeneralResourceData = any;

type AccessInfoObj = {
  access_type: Map<string, IV1GeneralResourceData>;
  business_unit_type: Map<string, IV1GeneralResourceData>;
  feature_type: Map<string, IV1GeneralResourceData>;
};

let accessInfoArrCache: IV1GeneralResourceData[] = [];

export const createAccess = (
  accessInfoArr: IV1GeneralResourceData[] = accessInfoArrCache
) => {
  accessInfoArrCache = accessInfoArr;
  const accessInfoObjBase = groupBy(accessInfoArr, "type");
  const accessInfoStore: AccessInfoObj = {
    access_type: new Map(
      accessInfoObjBase["access_type"]?.map((item) => [
        item.value as string,
        item,
      ]) ?? []
    ),
    business_unit_type: new Map(
      accessInfoObjBase["business_unit_type"]?.map((item) => [
        item.value as string,
        item,
      ]) ?? []
    ),
    feature_type: new Map(
      accessInfoObjBase["feature_type"]?.map((item) => [
        item.value as string,
        item,
      ]) ?? []
    ),
  };

  const isAdmin = () => {
    return accessInfoStore?.access_type.has("admin");
  };

  return {
    getBusinessUnitIds: () => {
      return Array.from(accessInfoStore?.business_unit_type?.keys() ?? []);
    },
    checkAdmin: () => isAdmin(),
    checkBusinessUnit: (businessUnit: string) => {
      if (isAdmin()) {
        return true;
      }
      const buStr = `${businessUnit}`;
      return accessInfoStore?.business_unit_type.has(buStr);
    },
    checkFeature: (feature: string) => {
      if (isAdmin()) {
        return true;
      }
      return accessInfoStore?.feature_type.has(feature);
    },
  };
};
