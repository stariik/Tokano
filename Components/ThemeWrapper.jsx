"use client";

import { ThemeProvider } from "@/hooks/useTheme";

export default function ThemeWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
