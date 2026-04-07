"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type SceneParams = Record<string, number | boolean | string>;

interface SceneState {
  activeScene: string;
  setActiveScene: (scene: string) => void;
  sceneParams: SceneParams;
  setSceneParams: (params: SceneParams) => void;
}

const SceneContext = createContext<SceneState | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState("default");
  const [sceneParams, setSceneParamsRaw] = useState<SceneParams>({});

  const setSceneParams = useCallback((params: SceneParams) => {
    setSceneParamsRaw((prev) => ({ ...prev, ...params }));
  }, []);

  return (
    <SceneContext.Provider
      value={{ activeScene, setActiveScene, sceneParams, setSceneParams }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
}
