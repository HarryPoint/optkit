import { useRequest } from "ahooks";
import { IDictionaryData, useToolboxContext } from "src/context/toolboxContext";

const GET = async (): Promise<IDictionaryData> => {
  console.log("getDictionary not config");
  return {};
};

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
