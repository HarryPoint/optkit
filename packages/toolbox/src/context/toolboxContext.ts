import { createContext, useContext } from "react";

export interface IToolbox {
  router: any;
}

export const ToolboxContext = createContext<IToolbox | null>(null);

export const useToolboxContext = () => {
  return useContext(ToolboxContext);
};
