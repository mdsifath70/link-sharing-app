"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./AuthCheck";
import Providers from "./Providers";
import SetData from "./SetData";
import TopLoader from "./TopLoader";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Providers>
      <AuthCheck />
      <SetData />
      <TopLoader />
      <Toaster />

      {children}
    </Providers>
  );
}
