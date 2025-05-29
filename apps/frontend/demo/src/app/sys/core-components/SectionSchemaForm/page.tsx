"use client";

import { CusProForm, PageWrapper, SectionSchemaForm } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm>
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
    </PageWrapper>
  );
}
