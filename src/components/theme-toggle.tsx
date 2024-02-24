"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="rounded-md border p-2">
      {theme === "light" ? (
        <SunIcon
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 cursor-pointer transition-all"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <MoonIcon
          className="h-[1.2rem] w-[1.2rem] rotate-90 cursor-pointer transition-all"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}
