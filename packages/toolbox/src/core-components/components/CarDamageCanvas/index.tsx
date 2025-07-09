import {
  Canvas,
  CanvasEvent,
  Circle,
  CircleStyleProps,
  Group,
  Path,
} from "@antv/g";
import { Renderer } from "@antv/g-canvas";
import { useEffect, useMemo, useRef, useState } from "react";

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
  position: { x: number; y: number };
  style?: Partial<Omit<CircleStyleProps, "id">>;
  metaData: T;
};

type CarDamageCanvasProps<T> = {
  pins: PinItem<T>[];
  onAdd: (position: { x: number; y: number }) => void;
  onClickPin: (data: PinItem<T>) => void;
};

const createPin = (data: PinItem) => {
  const style = data?.style ?? {};
  const { x, y } = data?.position;
  const pin = new Circle({
    id: `pin-${x}-${y}`,
    style: {
      r: 1,
      fill: "black",
      cursor: "pointer",
    },
  });
  const icon = new Path({
    style: {
      d: "M11.8284 1.92871C12.2188 1.53825 12.8519 1.53838 13.2424 1.92871L16.0715 4.75684C16.259 4.9443 16.3644 5.19876 16.3645 5.46387C16.3645 5.72894 16.2589 5.98339 16.0715 6.1709L13.2424 9L16.0706 11.8281C16.2581 12.0156 16.3635 12.27 16.3635 12.5352C16.3635 12.8004 16.2581 13.0547 16.0706 13.2422L13.2424 16.0703C12.8519 16.4608 12.2189 16.4608 11.8284 16.0703L9.00024 13.2422L6.17212 16.0703C5.78159 16.4608 5.14858 16.4608 4.75806 16.0703L1.92896 13.2422C1.74154 13.0547 1.63599 12.8003 1.63599 12.5352C1.63601 12.27 1.74151 12.0156 1.92896 11.8281L4.75708 8.99902L1.92896 6.1709C1.53858 5.78036 1.53848 5.14731 1.92896 4.75684L4.75708 1.92871C4.94455 1.74125 5.199 1.63582 5.46411 1.63574C5.72926 1.63574 5.98362 1.74127 6.17114 1.92871L8.99927 4.75684L11.8284 1.92871Z",
      fill: "black",
      stroke: "blue",
      transformOrigin: "center center",
      opacity: 0.3,
      ...style,
    },
  });
  icon.translateLocal(-9, -9);
  icon.addEventListener("mouseenter", () => {
    icon.style.fill = "red";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.fill = "black";
  });
  pin.appendChild(icon);
  pin.setPosition(x, y);
  // @ts-ignore
  pin.setAttribute("data-origin", data);
  pin.addEventListener("mouseenter", () => {
    pin.style.fill = "red";
  });
  pin.addEventListener("mouseleave", () => {
    pin.style.fill = "black";
  });
  return pin;
};

export function CarDamageCanvas<T = any>(props: CarDamageCanvasProps<T>) {
  const { pins = [], onAdd, onClickPin } = props;
  const domRef = useRef();
  const canvasIns = useRef<InstanceType<typeof Canvas>>();
  const pinGroupIns = useRef<InstanceType<typeof Group>>();
  const [ready, setReady] = useState(false);
  const defaultPins = useMemo<PinItem[]>(() => {
    return metaData?.map((item) => {
      const [x, y] = item.coordinates;
      return {
        position: { x: x + 8, y: y + 8 },
        metaData: {
          type: item.type,
        },
      };
    });
  }, [metaData]);

  const combinePins = useMemo(() => {
    return [...defaultPins, ...pins];
  }, [defaultPins, pins]);

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
      const originData = ev.target.parentNode.getAttribute("data-origin");
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
