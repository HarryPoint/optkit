import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import { ENTITY } from "../constant/auth";

// get Api options type
export type GetApiOptions<T> = T extends (
  options: infer O,
  ...args: any[]
) => any
  ? O
  : never;

// get Api return type
export type GetApiReturn<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

export type GetApiReturnData<T> = T extends (
  ...args: any[]
) => Promise<{ data: infer R }>
  ? R
  : never;

export type GetApiListItem<T> = T extends (
  ...arg: any[]
) => Promise<{ data: { lists: (infer R)[] } }>
  ? R
  : never;

export const formDateFormatter = (value: dayjs.Dayjs) => {
  const res = value.toISOString();
  return res;
};

export const downloadFile = async (url: string, filename?: string) => {
  try {
    const entity = global?.localStorage?.getItem?.(ENTITY);
    const response = await fetch(url, {
      headers: {
        business_id: entity ? JSON.parse(entity) : undefined,
      },
    });
    const urlObj = new URL(
      url.startsWith("http") ? url : `${window.location.origin}${url}`
    );
    const defaultFilename = urlObj.pathname.split("/").pop() ?? "";
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const link = document.createElement("a");
    const objectURL = URL.createObjectURL(blob);
    link.href = objectURL;
    link.setAttribute("download", filename ?? defaultFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    // console.error("Error downloading file: ", error);
    throw new Error(`Error downloading file:: ${error}`);
  }
};

export const copyText = async (text: string) => {
  return copy(text, {
    debug: true,
    message: "Press #{key} to copy",
  });
};
