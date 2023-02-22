import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const PUBLIC = ["/enter"];

export default function useUser(pathname?: string) {
  const { data, error } = useSWR("/api/users/me");

  const isPublic = !pathname ? false : Boolean(PUBLIC.includes(pathname));
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && !isPublic) {
      router.replace("/enter");
    }
  }, [data, router, isPublic]);
  return { user: data?.profile, isLoading: !data && !error };
}
