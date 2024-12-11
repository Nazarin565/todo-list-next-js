"use client";

import { useRouter } from "next/navigation";

export const ButtonCustom = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("userUID");
        router.replace("/login");
      }}
    >
      Log out
    </button>
  );
};
