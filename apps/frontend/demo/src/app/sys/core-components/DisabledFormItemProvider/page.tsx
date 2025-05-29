"use client";

import {
  CusProForm,
  DisabledFormItemProvider,
  PageWrapper,
  SectionSchemaForm,
} from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm>
        <DisabledFormItemProvider disabled={true}>
          <SectionSchemaForm
            columns={[
              {
                title: "sdf",
                valueType: "_CusDate",
              },
              {
                title: "sdf",
                valueType: "text",
              },
            ]}
          />
        </DisabledFormItemProvider>
      </CusProForm>
    </PageWrapper>
  );
}
