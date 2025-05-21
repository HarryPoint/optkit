import { createContext, useContext } from "react";

export const DragEnableContext = createContext<boolean>(false);

export const useDragEnableContext = () => {
  return useContext(DragEnableContext);
};
