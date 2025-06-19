import { RouteContext } from "@ant-design/pro-components";
import { useContext } from "react";

export const useRouteContext = () => {
  return useContext(RouteContext);
};
