"use client";

import { logoutAction } from "@/lib/actions";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutAction(); // Panggil Server Action
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      style={{
        float: "right",
        padding: "10px 15px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: isPending ? "not-allowed" : "pointer",
      }}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
