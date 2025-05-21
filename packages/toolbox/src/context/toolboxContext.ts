import { createContext, useContext } from "react";

export type DictionaryData = Record<string, { label: string; value: string }[]>;

export interface IToolboxContext {
  router: any;
  getDictionary: () => Promise<DictionaryData>;
}

export const ToolboxContext = createContext<IToolboxContext | null>(null);

export const useToolboxContext = () => {
  return useContext(ToolboxContext);
};
