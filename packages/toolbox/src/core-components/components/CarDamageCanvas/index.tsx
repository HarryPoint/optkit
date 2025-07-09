import { Canvas, CanvasEvent, Circle, CircleStyleProps, Group } from "@antv/g";
import { Renderer } from "@antv/g-canvas";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const metaData = [
  { type: "front_left_bumper", coordinates: [98, 24] },
  { type: "front_left_side_bumper", coordinates: [37, 61] },
  { type: "front_right_bumper", coordinates: [186, 24] },
  { type: "front_right_side_bumper", coordinates: [247, 61] },
  { type: "front_middle_bumper", coordinates: [142, 24] },
  { type: "back_left_bumper", coordinates: [100, 358] },
  { type: "back_left_side_bumper", coordinates: [41, 305] },
  { type: "back_right_bumper", coordinates: [184, 358] },
  { type: "back_right_side_bumper", coordinates: [243, 305] },
  { type: "back_middle_bumper", coordinates: [142, 358] },
  { type: "front_left_light", coordinates: [100, 42] },
  { type: "front_right_light", coordinates: [184, 42] },
  { type: "back_left_light", coordinates: [100, 331] },
  { type: "back_right_light", coordinates: [184, 331] },
  { type: "front_left_quarter_panel", coordinates: [60, 109] },
  { type: "front_right_quarter_panel", coordinates: [224, 109] },
  { type: "back_left_quarter_panel", coordinates: [64, 280] },
  { type: "back_right_quarter_panel", coordinates: [220, 280] },
  { type: "front_left_door_middle", coordinates: [51, 161] },
  { type: "front_left_door_bottom", coordinates: [27, 161] },
  { type: "front_right_door_middle", coordinates: [233, 161] },
  { type: "front_right_door_bottom", coordinates: [257, 161] },
  { type: "back_left_door_middle", coordinates: [51, 217] },
  { type: "back_left_door_bottom", coordinates: [27, 217] },
  { type: "back_right_door_middle", coordinates: [233, 217] },
  { type: "back_right_door_bottom", coordinates: [257, 217] },
  { type: "front_left_wheel", coordinates: [32, 96] },
  { type: "front_right_wheel", coordinates: [252, 96] },
  { type: "back_left_wheel", coordinates: [32, 265] },
  { type: "back_right_wheel", coordinates: [252, 265] },
  { type: "front_windshield", coordinates: [142, 133] },
  { type: "back_windshield", coordinates: [142, 109] },
  { type: "front_left_window", coordinates: [85, 177] },
  { type: "front_right_window", coordinates: [199, 177] },
  { type: "back_left_window", coordinates: [85, 225] },
  { type: "back_right_window", coordinates: [199, 225] },
  { type: "quarter_left_window", coordinates: [85, 261] },
  { type: "quarter_right_window", coordinates: [199, 261] },
  { type: "front_hood_middle", coordinates: [142, 77] },
  { type: "front_hood_left", coordinates: [109, 77] },
  { type: "front_hood_right", coordinates: [174, 77] },
  { type: "back_trunk_middle", coordinates: [142, 310] },
  { type: "back_trunk_left", coordinates: [104, 304] },
  { type: "back_trunk_right", coordinates: [180, 304] },
  { type: "left_mirror", coordinates: [74, 140] },
  { type: "right_mirror", coordinates: [210, 140] },
];

type PinItem<T = any> = {
  style: Partial<Omit<CircleStyleProps, "id">>;
  metaData: T;
};

type CarDamageCanvasProps<T> = {
  pins: PinItem<T>[];
  onAdd: (position: { x: number; y: number }) => void;
  onClickPin: (data: PinItem<T>) => void;
};

export function CarDamageCanvas<T = any>(props: CarDamageCanvasProps<T>) {
  const { pins = [], onAdd, onClickPin } = props;
  const domRef = useRef();
  const canvasIns = useRef<InstanceType<typeof Canvas>>();
  const pinGroupIns = useRef<InstanceType<typeof Group>>();
  const [ready, setReady] = useState(false);
  const defaultPins = useMemo<PinItem[]>(() => {
    return metaData?.map((item) => {
      const [cx, cy] = item.coordinates;
      return {
        style: {
          cx: cx + 8,
          cy: cy + 8,
        },
        metaData: {
          type: item.type,
        },
      };
    });
  }, [metaData]);

  const combinePins = useMemo(() => {
    return [...defaultPins, ...pins];
  }, [defaultPins, pins]);

  const createPin = useCallback((data: PinItem) => {
    const style = data?.style ?? {};
    const { cx, cy } = style;
    const pin = new Circle({
      id: `pin-${cx}-${cy}`,
      style: {
        r: 5,
        fill: "black",
        cursor: "pointer",
        ...style,
      },
    });
    // @ts-ignore
    pin.setAttribute("data-origin", data);
    pin.addEventListener("mouseenter", () => {
      pin.style.fill = "red";
    });
    pin.addEventListener("mouseleave", () => {
      pin.style.fill = "black";
    });
    return pin;
  }, []);

  useEffect(() => {
    if (ready) {
      combinePins.forEach((item) => {
        const pinIns = createPin(item);
        pinGroupIns.current.appendChild(pinIns);
      });
    }
    return () => {
      pinGroupIns.current?.removeChildren?.();
    };
  }, [combinePins, ready]);

  useEffect(() => {
    function onClickPinInner(ev: any) {
      ev.stopPropagation();
      const originData = ev.target.getAttribute("data-origin");
      onClickPin?.(originData);
    }
    if (ready) {
      pinGroupIns.current.addEventListener("click", onClickPinInner);
    }
    return () => {
      pinGroupIns.current?.removeEventListener?.("click", onClickPinInner);
    };
  }, [ready, onClickPin]);

  useEffect(() => {
    const onAddInner = (ev: any) => {
      onAdd?.(ev.canvas);
    };
    if (ready) {
      canvasIns.current.addEventListener("click", onAddInner);
    }
    return () => {
      canvasIns.current?.removeEventListener?.("click", onAddInner);
    };
  }, [ready, onAdd]);

  useEffect(() => {
    const canvas = new Canvas({
      container: domRef?.current,
      width: 300,
      height: 400,
      renderer: new Renderer(),
    });
    pinGroupIns.current = new Group();
    canvasIns.current = canvas;
    canvas.addEventListener(CanvasEvent.READY, () => {
      canvas.appendChild(pinGroupIns.current);
      setReady(true);
    });
    return () => {
      canvas.destroy();
    };
  }, []);

  return <div ref={domRef} className="inline-block border"></div>;
}
