import { ProColumns } from "@ant-design/pro-components";
import { createContext, useContext } from "react";

export const TableColumnsContext = createContext<ProColumns<any, any>[]>([]);

export const useTableColumnsContext = () => {
  return useContext(TableColumnsContext);
};
