"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import axios from "axios";
import { BaseTable } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <BaseTable
        cacheKey="demo"
        beforeInitialForm={({
          initialValues,
          cacheValues,
          initialFormFlag,
        }) => {
          console.log("beforeInitialForm: ", initialValues);
          if (initialFormFlag) {
            return initialValues;
          }
          return {
            ...cacheValues,
            search2: "search6",
          };
        }}
        form={{
          initialValues: { search: "sdkfsdjkfj" },
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
          {
            title: "search",
            dataIndex: "search2",
          },
          {
            title: "search",
            dataIndex: "search3",
            valueType: "text",
          },
          {
            title: "search",
            dataIndex: "search4",
          },
          {
            title: "search",
            dataIndex: "search5",
            valueType: "dateRange",
          },
          {
            title: "search",
            dataIndex: "search6",
          },
          {
            title: "search",
            dataIndex: "search7",
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
