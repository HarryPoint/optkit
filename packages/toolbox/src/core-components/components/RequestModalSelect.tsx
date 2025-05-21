import { EditOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, ConfigProvider, GetProps, Select } from "antd";
import { createStyles } from "antd-style";
import clsx from "clsx";
import { uniqBy } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { ContentProps, withModal } from "../../hoc/withModal";
import BaseTable, { BaseTableProps } from "./BaseTable";
import { TableCacheKey } from "./BaseTable/constant";

const HandleCta: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  return (
    <div
      className={clsx(
        "flex gap-1",
        disabled ? "pointer-events-none text-gray-500" : "text-blue-500"
      )}
    >
      <EditOutlined />
      <span>Change</span>
    </div>
  );
};

const ModalContent: React.FC<
  ContentProps<
    {
      value: string[];
      onConfirm: (selectedRowKeys: string[], selectedRows: any[]) => void;
    } & BaseTableProps
  >
> = (props) => {
  const {
    close,
    onConfirm,
    value,
    rowKey = "id",
    params: originParams = {},
    ...reset
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const params = useMemo(
    () =>
      ({
        exist_id: value?.join(","),
        ...originParams,
      } as any),
    [originParams, value]
  );

  return (
    <div>
      <BaseTable
        rowKey={rowKey}
        tableAlertRender={false}
        params={params}
        search={{ span: 8, defaultFormItemsNumber: 2 }}
        rowSelection={{
          type: "radio",
          defaultSelectedRowKeys: value,
          fixed: true,
          columnTitle: "Select",
          onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedRowKeys(selectedRowKeys as any);
            setSelectedRows(selectedRows as any);
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        {...reset}
      />
      <div className="-mx-6 mt-2 flex justify-end gap-2 border-t border-gray-200 px-6 pt-4">
        <Button onClick={close}>Cancel</Button>
        <Button
          type="primary"
          onClick={() => {
            onConfirm(selectedRowKeys, selectedRows);
            close();
          }}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

const SuffixHandleBar = withModal(HandleCta, ModalContent, {
  width: 1200,
});

const useSelectStyle = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const selectPrefixCls = getPrefixCls("select");
  return createStyles(({ css }) => ({
    select: css`
      .${selectPrefixCls}-arrow {
        pointer-events: unset;
      }
    `,
  }))();
};

type SelectProps = GetProps<typeof Select<string>>;

export type RequestModalSelectProps<T> = Omit<SelectProps, "options"> & {
  title: string;
  cacheKey: string;
  tableCacheKey: TableCacheKey;
  pageSize?: number;
  valueKey?: keyof T;
  labelKey?: keyof T;
  params?: Record<string, any>;
  disabled?: boolean;
  request: (params: {
    exist_id?: string;
    current: number;
    pageSize: number;
    [x: string]: any;
  }) => Promise<{
    total: number;
    data: T[];
    success: boolean;
  }>;
} & Pick<BaseTableProps, "searchColumns" | "columns">;

export function RequestModalSelect<T = any>(props: RequestModalSelectProps<T>) {
  const { styles } = useSelectStyle();
  const {
    request,
    params,
    cacheKey,
    tableCacheKey,
    pageSize = 1000,
    mode,
    value,
    valueKey = "id" as keyof T,
    labelKey = "name" as keyof T,
    searchColumns,
    columns,
    onChange,
    title,
    disabled,
    ...reset
  } = props;

  const multiple = mode === "multiple" || mode === "tags";

  const [selected, setSelected] = useState(false);

  const { loading, data } = useRequest(
    () =>
      request({
        exist_id: value as string,
        current: 1,
        pageSize: 1000, // 必须够大，否则后端无法保证exist_id数据在第一页
        ...(params ?? {}),
      }),
    {
      cacheKey,
      refreshDeps: [value, params],
      ready: !!value && !selected,
    }
  );

  const [selectData, setSelectData] = useState<T[]>([]);

  const createOption = (op: T[] = []) => {
    return op.map((item) => ({
      value: item[valueKey] as string,
      label: item[labelKey] as string,
      origin: item,
    }));
  };

  const options = useMemo(() => {
    const baseData = data?.data ?? [];
    const combineData = [...baseData, ...selectData];
    const uniqData = uniqBy(combineData, valueKey);
    return createOption(uniqData);
  }, [data, selectData]);

  const handleConfirm = (val: string[], origins: T[]) => {
    setSelected(true);
    setSelectData(origins);
    const newOptions = createOption(origins);
    if (multiple) {
      onChange?.(val as any, newOptions);
    } else {
      onChange?.(val?.[0], newOptions?.[0] as any);
    }
  };

  return (
    <ConfigProvider
      select={{
        className: styles.select,
      }}
    >
      <Select
        loading={loading}
        options={options}
        placeholder="Please Select"
        value={value}
        mode={mode}
        disabled={disabled}
        suffixIcon={
          <SuffixHandleBar
            contentProps={{
              value: multiple ? value : value ? [value] : [],
              cacheKey: tableCacheKey,
              rowKey: valueKey,
              request,
              searchColumns,
              columns,
              params,
              onConfirm: handleConfirm,
            }}
            modalProps={{
              title,
              // Trigger a new request
              destroyOnHidden: true,
            }}
            disabled={disabled}
          />
        }
        open={false}
        {...reset}
      />
    </ConfigProvider>
  );
}
