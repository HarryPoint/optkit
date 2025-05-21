import { withModal } from "@/common/hoc/withModal";
import { TableOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import { useTableColumnsContext } from "../context/TableColumnsContext";
import { useLocalStorageState } from "ahooks";
import { useCacheKeyContext } from "../context/CacheKeyContext";
import { hiddenColumnsCacheKey } from "../utils";

const ColumnsCta = () => {
  return <Button icon={<TableOutlined />}>Columns</Button>;
};

const ModalContent = () => {
  const cacheKey = useCacheKeyContext();
  const tableColumns = useTableColumnsContext() ?? [];
  const [hiddenColumns = [], setHiddenColumns] = useLocalStorageState<string[]>(
    hiddenColumnsCacheKey(cacheKey),
    {
      defaultValue: [],
      listenStorageChange: true,
    }
  );
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 pb-6">
        {tableColumns.map((item) => (
          <div key={item.key}>
            <div className="flex gap-6">
              <Switch
                checked={!item.hideInTable}
                onChange={(bl) => {
                  const targetKey = item.key as string;
                  const newHiddenColumns = bl
                    ? hiddenColumns.filter((col) => {
                        return col !== targetKey;
                      })
                    : [...hiddenColumns, targetKey];
                  setHiddenColumns(newHiddenColumns);
                }}
              />
              <div>{item.title as string}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => {
            setHiddenColumns(tableColumns?.map((item) => item.key as string));
          }}
        >
          Hide All
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setHiddenColumns([]);
          }}
        >
          Show All
        </Button>
      </div>
    </div>
  );
};

export default withModal(ColumnsCta, ModalContent, {
  title: "Columns",
});
