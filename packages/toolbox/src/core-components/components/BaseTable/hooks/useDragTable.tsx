import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { DragIndexContext, DragIndexState } from "../context/DragIndexContext";
import { ProColumns } from "@ant-design/pro-components";
import { useLocalStorageState } from "ahooks";
import { sortColumnsCacheKey } from "../utils";

export const useDragTable = ({
  columns,
  cacheKey,
}: {
  columns: ProColumns<any, any>[];
  cacheKey: string;
}) => {
  const [dragIndex, setDragIndex] = useState<DragIndexState>({
    active: -1,
    over: -1,
  });

  const [, setSortColumns] = useLocalStorageState<string[]>(
    sortColumnsCacheKey(cacheKey),
    {
      defaultValue: [],
    }
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const getNextSortColumns = () => {
        const activeIndex = columns.findIndex((i) => i.key === active?.id);
        const overIndex = columns.findIndex((i) => i.key === over?.id);
        const sortColumns =
          arrayMove([...columns], activeIndex, overIndex) ?? [];
        return sortColumns.map((i) => i.key as string);
      };
      setSortColumns(getNextSortColumns());
    }
    setDragIndex({ active: -1, over: -1 });
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const activeIndex = columns.findIndex((i) => i.key === active.id);
    const overIndex = columns.findIndex((i) => i.key === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? "right" : "left",
    });
  };

  const render = ({
    children,
    columns,
  }: {
    children: JSX.Element;
    columns: any[];
  }) => (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={columns.map((i) => i.key)}
        strategy={horizontalListSortingStrategy}
      >
        <DragIndexContext.Provider value={dragIndex}>
          {children}
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        <table>
          <thead>
            <tr>
              <th style={{ backgroundColor: "gray", padding: 16 }}>
                {
                  columns[columns.findIndex((i) => i.key === dragIndex.active)]
                    ?.title as React.ReactNode
                }
              </th>
            </tr>
          </thead>
        </table>
      </DragOverlay>
    </DndContext>
  );
  return {
    render,
  };
};
