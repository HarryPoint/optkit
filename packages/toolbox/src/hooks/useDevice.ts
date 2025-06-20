import { useBreakpoint } from "@ant-design/pro-components";
import { useMemo } from "react";

export const useDevice = () => {
  const colSize = useBreakpoint();
  const isMobile = useMemo(() => {
    return colSize === "sm" || colSize === "xs" || colSize === "md";
  }, [colSize]);

  return { isMobile: isMobile };
};
