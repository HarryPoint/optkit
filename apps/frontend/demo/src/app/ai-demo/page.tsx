"use client";

import { useState } from "react";
import { App } from "antd";
import { CarDamageCanvas } from "optkit-toolbox";

export default function Page() {
  const { modal } = App.useApp();

  const [pins, setPins] = useState([
    {
      position: { x: 100, y: 200 },
      metaData: {},
    },
  ]);

  return (
    <CarDamageCanvas
      pins={pins}
      onAdd={(ev: any) => {
        setPins((prev) => {
          return [
            ...prev,
            {
              position: {
                x: ev.x,
                y: ev.y,
              },
              metaData: {},
            },
          ];
        });
      }}
      onClickPin={(data: any) => {
        modal.info({
          title: data?.metaData?.type ?? "sdfdsf",
          content: (
            <div>
              <div>x: {data?.position?.x}</div>
              <div>y: {data?.position?.y}</div>
            </div>
          ),
        });
      }}
    />
  );
}
