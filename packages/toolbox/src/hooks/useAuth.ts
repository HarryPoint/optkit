import {
  ACCESS_TOKEN,
  DEFAULT_AUTHORIZED_PATH,
  REFRESH_TOKEN,
} from "@/common/constant/auth";
import qs from "qs";
import { getEnv } from "@/common/utils/env";

export const login = () => {
  const env = getEnv();
  window.location.href = `${env.NEXT_PUBLIC_AUTH_SERVER}/templates/login${qs.stringify(
    {
      redirect_uri: `${window.location.origin}/authVerify${window.location.search}`,
    },
    { addQueryPrefix: true }
  )}`;
};

export const verify = () => {
  const authData = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { access_token: string; refresh_token: string; callback?: string };
  localStorage.setItem(ACCESS_TOKEN, authData?.access_token);
  localStorage.setItem(REFRESH_TOKEN, authData?.refresh_token);
  window.location.href = `${authData?.callback ?? DEFAULT_AUTHORIZED_PATH}`;
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = `/login${qs.stringify({ callback: window.location.href }, { addQueryPrefix: true })}`;
};

export const useAuth = () => {
  return {
    login,
    logout,
    verify,
  };
};
