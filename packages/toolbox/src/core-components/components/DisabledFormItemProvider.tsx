import DisabledContext, {
  DisabledContextProps,
  DisabledContextProvider,
} from "antd/es/config-provider/DisabledContext";
import { useContext } from "react";

export type DisabledFormItemProviderProps = DisabledContextProps;

export const DisabledFormItemProvider: React.FC<
  DisabledFormItemProviderProps
> = (props) => {
  const { disabled, ...reset } = props;
  const contextDisabled = useContext(DisabledContext);
  return (
    <DisabledContextProvider
      {...reset}
      disabled={disabled ?? contextDisabled}
    />
  );
};
