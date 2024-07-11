"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { ReactNode } from "react";
import ReduxProvider from "./ReduxProvider";
import { CookiesProvider } from "react-cookie";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider>
      <ReduxProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </CookiesProvider>
  );
};

export default Providers;
