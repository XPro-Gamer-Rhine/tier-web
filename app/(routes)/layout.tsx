"use client";
import type { Metadata } from "next";
import Providers from "@/modules/providers";
import { useAuth } from "@/lib/contexts/AuthContext";
import LoaderProvider from "@/lib/contexts/LoaderContext";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <LoaderProvider>{children}</LoaderProvider>
    </Providers>
  );
};

export default RootLayout;
