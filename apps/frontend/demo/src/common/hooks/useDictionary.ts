import { useRequest } from "ahooks";
import { useMemo } from "react";

const dictionaryData = {
  category1: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ],
  category2: [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
  ],
};

export type ResData = {
  data: Record<string, { label: string; value: string }[]>;
};

const fakeFetch = async () => {
  const data = {
    data: dictionaryData,
  };
  return data;
};
export type DictionaryCategory = keyof typeof dictionaryData;

export const useDictionary = () => {
  const { loading, data } = useRequest(fakeFetch, {
    cacheKey: "dictionary",
    staleTime: 1000 * 60 * 60 * 24,
  });
  const categoryGroup = useMemo(() => {
    return data?.data;
  }, [data]);

  return { loading, data, categoryGroup };
};
