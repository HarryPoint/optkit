"use client";

import { useDevice } from "optkit-toolbox";

export default function Page() {
  const { isMobile } = useDevice();
  return (
    <div>
      <div>{isMobile ? "true" : "false"}</div>
    </div>
  );
}
