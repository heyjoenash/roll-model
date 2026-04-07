"use client";

import { useState } from "react";
import { BookOpen, Columns2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type LayoutMode = "read" | "split" | "explore";

interface LayoutToggleProps {
  collapsed: boolean;
  onModeChange: (mode: LayoutMode) => void;
}

const modes: { mode: LayoutMode; icon: typeof BookOpen; label: string }[] = [
  { mode: "read", icon: BookOpen, label: "Read" },
  { mode: "split", icon: Columns2, label: "Split" },
  { mode: "explore", icon: Maximize2, label: "3D" },
];

export function LayoutToggle({ collapsed, onModeChange }: LayoutToggleProps) {
  const [active, setActive] = useState<LayoutMode>("split");

  // Sync external collapse state
  const effectiveMode = collapsed && active !== "read" ? "read" : active;

  function handleClick(mode: LayoutMode) {
    setActive(mode);
    onModeChange(mode);
  }

  return (
    <div className="hidden lg:flex items-center gap-0.5 rounded-md bg-muted/50 p-0.5">
      {modes.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => handleClick(mode)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors",
            effectiveMode === mode
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
}
