import {
  ProDescriptions,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { GetProps } from "antd";
import { CusProComponentsType } from "../../pro-components";

type CusProDescriptionsProps<
  V extends Record<string, any> = any,
  T = CusProComponentsType
> = GetProps<typeof ProDescriptions<V, T>>;

export type CusProDescriptionsItemProps<V extends Record<string, any> = any> =
  ProDescriptionsItemProps<V, CusProComponentsType>;

export function CusProDescriptions<
  V extends Record<string, any> = any,
  T = CusProComponentsType
>(props: CusProDescriptionsProps<V, T>) {
  return <ProDescriptions {...props} />;
}
