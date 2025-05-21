import { useRouteContext } from "@/common/hooks/useRouteContext";

export const useDevice = () => {
  const { isMobile } = useRouteContext();
  return { isMobile };
};
