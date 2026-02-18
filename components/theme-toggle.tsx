"use client";

import { Button } from "@/components/ui/button";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {isDark ? <SunMedium size={16} /> : <MoonStar size={16} />}
      <span>{isDark ? "Day" : "Night"}</span>
    </Button>
  );
}

export default ThemeToggle;
