import dayjs from "dayjs";

export const dateFormatTpl = "DD MMM YYYY";

export const dateFormatFn = (s: dayjs.ConfigType) => {
  return dayjs(s).format(dateFormatTpl);
};

export const dateTimeFormatTpl = "DD MMM YYYY, HH:mm A";

export const dateTimeFormatFn = (s: dayjs.ConfigType) => {
  return dayjs(s).format(dateTimeFormatTpl);
};
