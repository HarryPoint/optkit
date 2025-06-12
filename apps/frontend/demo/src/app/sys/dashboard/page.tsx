"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import { BaseTable } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <BaseTable
        cacheKey="demo"
        beforeInitialForm={(val) => {
          console.log("beforeInitialForm: ", val);
          return {
            ...val,
            search1: "sdf",
          };
        }}
        searchColumns={[
          {
            title: "search",
            dataIndex: "search",
          },
          {
            title: "search",
            dataIndex: "search1",
          },
          {
            title: "search",
            dataIndex: "search2",
          },
          {
            title: "search",
            dataIndex: "search3",
          },
          {
            title: "search",
            dataIndex: "search4",
          },
          {
            title: "search",
            dataIndex: "search5",
          },
          {
            title: "search",
            dataIndex: "search6",
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
