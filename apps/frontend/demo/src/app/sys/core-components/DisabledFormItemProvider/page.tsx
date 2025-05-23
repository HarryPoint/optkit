"use client";

import {
  CusProForm,
  DisabledFormItemProvider,
  PageWrapper,
  SchemaSectionForm,
} from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm>
        <DisabledFormItemProvider disabled={true}>
          <SchemaSectionForm
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
