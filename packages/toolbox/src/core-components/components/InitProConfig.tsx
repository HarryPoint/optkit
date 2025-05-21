import { ProConfigProvider } from "@ant-design/pro-components";
import valueTypeMap from "../../pro-components";

export const InitProConfig: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
      {children}
    </ProConfigProvider>
  );
};
