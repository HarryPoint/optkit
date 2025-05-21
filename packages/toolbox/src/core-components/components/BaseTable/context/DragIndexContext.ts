import type { UniqueIdentifier } from "@dnd-kit/core";
import { createContext, useContext } from "react";

export interface DragIndexState {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
  direction?: "left" | "right";
}

export const DragIndexContext = createContext<DragIndexState>({
  active: -1,
  over: -1,
});

export const useDragIndexContext = () => {
  return useContext(DragIndexContext);
};

export const dragActiveStyle = (dragState: DragIndexState, id: string) => {
  const { active, over, direction } = dragState;
  // drag active style
  let style: React.CSSProperties = {};
  if (active && active === id) {
    style = { backgroundColor: "gray", opacity: 0.5 };
  }
  // dragover dashed style
  else if (over && id === over && active !== over) {
    style =
      direction === "right"
        ? { borderRight: "1px dashed gray" }
        : { borderLeft: "1px dashed gray" };
  }
  return style;
};
