"use client";

import { Environment } from "@react-three/drei";

/**
 * Studio-style lighting for bowling ball scenes.
 * Uses a locally-hosted HDRI (no CDN dependency) plus directional fill lights.
 * The HDRI gives the clearcoat material realistic reflections.
 */
export function SceneLighting() {
  return (
    <>
      {/* Local HDRI for realistic reflections on clearcoat */}
      <Environment files="/hdri/studio.hdr" />
      {/* Fill light to lift shadows */}
      <directionalLight position={[-3, 2, -1]} intensity={0.4} color="#e8e8ff" />
      {/* Subtle ambient */}
      <ambientLight intensity={0.15} />
    </>
  );
}
