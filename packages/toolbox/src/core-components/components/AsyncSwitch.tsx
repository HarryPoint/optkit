import { GetProps, Switch } from "antd";
import { useState } from "react";

type SwitchProps = GetProps<typeof Switch>;
export const AsyncSwitch: React.FC<SwitchProps> = ({ onClick, ...reset }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (checked: boolean, e: any) => {
    // 阻止冒泡
    e.stopPropagation();
    setLoading(true);
    try {
      await onClick?.(checked, e);
    } finally {
      setLoading(false);
    }
  };
  return <Switch {...reset} onClick={handleClick} loading={loading} />;
};
