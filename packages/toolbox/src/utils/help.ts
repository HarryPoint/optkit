import dayjs from "dayjs";

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
