import { ParamsType, ProTable } from "@ant-design/pro-components";
import { GetProps } from "antd";
import { CusProComponentsType } from "../pro_components";

type CusProTableProps<
  V extends Record<string, any>,
  P extends ParamsType,
  T = CusProComponentsType,
> = GetProps<typeof ProTable<V, P, T>>;

export function CusProTable<
  V extends Record<string, any> = any,
  P extends ParamsType = any,
>(props: CusProTableProps<V, P>) {
  return <ProTable {...props} />;
}
