import { MeQuery } from "@/generated/graphql";
import { ME_QUERY } from "@/graphql/queries/me";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useQuery<MeQuery>(ME_QUERY);

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};
