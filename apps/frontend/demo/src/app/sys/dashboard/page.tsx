"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import axios from "axios";
import { BaseTable } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <BaseTable
        cacheKey="demo"
        // beforeInitialForm={() => {
        //   console.log("beforeInitialForm: ", val);
        //   return {
        //     ...val,
        //   };
        // }}
        form={{
          initialValues: ({ cacheValues, initialFormFlag }) => {
            if (initialFormFlag) {
              return { search: "sdkfsdjkfj" };
            }
            return cacheValues;
          },
        }}
        onSubmit={(val) => {
          console.log("onSubmitval: ", val);
        }}
        searchColumns={[
          {
            title: "search",
            dataIndex: "search",
          },
          {
            title: "search",
            dataIndex: "search1",
            valueType: "dateRange",
          },
        ]}
        columns={[
          { title: "demo", dataIndex: "demo" },
          {
            title: "search",
            dataIndex: "search",
            key: "col-search",
          },
        ]}
        request={async ({ ...arg }) => {
          console.log("async: ", arg);

          return {
            success: true,
            data: Array.from({ length: 20 }, (_, index) => {
              return {
                demo: index,
                id: index,
                search: `search=${index}`,
              };
            }),
            total: 100,
          };
        }}
      >
        Dashboard
      </BaseTable>
    </PageWrapper>
  );
}
