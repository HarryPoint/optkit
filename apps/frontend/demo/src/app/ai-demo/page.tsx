"use client";

import { useRef, useState } from "react";
import { App, Button, GetProp, GetRef } from "antd";
import { CarDamageCanvas } from "optkit-toolbox";

type PinItems = GetProp<typeof CarDamageCanvas, "pins">;

export default function Page() {
  const { modal } = App.useApp();
  const damageCanvasIns = useRef<GetRef<typeof CarDamageCanvas> | null>(null);
  const [imageData, setImageData] = useState<string>();

  const [pins, setPins] = useState<PinItems>([]);

  return (
    <div>
      <div>
        <Button
          onClick={async () => {
            const imageData = await damageCanvasIns?.current?.toImage?.();
            console.log("imageData: ", imageData);
            if (imageData) {
              setImageData(imageData);
            }
          }}
        >
          获取图像
        </Button>
      </div>
      <div className="relative inline-block">
        <div
          className="absolute w-full h-full opacity-30"
          style={{
            background: `url("/assets/image.png") left top / 100% 100% no-repeat`,
          }}
        ></div>
        <CarDamageCanvas
          ref={damageCanvasIns}
          pins={pins}
          onAdd={(ev: any, type: string) => {
            setPins((prev) => {
              return [
                ...prev,
                {
                  position: {
                    x: ev.x,
                    y: ev.y,
                  },
                  metaData: {
                    type,
                  },
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
      </div>

      {imageData && <img src={imageData} alt="demo" />}
    </div>
  );
}
