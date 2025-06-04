"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import {
  CusProForm,
  DisabledFormItemProvider,
  SchemaFormSection,
} from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm>
        <DisabledFormItemProvider disabled={true}>
          <SchemaFormSection
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
