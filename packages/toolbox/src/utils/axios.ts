import { getEnv } from "@/common/utils/env";
import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { debounce, omit } from "lodash";
import { ACCESS_TOKEN, ENTITY } from "../constant/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jumpToLogin = debounce((_msg: string = "Unknown error") => {
  if (window.location.pathname === "/login") {
    return;
  }
  window.location.href = "/login";
}, 2000);

const createAxiosInstance = () => {
  const ins = axios.create({
    baseURL: "/api",
  });
  ins.interceptors.request.use(
    function (config) {
      config.headers["Tenant-Key"] = getEnv().NEXT_PUBLIC_AUTH_TENANT_KEY;
      const accessToken = global?.localStorage?.getItem?.(ACCESS_TOKEN);
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      const entity = global?.localStorage?.getItem?.(ENTITY);
      if (entity && !config.headers.business_id) {
        try {
          config.headers.business_id = JSON.parse(entity);
        } catch (err) {
          console.log("err", err);
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  ins.interceptors.response.use(
    function (response) {
      if (response?.data?.code !== 0) {
        throw new Error(response?.data?.message ?? "server error");
      }
      return response;
    },
    function (error) {
      const errorCode = error?.response?.data?.code;
      if (
        errorCode === 16 || // FMS
        errorCode === 100005 || // RBAC dont have token
        errorCode === 100006 || // RBAC invalid token
        errorCode === 100007 || // RBAC expired token
        errorCode === 100008 // The refresh token has expired
      ) {
        jumpToLogin(error?.response?.data?.message);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  return ins;
};

export const axiosFetch = createAxiosInstance();

export const handleFetchError = (error: any) => {
  const msg =
    error?.response?.data?.message ??
    error?.message ??
    "Unknown error. Please try again or contact our support to get more information!";
  message.error(msg, 3);
};

export const apiFetch = async <T = any>(
  options: AxiosRequestConfig & { path?: Record<string, any> },
  extraOptions: { skipErrorTips?: boolean } = {}
) => {
  const { skipErrorTips = false } = extraOptions;
  const path = options.path || {};
  const config = omit(options, "path");
  let { url } = config;
  Object.keys(path).forEach((key) => {
    url = url?.replaceAll(`{${key}}`, `${path[key]}`);
  });
  if (url?.startsWith("/api/")) {
    url = url?.replace("/api/", "");
  }
  try {
    const data = await axiosFetch<T>({
      ...config,
      url,
    });
    return data?.data;
  } catch (error: any) {
    const rejectError = Promise.reject(error);
    if (skipErrorTips !== true && error?.skip !== true) {
      handleFetchError(error);
    }
    return rejectError;
  }
};
