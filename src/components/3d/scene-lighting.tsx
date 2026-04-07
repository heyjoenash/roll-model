"use client";

/**
 * Simple, stable lighting. No Environment component, no HDRI, no CDN.
 * Just lights that work every time.
 */
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 3]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#b0b0ff" />
      <pointLight position={[0, -0.3, 0.3]} intensity={0.4} color="#8888aa" />
    </>
  );
}
