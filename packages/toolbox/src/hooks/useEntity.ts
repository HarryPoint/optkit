import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { ENTITY } from "../constant/auth";
import { useDictionary } from "./useDictionary";

export const useEntity = () => {
  const { loading, categoryGroup } = useDictionary();
  const [entity, setEntity] = useLocalStorageState<string | undefined>(ENTITY, {
    defaultValue: "1",
  });

  useEffect(() => {
    if (!entity) {
      setEntity(categoryGroup?.entity_type?.[0]?.value ?? "");
    }
  }, [entity]);

  return {
    entity,
    setEntity,
    loading,
    entityType: categoryGroup?.entity_type ?? [],
  };
};
