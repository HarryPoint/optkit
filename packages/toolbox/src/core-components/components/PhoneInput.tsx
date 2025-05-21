import { useRequest } from "ahooks";
import { GetProps, Input, Select } from "antd";
import { sortBy, uniqBy } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

const GET = async () => {
  return {};
};

export type PhoneInputProps<
  C extends string = "phone_country_code",
  P extends string = "phone_number",
  N extends string = "contact_no"
> = GetProps<typeof Input> & {
  value?: Record<C | P | N, string>;
  countryCodeKey?: C;
  phoneNumberKey?: P;
  contactNumberKey?: N;
  onChange?: (value: Record<C | P | N, string>) => void;
};

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const {
    value,
    countryCodeKey = "phone_country_code",
    phoneNumberKey = "phone_number",
    contactNumberKey = "contact_no",
    onChange,
    ...reset
  } = props;

  const [countryCode, setCountryCode] = useState(value?.[countryCodeKey] ?? "");
  const [phoneNumber, setPhoneNumber] = useState(value?.[phoneNumberKey] ?? "");

  const { data, loading } = useRequest(GET, {
    cacheKey: "country-list",
    staleTime: 1000 * 60,
  });

  const options = useMemo(() => {
    const baseData =
      data?.data?.map((item) => ({
        value: item.region,
        label: item.flag_path,
        origin: item,
      })) ?? [];
    const uniqData = uniqBy(baseData, "value");
    return sortBy(uniqData, (val) => Number(val.value));
  }, [data]);

  useEffect(() => {
    setCountryCode(value?.[countryCodeKey] ?? "");
    setPhoneNumber(value?.[phoneNumberKey] ?? "");
  }, [value, countryCodeKey, phoneNumberKey]);

  useEffect(() => {
    if (!loading && !countryCode) {
      const defaultOption =
        options.find((item) => item.origin.name === "Singapore") ?? options[0];
      if (defaultOption?.value) {
        setCountryCode(defaultOption?.value);
      }
    }
  }, [loading, options, countryCode]);

  return (
    <Input
      allowClear
      addonBefore={
        <Select
          loading={loading}
          value={countryCode}
          options={options}
          popupMatchSelectWidth={false}
          labelRender={(val) => {
            return (
              <div className="flex items-center justify-between gap-1">
                <div
                  className="aspect-square w-5 bg-contain bg-center bg-no-repeat"
                  style={
                    val?.label
                      ? {
                          backgroundImage: `url(${val?.label})`,
                        }
                      : {}
                  }
                />
                <span>{val.value}</span>
              </div>
            );
          }}
          optionRender={(option) => {
            return (
              <div className="flex items-center justify-between gap-1">
                <div
                  className="aspect-square w-5 bg-contain bg-center bg-no-repeat"
                  style={
                    option?.data?.origin?.flag_path
                      ? {
                          backgroundImage: `url(${option?.data?.origin?.flag_path})`,
                        }
                      : {}
                  }
                />
                <span>{option.value}</span>
              </div>
            );
          }}
          onChange={(value) => {
            setCountryCode(value);
            onChange?.({
              [countryCodeKey]: value,
              [phoneNumberKey]: phoneNumber,
              [contactNumberKey]: `${value}${phoneNumber}`,
            });
          }}
        />
      }
      placeholder="Please enter phone number"
      value={phoneNumber}
      onChange={(e) => {
        setPhoneNumber(e.target.value);
        onChange?.({
          [countryCodeKey]: countryCode,
          [phoneNumberKey]: e.target.value,
          [contactNumberKey]: `${countryCode}${e.target.value}`,
        });
      }}
      {...reset}
    />
  );
};
