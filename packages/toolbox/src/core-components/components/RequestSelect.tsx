import { useRequest, useSessionStorageState } from "ahooks";
import { GetProps, Select, Spin } from "antd";
import { unionBy } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useEntity } from "../hooks/useEntity";

type SelectProps = GetProps<typeof Select<string>>;

type DataItem<T = any> = {
  label: string;
  value: string;
  origin: T;
  disabled?: boolean;
};
type DisabledOption<T = any> = (option: T, disabled?: boolean) => boolean;

export type RequestSelectProps<T = any> = Omit<
  SelectProps,
  "options" | "popupRender"
> & {
  cacheKey: string;
  disabledOption?: DisabledOption<T>;
  renderMode?: "edit" | "read";
  pageSize?: number;
  params?: Record<string, any>;
  remoteSearch?: boolean;
  request: (params: {
    searchValue?: string;
    current: number;
    pageSize: number;
    exist_id?: string;
  }) => Promise<{
    total: number;
    data: DataItem[];
    success: boolean;
  }>;
  popupRender: (
    menu: React.ReactElement,
    arg: { searchLoading: boolean }
  ) => React.ReactElement;
};

export function RequestSelect<T = any>(props: RequestSelectProps<T>) {
  const {
    renderMode = "edit",
    request,
    pageSize = 1000,
    mode,
    value,
    params,
    disabledOption,
    remoteSearch,
    cacheKey,
    onChange,
    popupRender,
    ...reset
  } = props;

  const transformDataToOptions = useCallback(
    (data?: DataItem<T>[]) => {
      const res = data || [];
      return res?.map((item) => ({
        ...item,
        disabled:
          disabledOption?.(item?.origin, item.disabled) ?? item.disabled,
      }));
    },
    [disabledOption]
  );
  const { entity } = useEntity();

  const [cacheOptions = [], setCacheOptions] = useSessionStorageState<
    DataItem<T>[]
  >(`request-select:bu-${entity}:${cacheKey}:${JSON.stringify(params ?? {})}`, {
    defaultValue: [],
  });

  const [searching, setSearching] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<DataItem<T>[]>([]);

  const multiple = useMemo(() => mode === "multiple", [mode]);

  const exist_id = useMemo(() => {
    return (multiple && Array.isArray(value) ? value?.join("|") : value) ?? "";
  }, [multiple, value]);

  const {
    loading: initLoading,
    data: initData,
    run: initRun,
  } = useRequest(
    () => {
      return request({
        exist_id,
        pageSize,
        current: 1,
        ...params,
      });
    },
    {
      cacheKey: `${cacheKey}${JSON.stringify(params ?? {})}${exist_id}`,
      refreshDeps: [params],
      onSuccess(result) {
        setCacheOptions(transformDataToOptions(result?.data));
      },
    }
  );

  const {
    loading: searchLoading,
    data: searchData,
    run: searchRun,
  } = useRequest(
    (searchValue: string = "") => {
      return request({
        exist_id,
        searchValue,
        pageSize,
        current: 1,
        ...params,
      });
    },
    {
      debounceWait: 500,
      debounceLeading: true,
      manual: true,
    }
  );

  const initOptions = useMemo(() => {
    return transformDataToOptions(initData?.data);
  }, [initData, transformDataToOptions]);

  const searchOptions = useMemo(() => {
    return transformDataToOptions(searchData?.data);
  }, [searchData, transformDataToOptions]);

  const combineOptions = useMemo(() => {
    return unionBy(
      [...selectedOptions, ...initOptions, ...cacheOptions],
      "value"
    );
  }, [initOptions, selectedOptions, cacheOptions]);

  const options = useMemo(() => {
    if (searching) {
      return searchOptions;
    } else {
      return combineOptions;
    }
  }, [initOptions, searchOptions, searching]);

  const loading = useMemo(() => {
    return initLoading || searchLoading;
  }, [initLoading, searchLoading]);

  if (renderMode === "read") {
    return options?.find((item) => item.value === value)?.label;
  }

  return (
    <Select
      loading={loading}
      options={options}
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder="Please Select"
      value={value}
      mode={mode}
      filterOption={remoteSearch ? false : undefined}
      onSearch={(val) => {
        if (remoteSearch) {
          searchRun(val);
          setSearching(true);
        }
      }}
      onChange={(val: any, ops: any) => {
        if (multiple) {
          setSelectedOptions(ops);
        } else {
          setSelectedOptions(ops ? [ops] : []);
        }
        onChange?.(val, ops);
      }}
      onOpenChange={(bl) => {
        if (bl) {
          // Prevent old data
          initRun();
        } else {
          setSearching(false);
        }
      }}
      popupRender={(menu) => {
        const menuWithLoading = <Spin spinning={searchLoading}>{menu}</Spin>;
        if (popupRender) {
          return popupRender(menuWithLoading, { searchLoading });
        }
        return menuWithLoading;
      }}
      {...reset}
    />
  );
}
