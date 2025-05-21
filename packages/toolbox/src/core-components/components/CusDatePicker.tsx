import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { dateFormatTpl } from "../../utils/format";

export type CusDatePickerProps<T = any> = DatePickerProps & {
  renderMode?: "edit" | "read";
};

export const cusDatePickerRead = ({ value }: CusDatePickerProps): string => {
  return dayjs(value).isValid() ? dayjs(value).format(dateFormatTpl) : "-";
};

export const CusDatePicker: React.FC<CusDatePickerProps> = (props) => {
  const { value, renderMode = "edit", ...rest } = props;
  if (renderMode === "read") {
    return cusDatePickerRead(props);
  }
  return (
    <DatePicker
      className="w-full"
      format={dateFormatTpl}
      value={value ? dayjs(value) : value}
      {...rest}
    />
  );
};

export default CusDatePicker;
