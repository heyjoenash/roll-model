"use client";

import { useState } from "react";
import { Play, Eye } from "lucide-react";
import { useScene, type SceneParams } from "@/lib/scene-context";
import { cn } from "@/lib/utils";

interface SceneCueProps {
  label: string;
  description?: string;
  params: SceneParams;
}

export function SceneCue({ label, description, params }: SceneCueProps) {
  const { setSceneParams } = useScene();
  const [active, setActive] = useState(false);

  function handleClick() {
    setSceneParams(params);
    setActive(true);
    // Reset active state after a moment so it can be clicked again
    setTimeout(() => setActive(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group w-full text-left my-4 rounded-lg border px-4 py-3 transition-all duration-300",
        active
          ? "border-primary/60 bg-primary/10 shadow-[0_0_15px_rgba(147,130,255,0.15)]"
          : "border-border/60 bg-card/50 hover:border-primary/40 hover:bg-card"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 p-1.5 rounded-md transition-colors",
            active
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          {active ? <Eye size={16} /> : <Play size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
