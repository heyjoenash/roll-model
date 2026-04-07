"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SceneState {
  activeScene: string;
  setActiveScene: (scene: string) => void;
}

const SceneContext = createContext<SceneState | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState("default");

  return (
    <SceneContext.Provider value={{ activeScene, setActiveScene }}>
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
