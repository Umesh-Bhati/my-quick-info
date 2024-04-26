"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-xl text-black text-left"
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
}
