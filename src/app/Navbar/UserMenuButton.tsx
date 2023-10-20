"use client";
import { Session } from "next-auth";

interface UserMenuButtonProps {
  session: Session | null;
}

export function UserMenuButton({ session }: UserMenuButtonProps) {
  return <div></div>;
}
