import { createContext, useContext } from "react";

export type IDictionaryData = Record<
  string,
  { label: string; value: string }[]
>;

export interface IToolboxContext {
  getDictionary: () => Promise<IDictionaryData>;
}

export const ToolboxContext = createContext<IToolboxContext | null>(null);

export const useToolboxContext = () => {
  return useContext(ToolboxContext);
};
