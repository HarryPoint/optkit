import { GridContext, ProForm } from "@ant-design/pro-components";
import { GetProps } from "antd";
import { formDateFormatter } from "../../utils/help";

type IProFormProps<T = Record<string, any>> = GetProps<typeof ProForm<T>>;

export function CusProForm<T>(props: IProFormProps<T>) {
  const { grid, rowProps, colProps, children, ...reset } = props;
  return (
    <ProForm<T>
      scrollToFirstError={{
        behavior: "auto",
        block: "center",
        scrollMode: "always",
        focus: true,
      }}
      dateFormatter={formDateFormatter}
      grid={grid}
      colProps={colProps}
      rowProps={rowProps}
      {...reset}
    >
      <GridContext.Provider
        value={{
          grid,
          rowProps,
          colProps,
        }}
      >
        {children}
      </GridContext.Provider>
    </ProForm>
  );
}
