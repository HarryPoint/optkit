import {
  createPlaceholder,
  CusProComponentsType,
  transformMap,
} from "../../../pro-components";
import {
  ActionType,
  ParamsType,
  ProColumns,
  ProFormInstance,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import {
  useDebounceFn,
  useLocalStorageState,
  useSessionStorageState,
} from "ahooks";
import { GetProps } from "antd";
import {
  isBoolean,
  isEmpty,
  isNumber,
  isString,
  merge,
  omit,
  omitBy,
} from "lodash";
import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import { TableBodyCell } from "./components/TableBodyCell";
import { TableHeaderCell } from "./components/TableHeaderCell";
import { TableCacheKey } from "./constant";
import { CacheKeyContext } from "./context/CacheKeyContext";
import { DragEnableContext } from "./context/DragEnableContext";
import { TableColumnsContext } from "./context/TableColumnsContext";
import { useDragTable } from "./hooks/useDragTable";
import {
  dataIndexToKey,
  hiddenColumnsCacheKey,
  searchFormCacheKey,
  sortColumnsCacheKey,
} from "./utils";
import { useDevice } from "../../../hooks";

export type BaseTableActionType = ActionType;

export type BaseTableSearchForm = ProFormInstance;

export type BaseTableProps<T extends Record<string, any> = any> = GetProps<
  typeof BaseTable<T>
>;

const BaseTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = CusProComponentsType
>(
  props: ProTableProps<DataType, Params, ValueType> & {
    cacheKey: TableCacheKey | string;
    searchColumns?: ProTableProps<DataType, Params, ValueType>["columns"];
    actionRef?: React.Ref<BaseTableActionType | undefined>;
    formRef?: React.Ref<BaseTableSearchForm | undefined>;
    beforeInitialForm?: (
      arg: {
        cacheValues: Record<string, any>;
        initialValues: Record<string, any>;
        initialFormFlag: boolean;
      },
      defaultFn: () => Record<string, any>
    ) => Record<string, any>;
  }
) => {
  const {
    cacheKey,
    columns: originTableColumns = [],
    searchColumns: originSearchColumns = [],
    actionRef: originActionRef,
    formRef: originFormRef,
    beforeInitialForm,
  } = props;

  const { isMobile } = useDevice();

  const [initialFormFlag, setInitialFormFlag] = useState<boolean>(false);

  const actionRef = useRef<ActionType>(null);

  const formRef = useRef<ProFormInstance>(null);

  useImperativeHandle(
    originActionRef,
    () => {
      return {
        ...(actionRef.current as any),
      };
    },
    []
  );

  useImperativeHandle(
    originFormRef,
    () => {
      return {
        ...(formRef.current as any),
      };
    },
    []
  );

  const [hiddenColumns] = useLocalStorageState<string[]>(
    hiddenColumnsCacheKey(cacheKey),
    {
      defaultValue: [],
      listenStorageChange: true,
    }
  );

  const [sortColumns = []] = useLocalStorageState<string[]>(
    sortColumnsCacheKey(cacheKey),
    {
      defaultValue: [],
      listenStorageChange: true,
    }
  );

  const [searchFormInitialValues, setSearchFormInitialValues] =
    useSessionStorageState<Record<string, any>>(searchFormCacheKey(cacheKey), {
      defaultValue: {},
    });

  const initialValues = useMemo(() => {
    const originInitialValues = props?.form?.initialValues ?? {};
    const defaultLogic = () => {
      return initialFormFlag
        ? originInitialValues
        : { ...searchFormInitialValues, ...originInitialValues };
    };
    if (beforeInitialForm) {
      return beforeInitialForm(
        {
          cacheValues: searchFormInitialValues,
          initialValues: originInitialValues,
          initialFormFlag,
        },
        defaultLogic
      );
    }
    return defaultLogic();
  }, [
    props?.form?.initialValues,
    searchFormInitialValues,
    initialFormFlag,
    beforeInitialForm,
  ]);

  const { run: debounceUpdateSearchFormInitialValues } = useDebounceFn(
    () => {
      const formVal = formRef?.current.getFieldsFormatValue();
      const omitVal = omitBy(formVal, (v) => {
        if (isNumber(v)) {
          return false;
        }
        if (isString(v)) {
          return v === "";
        }
        if (isBoolean(v)) {
          return false;
        }
        return isEmpty(v);
      });
      setSearchFormInitialValues(omitVal);
    },
    {
      wait: 300,
    }
  );

  const tableColumns = useMemo<ProColumns<DataType, ValueType>[]>(() => {
    return originTableColumns
      .map((col) => {
        const key = (col.key ??
          dataIndexToKey(
            (col.dataIndex as string) ?? (col.title as string)
          )) as string;
        return {
          hideInSearch: true,
          key,
          hideInTable: hiddenColumns?.includes(key as string),
          onCell: () => ({ id: key }),
          onHeaderCell: () => ({ id: key }),
          ...col,
        };
      })
      .sort(
        (a, b) =>
          sortColumns.indexOf(a.key as string) -
          sortColumns.indexOf(b.key as string)
      );
  }, [originTableColumns, hiddenColumns, sortColumns]);

  const searchColumns = useMemo<ProColumns<DataType, ValueType>[]>(() => {
    return originSearchColumns.map((col) =>
      merge(
        {
          hideInTable: true,
          search: {
            transform: transformMap[
              col.valueType as keyof typeof transformMap
            ]?.(col as any),
          },
          fieldProps: {
            placeholder: createPlaceholder(col as any),
          },
        },
        col
      )
    );
  }, [originSearchColumns]);

  const { render } = useDragTable({ columns: tableColumns, cacheKey });

  const calcColumns: ProTableProps<DataType, Params, ValueType>["columns"] =
    useMemo(() => {
      return [...tableColumns, ...searchColumns];
    }, [tableColumns, searchColumns]);

  const searchSpan = useMemo(() => {
    return (props.search && props?.search?.span) ?? (isMobile ? 12 : 6);
  }, [isMobile]);

  const defaultCollapsed = useMemo(() => {
    if (isEmpty(initialValues)) {
      return true;
    }
    const col = Math.floor(24 / (searchSpan as number)) - 1;
    const firstRowSearchKeys = searchColumns
      ?.slice(0, col)
      ?.map((item) => dataIndexToKey(item.dataIndex as string));
    const resetData = omit(initialValues, firstRowSearchKeys);
    return isEmpty(resetData);
  }, [searchSpan, initialValues, searchColumns]);

  const children = (
    <DragEnableContext.Provider value={false}>
      <CacheKeyContext.Provider value={cacheKey}>
        <TableColumnsContext.Provider value={tableColumns}>
          <ProTable
            {...props}
            pagination={{
              showSizeChanger: true,
              showTotal: (total) => <div>Total {total} items</div>,
              ...(props?.pagination ?? {}),
            }}
            actionRef={actionRef}
            options={false}
            scroll={{
              x: "max-content",
            }}
            bordered
            search={{
              layout: "vertical",
              style: {
                padding: "0px",
              },
              span: searchSpan,
              defaultCollapsed,
              searchGutter: [10, 10],
              ...(props?.search ?? {}),
            }}
            form={{
              initialValues,
              onValuesChange(_, val) {
                formRef.current?.submit();
              },
            }}
            beforeSearchSubmit={(v) => {
              setInitialFormFlag(true);
              debounceUpdateSearchFormInitialValues();
              if (props?.beforeSearchSubmit) {
                return props?.beforeSearchSubmit(v);
              }
              return v;
            }}
            debounceTime={props?.debounceTime ?? 300}
            formRef={formRef}
            columns={calcColumns}
            components={{
              header: {
                cell: TableHeaderCell,
              },
              body: {
                cell: TableBodyCell,
              },
            }}
          />
        </TableColumnsContext.Provider>
      </CacheKeyContext.Provider>
    </DragEnableContext.Provider>
  );
  return render({ children, columns: tableColumns });
};

export default BaseTable;
