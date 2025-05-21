import { useRequest } from "ahooks";
import { createAccess } from "../utils/access";
// import { GET } from "@/autoApi/api/v1/authority/general-resource";
import { useMemo } from "react";

export const fetchAccess = () => {
  return Promise.resolve({
    data: {
      list: [],
    },
  });
};

export const useAccess = () => {
  const { data, loading } = useRequest(fetchAccess, {
    cacheKey: "access",
    staleTime: 1000 * 60,
  });

  const access = useMemo(() => {
    return createAccess(data?.data?.list);
  }, [data?.data?.list]);

  return { access, loading };
};
