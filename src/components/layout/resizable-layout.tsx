"use client";

import { useCallback, useState } from "react";
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

export function ResizableLayout({ children }: { children: React.ReactNode }) {
  const groupRef = useGroupRef();
  const scenePanelRef = usePanelRef();
  const [sceneCollapsed, setSceneCollapsed] = useState(false);

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

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Toggle bar */}
      <div className="flex items-center justify-end px-3 py-1.5 border-b border-border bg-card/30">
        <LayoutToggle
          collapsed={sceneCollapsed}
          onModeChange={handleModeChange}
        />
      </div>

      {/* Desktop: resizable panels */}
      <div className="hidden lg:flex flex-1 min-h-0">
        <Group
          groupRef={groupRef}
          orientation="horizontal"
        >
          {/* Content panel */}
          <Panel id={CONTENT_PANEL_ID} defaultSize={55} minSize={30}>
            <div className="h-full overflow-y-auto">
              <div className="max-w-2xl px-6 py-8 lg:px-10 lg:py-10">
                {children}
              </div>
            </div>
          </Panel>

          {/* Drag handle */}
          <Separator className="group relative w-1.5 bg-transparent hover:bg-primary/10 transition-colors data-[resize-handle-active]:bg-primary/20">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-border group-hover:bg-primary/40 group-data-[resize-handle-active]:bg-primary/60 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-border group-hover:bg-primary/40 transition-colors" />
          </Separator>

          {/* 3D Scene panel */}
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

      {/* Tablet: stacked layout (no resize) */}
      <div className="hidden md:flex lg:hidden flex-col flex-1 min-h-0">
        <div className="h-[35vh] shrink-0 border-b border-border">
          <SceneContainer />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl px-6 py-8">{children}</div>
        </div>
      </div>

      {/* Mobile: content only */}
      <div className="flex md:hidden flex-1 overflow-y-auto">
        <div className="max-w-2xl px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
