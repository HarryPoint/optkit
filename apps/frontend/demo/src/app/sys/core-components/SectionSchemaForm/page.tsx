"use client";

import { BetaSchemaForm, ProForm } from "@ant-design/pro-components";
import { CusProForm, PageWrapper, SectionSchemaForm } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm colProps={{ span: 8 }} rowProps={{ gutter: [80, 0] }}>
        <SectionSchemaForm
          columns={[
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
          ]}
        />
      </CusProForm>
      <ProForm grid colProps={{ span: 8 }} rowProps={{ gutter: [100, 0] }}>
        <BetaSchemaForm
          layoutType="Embed"
          columns={[
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
          ]}
        />
      </ProForm>
    </PageWrapper>
  );
}
