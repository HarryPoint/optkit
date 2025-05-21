import { useToolboxContext } from "../context/toolboxContext";

export const useRouter = () => {
  const { router } = useToolboxContext();
  return router;
};
