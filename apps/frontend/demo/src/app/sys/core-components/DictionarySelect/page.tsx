"use client";

import { DictionaryRadioGroup } from "@/common/components/DictionaryRadioGroup";
import { DictionarySelect } from "@/common/components/DictionarySelect";
import { PageWrapper } from "@/common/components/PageWrapper";

export default function Page() {
  return (
    <PageWrapper>
      <DictionarySelect category="category1" />
      <DictionaryRadioGroup category="category2" />
    </PageWrapper>
  );
}
