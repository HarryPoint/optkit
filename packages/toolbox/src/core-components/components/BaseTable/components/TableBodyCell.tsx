import {
  dragActiveStyle,
  useDragIndexContext,
} from "../context/DragIndexContext";

interface BodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

export const TableBodyCell: React.FC<BodyCellProps> = (props) => {
  const dragState = useDragIndexContext();
  return (
    <td
      {...props}
      style={{ ...props.style, ...dragActiveStyle(dragState, props.id) }}
    />
  );
};
