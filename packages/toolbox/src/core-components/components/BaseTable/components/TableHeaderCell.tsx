import { HolderOutlined } from "@ant-design/icons";
import {
  dragActiveStyle,
  useDragIndexContext,
} from "../context/DragIndexContext";
import { useSortable } from "@dnd-kit/sortable";
import { useDevice } from "@/common/hooks/useDevice";
import { useDragEnableContext } from "@/common/components/BaseTable/context/DragEnableContext";

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

export const TableHeaderCell: React.FC<HeaderCellProps> = (props) => {
  const dragEnable = useDragEnableContext();
  const dragState = useDragIndexContext();
  const { isMobile } = useDevice();
  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } =
    useSortable({
      id: props.id,
    });
  if (!dragEnable) {
    return <th {...props}></th>;
  }
  const style: React.CSSProperties = {
    ...props.style,
    ...(isDragging
      ? { position: "relative", zIndex: 90, userSelect: "none" }
      : {}),
    ...dragActiveStyle(dragState, props.id),
  };
  const { children, ...reset } = props;
  return (
    <th {...reset} ref={setNodeRef} style={style} {...attributes}>
      <div className="flex gap-1">
        {!isMobile && props.id && (
          <span
            className="cursor-move"
            ref={setActivatorNodeRef}
            {...listeners}
          >
            <HolderOutlined />
          </span>
        )}
        {children}
      </div>
    </th>
  );
};
