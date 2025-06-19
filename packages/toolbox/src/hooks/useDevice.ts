import { useRouteContext } from "./useRouteContext";
import { useResponsive } from "ahooks";

export const useDevice = () => {
  const { isMobile } = useRouteContext();
  const responsive = useResponsive();
  // 使用 responsive 信息作为后备方案
  return { isMobile: isMobile ?? !responsive?.sm };
};
