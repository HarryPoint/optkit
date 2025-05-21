import { ProForm } from "@ant-design/pro-components";
import { GetProps } from "antd";
import { formDateFormatter } from "../../utils/help";

type IProFormProps<T = Record<string, any>> = GetProps<typeof ProForm<T>>;

export function CusProForm<T>(props: IProFormProps<T>) {
  return (
    <ProForm<T>
      scrollToFirstError={{
        behavior: "auto",
        block: "center",
        scrollMode: "always",
        focus: true,
      }}
      colProps={{
        span: 12,
      }}
      dateFormatter={formDateFormatter}
      {...props}
    ></ProForm>
  );
}
