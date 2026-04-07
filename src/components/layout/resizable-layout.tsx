"use client";

import { useCallback, useState, useEffect } from "react";
import {
  Group,
  Panel,
  Separator,
  useGroupRef,
  usePanelRef,
} from "react-resizable-panels";
import { SceneContainer } from "./scene-container";
import { LayoutToggle, type LayoutMode } from "./layout-toggle";

const CONTENT_PANEL_ID = "content";
const SCENE_PANEL_ID = "scene";

type Breakpoint = "sm" | "md" | "lg";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("lg");

  useEffect(() => {
    const lgQuery = window.matchMedia("(min-width: 1024px)");
    const mdQuery = window.matchMedia("(min-width: 768px)");

    function update() {
      if (lgQuery.matches) setBp("lg");
      else if (mdQuery.matches) setBp("md");
      else setBp("sm");
    }

    update();
    lgQuery.addEventListener("change", update);
    mdQuery.addEventListener("change", update);
    return () => {
      lgQuery.removeEventListener("change", update);
      mdQuery.removeEventListener("change", update);
    };
  }, []);

  return bp;
}

export function ResizableLayout({ children }: { children: React.ReactNode }) {
  const groupRef = useGroupRef();
  const scenePanelRef = usePanelRef();
  const [sceneCollapsed, setSceneCollapsed] = useState(false);
  const breakpoint = useBreakpoint();

  const handleModeChange = useCallback(
    (mode: LayoutMode) => {
      const group = groupRef.current;
      const scenePanel = scenePanelRef.current;
      if (!group || !scenePanel) return;

      switch (mode) {
        case "read":
          scenePanel.collapse();
          break;
        case "split":
          if (sceneCollapsed) scenePanel.expand();
          group.setLayout({ [CONTENT_PANEL_ID]: 55, [SCENE_PANEL_ID]: 45 });
          break;
        case "explore":
          if (sceneCollapsed) scenePanel.expand();
          group.setLayout({ [CONTENT_PANEL_ID]: 30, [SCENE_PANEL_ID]: 70 });
          break;
      }
    },
    [sceneCollapsed, groupRef, scenePanelRef]
  );

  // Desktop: resizable panels
  if (breakpoint === "lg") {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-end px-3 py-1.5 border-b border-border bg-card/30">
          <LayoutToggle
            collapsed={sceneCollapsed}
            onModeChange={handleModeChange}
          />
        </div>

        <div className="flex flex-1 min-h-0">
          <Group groupRef={groupRef} orientation="horizontal">
            <Panel id={CONTENT_PANEL_ID} defaultSize={55} minSize={30}>
              <div className="h-full overflow-y-auto">
                <div className="max-w-2xl px-6 py-8 lg:px-10 lg:py-10">
                  {children}
                </div>
              </div>
            </Panel>

            <Separator className="group relative w-2 cursor-col-resize bg-transparent hover:bg-primary/10 transition-colors data-[resize-handle-active]:bg-primary/20">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-border group-hover:bg-primary/40 group-data-[resize-handle-active]:bg-primary/60 transition-colors" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
                <div className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
                <div className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
                <div className="w-1 h-1 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
              </div>
            </Separator>

            <Panel
              id={SCENE_PANEL_ID}
              panelRef={scenePanelRef}
              defaultSize={45}
              minSize={25}
              collapsible
              collapsedSize={0}
              onResize={(size) => {
                if (size.asPercentage === 0 && !sceneCollapsed) {
                  setSceneCollapsed(true);
                } else if (size.asPercentage > 0 && sceneCollapsed) {
                  setSceneCollapsed(false);
                }
              }}
            >
              <SceneContainer />
            </Panel>
          </Group>
        </div>
      </div>
    );
  }

  // Tablet: stacked layout
  if (breakpoint === "md") {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="h-[35vh] shrink-0 border-b border-border">
          <SceneContainer />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl px-6 py-8">{children}</div>
        </div>
      </div>
    );
  }

  // Mobile: content only
  return (
    <div className="flex-1 overflow-y-auto min-w-0">
      <div className="max-w-2xl px-6 py-6">{children}</div>
    </div>
  );
}
