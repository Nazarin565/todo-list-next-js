"use client";

import { useRouter } from "next/navigation";

export const LogOutButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("displayName");
        localStorage.removeItem("userUID");
        router.replace("/login");
      }}
      className="bg-red-200 w-1/2 self-center p-1 text-sm"
    >
      Log out
    </button>
  );
};
