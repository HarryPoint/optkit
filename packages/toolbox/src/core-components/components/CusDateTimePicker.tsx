import { DatePicker, GetProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { dateTimeFormatTpl } from "../../utils/format";

export type CusDateTimePickerProps<T = any> = GetProps<typeof DatePicker<T>> & {
  renderMode: "edit" | "read";
};

export const cusDateTimePickerRead = ({
  value,
}: CusDateTimePickerProps): string => {
  return dayjs(value).isValid() ? dayjs(value).format(dateTimeFormatTpl) : "-";
};

export const CusDateTimePicker: React.FC<CusDateTimePickerProps> = (props) => {
  const { value, renderMode = "edit", ...rest } = props;
  if (renderMode === "read") {
    return cusDateTimePickerRead(props);
  }
  return (
    <DatePicker
      className="w-full"
      showTime
      format={dateTimeFormatTpl}
      value={value ? dayjs(value) : value}
      {...rest}
    />
  );
};

export default CusDateTimePicker;
