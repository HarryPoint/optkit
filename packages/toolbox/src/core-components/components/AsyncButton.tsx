import { Button, GetProps } from "antd";
import { MouseEventHandler, useState } from "react";

type BtnProps = GetProps<typeof Button>;
export const AsyncButton: React.FC<BtnProps> = ({
  children,
  onClick,
  ...reset
}) => {
  const [loading, setLoading] = useState(false);
  const handleClick: MouseEventHandler<HTMLElement> = async (e) => {
    setLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button {...reset} onClick={handleClick} loading={loading}>
      {children}
    </Button>
  );
};
