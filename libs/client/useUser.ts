import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter"); // 뒤로가기를 못하게 하려면 replace 사용하는 것이 좋다. 히스토리에 안남음.
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
