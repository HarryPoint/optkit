import { useRequest } from "ahooks";
import { useMemo } from "react";
import { GetApiReturn } from "../utils/help";

const GET = async () => {
  return {
    data: {},
  };
};

export type ResData = GetApiReturn<typeof GET>["data"];
export type DictionaryCategory = keyof ResData;

export const useDictionary = () => {
  const { loading, data } = useRequest(GET, {
    cacheKey: "dictionary",
    staleTime: 1000 * 60 * 60 * 24,
  });
  const categoryGroup = useMemo(() => {
    return data?.data;
  }, [data]);

  return { loading, data, categoryGroup };
};
