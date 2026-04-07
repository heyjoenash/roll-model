"use client";

/**
 * Studio-style lighting for bowling ball scenes.
 * Uses local lights instead of Environment preset (which downloads HDR from CDN and can fail).
 * Designed to make glossy/clearcoat materials look good against a dark background.
 */
export function SceneLighting() {
  return (
    <>
      {/* Key light — main illumination from upper right */}
      <directionalLight
        position={[4, 4, 3]}
        intensity={1.5}
        color="#ffffff"
      />
      {/* Fill light — softer, from the left to prevent pitch-black shadows */}
      <directionalLight
        position={[-3, 2, -1]}
        intensity={0.6}
        color="#e8e8ff"
      />
      {/* Rim/back light — edge highlight to separate ball from background */}
      <directionalLight
        position={[-1, 3, -4]}
        intensity={0.8}
        color="#ffffff"
      />
      {/* Soft ambient to lift the darkest shadows */}
      <ambientLight intensity={0.25} color="#a0a0b0" />
      {/* Bottom fill — subtle uplight to show the underside */}
      <pointLight position={[0, -0.3, 0.2]} intensity={0.3} color="#8888aa" />
    </>
  );
}
