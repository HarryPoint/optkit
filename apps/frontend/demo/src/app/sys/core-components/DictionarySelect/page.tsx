"use client";

import {
  DictionaryCheckboxGroup,
  DictionaryRadioGroup,
  DictionarySelect,
  PageWrapper,
} from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <DictionarySelect category="demo" />
      <DictionaryRadioGroup category="demo" />
      <DictionaryCheckboxGroup category="demo" />
    </PageWrapper>
  );
}
