import { useStoreDispatch } from "@/common/hooks/useStoreDispatch";
import { useStoreSelector } from "@/common/hooks/useStoreSelector";
import { ProfileState, update as updateProfile } from "@/store/slice/profile";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { apiFetch } from "../utils/axios";
import { getEnv } from "../utils/env";
const fakeGetMe = async (): Promise<{
  data: ProfileState["data"];
}> => {
  const response = await apiFetch({
    url: `${getEnv()?.NEXT_PUBLIC_AUTH_SERVER}/api/user/me`,
  });

  if (response) {
    return response as any;
  }
  return {
    data: {
      user_id: "",
      user_name: "",
      phone_number: "",
      email: "",
      bu: "",
      job_title: "",
      department: "",
      role_names: [],
    },
  };
};

export const useProfile = () => {
  const profile = useStoreSelector((store) => store.profile);
  const dispatch = useStoreDispatch();
  const { data, loading, refresh } = useRequest(fakeGetMe, {
    cacheKey: "updateProfile",
  });

  useEffect(() => {
    dispatch(updateProfile({ data: data?.data, loading }));
  }, [data?.data, loading, dispatch]);
  return {
    profile,
    refresh,
  };
};
