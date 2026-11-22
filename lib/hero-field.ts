export interface CursorFieldState {
  /** Raw pointer target in normalized [0, 1] coordinates */
  targetX: number
  targetY: number
  /** Spring-smoothed render coordinates in [0, 1] */
  x: number
  y: number
  /** Presence fade in [0, 1] */
  strength: number
  /** Smoothed movement speed for subtle swirl bloom */
  speed: number
  active: boolean
}

export interface MeshSessionSeed {
  /** Randomized starting shader frame (ms) for primary MeshGradient */
  primaryFrame: number
  /** Randomized starting shader frame (ms) for secondary MeshGradient */
  secondaryFrame: number
  /** Randomized base rotation in degrees */
  baseRotation: number
  /** Randomized organic sway frequencies (rad/s) */
  freqA: number
  freqB: number
  /** Randomized organic sway phases (rad) */
  phaseA: number
  phaseB: number
}

export interface MeshLayerUniforms {
  u_offsetX: number
  u_offsetY: number
  u_rotation: number
  u_swirl: number
  u_distortion: number
}

export interface DualMeshUniforms {
  primary: MeshLayerUniforms
  secondary: MeshLayerUniforms
}

export const INITIAL_CURSOR_FIELD: CursorFieldState = {
  targetX: 0.5,
  targetY: 0.5,
  x: 0.5,
  y: 0.5,
  strength: 0,
  speed: 0,
  active: false,
}

export const DEFAULT_MESH_SEED: MeshSessionSeed = {
  primaryFrame: 12000,
  secondaryFrame: 34000,
  baseRotation: 18,
  freqA: 0.14,
  freqB: 0.09,
  phaseA: 0.8,
  phaseB: 2.1,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Generates randomized per-session starting frames and organic drift phases
 * so the WebGL MeshGradient opens in a distinct composition on every visit.
 */
export function createMeshSessionSeed(
  randomFn: () => number = Math.random
): MeshSessionSeed {
  const rand = (min: number, max: number) => min + randomFn() * (max - min)
  return {
    primaryFrame: Math.round(rand(4000, 90000)),
    secondaryFrame: Math.round(rand(8000, 110000)),
    baseRotation: rand(0, 360),
    freqA: rand(0.09, 0.18),
    freqB: rand(0.06, 0.13),
    phaseA: rand(0, Math.PI * 2),
    phaseB: rand(0, Math.PI * 2),
  }
}

/**
 * Advances the cursor follower using frame-rate-independent exponential damping.
 */
export function stepCursorSpring(
  state: CursorFieldState,
  dtSeconds: number
): CursorFieldState {
  const dt = Math.min(Math.max(dtSeconds, 0), 0.1)
  const posAlpha = 1 - Math.exp(-5.8 * dt)
  const strengthAlpha = 1 - Math.exp(-(state.active ? 5.0 : 2.2) * dt)

  const nextX = state.x + (state.targetX - state.x) * posAlpha
  const nextY = state.y + (state.targetY - state.y) * posAlpha

  const dx = nextX - state.x
  const dy = nextY - state.y
  const instantSpeed = dt > 0 ? Math.min(1.5, Math.hypot(dx, dy) / dt) : 0
  const speedAlpha = 1 - Math.exp(-7.5 * dt)
  const nextSpeed = state.speed + (instantSpeed - state.speed) * speedAlpha

  const targetStrength = state.active ? 1 : 0
  const nextStrength =
    state.strength + (targetStrength - state.strength) * strengthAlpha

  return {
    ...state,
    x: nextX,
    y: nextY,
    speed: nextSpeed,
    strength: nextStrength < 0.001 && !state.active ? 0 : nextStrength,
  }
}

/**
 * Maps randomized organic harmonic drift + smooth spring-damped cursor tracking
 * into bounded WebGL MeshGradient uniforms for dual-layer parallax flow.
 */
export function computeMeshUniforms(
  seed: MeshSessionSeed,
  timeSeconds: number,
  cursor: CursorFieldState
): DualMeshUniforms {
  // Subtle randomized multi-harmonic drift so the gradient breathes organically
  const driftX =
    Math.sin(timeSeconds * seed.freqA + seed.phaseA) * 0.09 +
    Math.cos(timeSeconds * seed.freqB - seed.phaseB) * 0.05
  const driftY =
    Math.cos(timeSeconds * seed.freqA * 0.85 + seed.phaseB) * 0.08 +
    Math.sin(timeSeconds * seed.freqB * 1.15 + seed.phaseA) * 0.04

  // Centered cursor vector in [-0.5, 0.5], scaled by presence strength
  const cx = (cursor.x - 0.5) * cursor.strength
  const cy = (cursor.y - 0.5) * cursor.strength
  const velocityBoost = Math.min(0.22, cursor.speed * 0.16) * cursor.strength

  const primaryOffsetX = clamp(driftX + cx * 0.42, -0.42, 0.42)
  const primaryOffsetY = clamp(driftY - cy * 0.36, -0.42, 0.42)
  const primaryRotation =
    (seed.baseRotation +
      Math.sin(timeSeconds * seed.freqB + seed.phaseA) * 14 +
      cx * 26 -
      cy * 16 +
      360) %
    360
  const primarySwirl = clamp(
    0.32 +
      Math.sin(timeSeconds * seed.freqA + seed.phaseB) * 0.06 +
      cursor.strength * 0.14 +
      velocityBoost,
    0.18,
    0.72
  )
  const primaryDistortion = clamp(
    0.84 + Math.cos(timeSeconds * seed.freqB + seed.phaseA) * 0.06 + velocityBoost * 0.4,
    0.72,
    1.0
  )

  // Secondary layer counter-drifts for atmospheric parallax depth
  const secondaryOffsetX = clamp(-driftX * 0.8 - cx * 0.28, -0.42, 0.42)
  const secondaryOffsetY = clamp(-driftY * 0.8 + cy * 0.24, -0.42, 0.42)
  const secondaryRotation =
    (seed.baseRotation +
      42 -
      Math.cos(timeSeconds * seed.freqA + seed.phaseB) * 16 -
      cx * 20 +
      360) %
    360
  const secondarySwirl = clamp(
    0.44 +
      Math.cos(timeSeconds * seed.freqB + seed.phaseA) * 0.08 +
      cursor.strength * 0.12 +
      velocityBoost * 0.8,
    0.22,
    0.78
  )
  const secondaryDistortion = clamp(
    0.9 - Math.sin(timeSeconds * seed.freqA + seed.phaseB) * 0.05 + velocityBoost * 0.3,
    0.74,
    1.0
  )

  return {
    primary: {
      u_offsetX: primaryOffsetX,
      u_offsetY: primaryOffsetY,
      u_rotation: primaryRotation,
      u_swirl: primarySwirl,
      u_distortion: primaryDistortion,
    },
    secondary: {
      u_offsetX: secondaryOffsetX,
      u_offsetY: secondaryOffsetY,
      u_rotation: secondaryRotation,
      u_swirl: secondarySwirl,
      u_distortion: secondaryDistortion,
    },
  }
}
