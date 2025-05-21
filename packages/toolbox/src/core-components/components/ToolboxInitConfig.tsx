import { ProConfigProvider } from "@ant-design/pro-components";
import valueTypeMap from "../../pro-components";
import { IToolboxContext, ToolboxContext } from "src/context/toolboxContext";

export const ToolboxInitConfig: React.FC<{
  children: React.ReactNode;
  value: IToolboxContext;
}> = ({ children, value }) => {
  return (
    <ToolboxContext.Provider value={value}>
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        {children}
      </ProConfigProvider>
    </ToolboxContext.Provider>
  );
};
