import { CusProComponentsType } from "@/common/pro_components";
import { BetaSchemaForm } from "@ant-design/pro-components";
import { GetProps } from "antd";

type ICusSchemaFormProps<T, V> = GetProps<typeof BetaSchemaForm<T, V>>;

export function CusSchemaForm<T, ValueType = CusProComponentsType>(
  props: ICusSchemaFormProps<T, ValueType>
) {
  return <BetaSchemaForm {...props}></BetaSchemaForm>;
}
