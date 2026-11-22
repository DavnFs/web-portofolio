export interface HeroCloud {
  id: number
  /** Normalized rest anchor in [0, 1] */
  baseX: number
  baseY: number
  /** Randomized harmonic angular frequencies (rad/s) */
  freqX1: number
  freqX2: number
  freqY1: number
  freqY2: number
  /** Randomized initial phases (rad) */
  phaseX: number
  phaseY: number
  /** Normalized drift amplitude */
  ampX: number
  ampY: number
  /** Radius relative to max(width, height) */
  radiusRatio: number
  /** How strongly this cloud responds to the cursor (0..1) */
  cursorAffinity: number
  /** Monochrome cool-silver inner & mid color stops */
  innerRgba: string
  midRgba: string
}

export interface CursorFieldState {
  /** Raw pointer target in normalized [0, 1] coordinates */
  targetX: number
  targetY: number
  /** Spring-smoothed render coordinates in [0, 1] */
  x: number
  y: number
  /** Presence fade in [0, 1] */
  strength: number
  /** Smoothed movement speed for subtle radius bloom */
  speed: number
  active: boolean
}

export interface ResolvedCloudPoint {
  x: number
  y: number
  radiusScale: number
}

const MONOCHROME_SILVER_PALETTE: ReadonlyArray<{
  baseX: number
  baseY: number
  radiusRatio: number
  cursorAffinity: number
  innerRgba: string
  midRgba: string
}> = [
  {
    baseX: 0.22,
    baseY: 0.28,
    radiusRatio: 0.44,
    cursorAffinity: 0.22,
    innerRgba: "rgba(148, 163, 184, 0.24)",
    midRgba: "rgba(203, 213, 225, 0.12)",
  },
  {
    baseX: 0.78,
    baseY: 0.24,
    radiusRatio: 0.48,
    cursorAffinity: 0.18,
    innerRgba: "rgba(180, 192, 208, 0.26)",
    midRgba: "rgba(226, 232, 240, 0.14)",
  },
  {
    baseX: 0.52,
    baseY: 0.62,
    radiusRatio: 0.52,
    cursorAffinity: 0.26,
    innerRgba: "rgba(203, 213, 225, 0.30)",
    midRgba: "rgba(241, 245, 249, 0.16)",
  },
  {
    baseX: 0.18,
    baseY: 0.78,
    radiusRatio: 0.4,
    cursorAffinity: 0.16,
    innerRgba: "rgba(148, 163, 184, 0.20)",
    midRgba: "rgba(226, 232, 240, 0.10)",
  },
  {
    baseX: 0.84,
    baseY: 0.74,
    radiusRatio: 0.42,
    cursorAffinity: 0.2,
    innerRgba: "rgba(165, 179, 198, 0.22)",
    midRgba: "rgba(226, 232, 240, 0.11)",
  },
]

export const INITIAL_CURSOR_FIELD: CursorFieldState = {
  targetX: 0.5,
  targetY: 0.5,
  x: 0.5,
  y: 0.5,
  strength: 0,
  speed: 0,
  active: false,
}

/**
 * Generates randomized monochrome cool-silver atmospheric clouds.
 * Accepts an optional RNG for deterministic unit tests.
 */
export function createHeroClouds(
  randomFn: () => number = Math.random
): HeroCloud[] {
  const rand = (min: number, max: number) => min + randomFn() * (max - min)

  return MONOCHROME_SILVER_PALETTE.map((preset, idx) => ({
    id: idx,
    baseX: Math.min(0.92, Math.max(0.08, preset.baseX + rand(-0.07, 0.07))),
    baseY: Math.min(0.92, Math.max(0.08, preset.baseY + rand(-0.07, 0.07))),
    freqX1: rand(0.11, 0.24),
    freqX2: rand(0.05, 0.13),
    freqY1: rand(0.1, 0.22),
    freqY2: rand(0.06, 0.14),
    phaseX: rand(0, Math.PI * 2),
    phaseY: rand(0, Math.PI * 2),
    ampX: rand(0.09, 0.16),
    ampY: rand(0.08, 0.15),
    radiusRatio: preset.radiusRatio * rand(0.92, 1.08),
    cursorAffinity: preset.cursorAffinity,
    innerRgba: preset.innerRgba,
    midRgba: preset.midRgba,
  }))
}

/**
 * Advances the cursor follower using frame-rate-independent exponential damping.
 */
export function stepCursorSpring(
  state: CursorFieldState,
  dtSeconds: number
): CursorFieldState {
  const dt = Math.min(Math.max(dtSeconds, 0), 0.1)
  const posAlpha = 1 - Math.exp(-6.5 * dt)
  const strengthAlpha = 1 - Math.exp(-(state.active ? 5.5 : 2.6) * dt)

  const nextX = state.x + (state.targetX - state.x) * posAlpha
  const nextY = state.y + (state.targetY - state.y) * posAlpha

  const dx = nextX - state.x
  const dy = nextY - state.y
  const instantSpeed = dt > 0 ? Math.min(1.5, Math.hypot(dx, dy) / dt) : 0
  const speedAlpha = 1 - Math.exp(-8 * dt)
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
 * Computes a cloud's normalized position by blending dual-harmonic organic drift
 * with smooth gravitational cursor attraction when the pointer is present.
 */
export function computeCloudPosition(
  cloud: HeroCloud,
  timeSeconds: number,
  cursor: CursorFieldState
): ResolvedCloudPoint {
  // Multi-harmonic non-repeating organic drift
  const driftX =
    Math.sin(timeSeconds * cloud.freqX1 + cloud.phaseX) * cloud.ampX * 0.68 +
    Math.cos(timeSeconds * cloud.freqX2 - cloud.phaseY * 0.7) * cloud.ampX * 0.32
  const driftY =
    Math.cos(timeSeconds * cloud.freqY1 + cloud.phaseY) * cloud.ampY * 0.68 +
    Math.sin(timeSeconds * cloud.freqY2 + cloud.phaseX * 0.5) * cloud.ampY * 0.32

  let x = cloud.baseX + driftX
  let y = cloud.baseY + driftY
  let radiusScale = 1 + Math.sin(timeSeconds * cloud.freqX2 + cloud.phaseX) * 0.06

  // Smooth magnetic pull toward active cursor
  if (cursor.strength > 0.001) {
    const dx = cursor.x - x
    const dy = cursor.y - y
    const dist = Math.hypot(dx, dy)
    // Gentle distance falloff so nearby clouds respond more noticeably
    const proximity = Math.exp(-dist * 1.45)
    const pull = cursor.strength * cloud.cursorAffinity * (0.45 + 0.55 * proximity)

    x += dx * pull
    y += dy * pull
    radiusScale += proximity * cursor.strength * 0.08
  }

  return { x, y, radiusScale }
}
