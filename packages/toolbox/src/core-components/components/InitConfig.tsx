"use client";
import { useApp } from "@/common/hooks/useApp";
import { useDayjsConfig } from "@/common/hooks/useDayjsConfig";
import { ProConfigProvider } from "@ant-design/pro-components";
import valueTypeMap from "@/common/pro_components";
import { StoreProvider } from "./StoreProvider";

export const InitConfig: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useDayjsConfig();
  useApp();
  return (
    <StoreProvider>
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        {children}
      </ProConfigProvider>
    </StoreProvider>
  );
};
