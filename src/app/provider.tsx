"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import getenv from "getenv";
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL_FIBO || "http:/localhost:3005";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
