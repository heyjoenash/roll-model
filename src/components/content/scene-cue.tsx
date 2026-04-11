"use client";

import { useState } from "react";
import { Play, Check } from "lucide-react";
import { useScene, type SceneParams } from "@/lib/scene-context";
import { cn } from "@/lib/utils";

interface SceneCueProps {
  label: string;
  description?: string;
  params: SceneParams;
}

export function SceneCue({ label, description, params }: SceneCueProps) {
  const { setSceneParams } = useScene();
  const [fired, setFired] = useState(false);

  function handleClick() {
    // Timestamp ensures every click creates a new object reference,
    // which triggers the useEffect in the scene even if values match
    setSceneParams({ ...params, _t: Date.now() });
    setFired(true);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group w-full text-left my-4 rounded-lg border px-4 py-3 transition-all duration-200 cursor-pointer",
        fired
          ? "border-primary/50 bg-primary/8"
          : "border-border/60 bg-card/50 hover:border-primary/40 hover:bg-card"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 p-1.5 rounded-md transition-colors",
            fired
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          {fired ? <Check size={16} /> : <Play size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </div>
          )}
          {fired && (
            <div className="text-xs text-primary mt-1 font-medium">
              Applied — check the 3D scene
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
