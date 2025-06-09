"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import { BaseTable } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <BaseTable
        cacheKey="demo"
        searchColumns={[
          {
            title: "search",
            dataIndex: "search",
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
