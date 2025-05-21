import { ProConfigProvider } from "@ant-design/pro-components";
import valueTypeMap from "../../pro-components";
import { ToolboxContext } from "src/context/toolboxContext";

export const InitProConfig: React.FC<{
  children: React.ReactNode;
  router: any;
}> = ({ children, router }) => {
  return (
    <ToolboxContext.Provider value={{ router }}>
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        {children}
      </ProConfigProvider>
    </ToolboxContext.Provider>
  );
};
