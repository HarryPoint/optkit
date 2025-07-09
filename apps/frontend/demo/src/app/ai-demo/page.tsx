"use client";

import { useState } from "react";
import { App } from "antd";
import { CarDamageCanvas } from "optkit-toolbox";

export default function Page() {
  const { modal } = App.useApp();

  const [pins, setPins] = useState([
    {
      style: {
        cx: 100,
        cy: 200,
      },
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
              style: {
                cx: ev.x,
                cy: ev.y,
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
              <div>x: {data?.style?.cx}</div>
              <div>y: {data?.style?.cy}</div>
            </div>
          ),
        });
      }}
    />
  );
}
