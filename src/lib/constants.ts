// Bowling ball dimensions (USBC spec)
export const BALL_DIAMETER_INCHES = 8.5;
export const BALL_RADIUS_METERS = 0.108; // ~4.25 inches in meters
export const BALL_WEIGHT_LBS_MIN = 6;
export const BALL_WEIGHT_LBS_MAX = 16;

// Lane dimensions
export const LANE_LENGTH_FEET = 60;
export const LANE_WIDTH_INCHES = 41.5;
export const LANE_BOARDS = 39;

// RPM ranges by bowling style
export const RPM_RANGES = {
  beginner: { min: 100, max: 250, label: "Beginner / Straight" },
  stroker: { min: 200, max: 300, label: "Stroker" },
  tweener: { min: 300, max: 400, label: "Tweener" },
  cranker: { min: 400, max: 550, label: "Cranker" },
  twoHanded: { min: 450, max: 650, label: "Two-Handed" },
} as const;

// Default scene parameters
export const DEFAULT_RPM = 400;
export const DEFAULT_AXIS_TILT = 15; // degrees
export const DEFAULT_AXIS_ROTATION = 45; // degrees
