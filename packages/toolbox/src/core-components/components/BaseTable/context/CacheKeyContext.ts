import { createContext, useContext } from "react";

export const CacheKeyContext = createContext<string>("");

export const useCacheKeyContext = () => {
  return useContext(CacheKeyContext);
};
