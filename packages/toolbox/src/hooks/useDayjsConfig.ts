import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLayoutEffect } from "react";

export const useDayjsConfig = () => {
  useLayoutEffect(() => {
    // dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    // dayjs.updateLocale("en", {
    //   weekStart: 1,
    // });
  }, []);
};
