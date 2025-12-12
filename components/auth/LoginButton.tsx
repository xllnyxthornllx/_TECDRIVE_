"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline">
          {session.user?.email}
        </span>
        <Button onClick={() => signOut()} variant="outline" size="sm">
          Cerrar sesión
        </Button>
      </div>
    );
  }
  return (
    <Button onClick={() => signIn("google")} size="sm">
      Iniciar sesión
    </Button>
  );
}
