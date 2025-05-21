import { useRequest } from "ahooks";
import { GetApiReturn } from "../utils/help";
import { DictionaryData, useToolboxContext } from "src/context/toolboxContext";

const GET = async (): Promise<DictionaryData> => {
  console.log("getDictionary not config");
  return {};
};

export type ResData = GetApiReturn<typeof GET>;
export type DictionaryCategory = keyof ResData;

export const useDictionary = () => {
  const { getDictionary } = useToolboxContext();
  const { loading, data: categoryGroup } = useRequest(
    () => {
      return getDictionary?.() ?? GET();
    },
    {
      cacheKey: "dictionary",
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { loading, categoryGroup };
};
