"use client";

import { useMeQuery } from "@/redux/features/user/userApiSlice";
import { AppState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function AuthCheck() {
  const { user } = useSelector((state: AppState) => state.auth);
  useMeQuery(undefined, { skip: !user?.token });
  return null;
}
