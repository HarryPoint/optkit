import { CusProComponentsType } from "../../pro-components";
import { ProField } from "@ant-design/pro-components";
import { GetProps } from "antd";

type OriginProps = GetProps<typeof ProField>;

type CusProFieldProps<V = CusProComponentsType> = Omit<
  OriginProps,
  "valueType"
> & {
  valueType?: OriginProps["valueType"] | CusProComponentsType | V;
};

export function CusProField<ValueType = CusProComponentsType>(
  props: CusProFieldProps<ValueType>
) {
  return <ProField {...(props as any)}></ProField>;
}
