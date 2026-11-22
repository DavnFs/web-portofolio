import test from "node:test"
import assert from "node:assert/strict"
import {
  DEFAULT_MESH_SEED,
  INITIAL_CURSOR_FIELD,
  computeMeshUniforms,
  createMeshSessionSeed,
  stepCursorSpring,
} from "./hero-field"

function makeSeededRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (1664525 * s + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

test("createMeshSessionSeed generates bounded randomized shader frames and drift parameters", () => {
  const seedA = createMeshSessionSeed(makeSeededRng(42))
  const seedB = createMeshSessionSeed(makeSeededRng(999))

  assert.ok(seedA.primaryFrame >= 4000 && seedA.primaryFrame <= 90000)
  assert.ok(seedA.secondaryFrame >= 8000 && seedA.secondaryFrame <= 110000)
  assert.ok(seedA.baseRotation >= 0 && seedA.baseRotation <= 360)
  assert.notEqual(seedA.primaryFrame, seedB.primaryFrame)
  assert.notEqual(seedA.phaseA, seedB.phaseA)
})

test("stepCursorSpring converges smoothly toward active cursor and relaxes when inactive", () => {
  let state = {
    ...INITIAL_CURSOR_FIELD,
    targetX: 0.85,
    targetY: 0.2,
    active: true,
  }

  for (let i = 0; i < 45; i++) {
    state = stepCursorSpring(state, 1 / 60)
  }

  assert.ok(state.x > 0.75 && state.x <= 0.85)
  assert.ok(state.y < 0.3 && state.y >= 0.2)
  assert.ok(state.strength > 0.85)

  state = { ...state, active: false }
  for (let i = 0; i < 140; i++) {
    state = stepCursorSpring(state, 1 / 60)
  }
  assert.ok(state.strength < 0.05)
})

test("computeMeshUniforms drifts organically over time and shifts dual layers with cursor parallax", () => {
  const idleT0 = computeMeshUniforms(DEFAULT_MESH_SEED, 0, INITIAL_CURSOR_FIELD)
  const idleT6 = computeMeshUniforms(DEFAULT_MESH_SEED, 6, INITIAL_CURSOR_FIELD)

  assert.notEqual(idleT0.primary.u_offsetX, idleT6.primary.u_offsetX)
  assert.notEqual(idleT0.primary.u_rotation, idleT6.primary.u_rotation)

  const cursorRight = {
    ...INITIAL_CURSOR_FIELD,
    x: 0.95,
    y: 0.2,
    targetX: 0.95,
    targetY: 0.2,
    strength: 1,
    speed: 0.8,
    active: true,
  }
  const active = computeMeshUniforms(DEFAULT_MESH_SEED, 0, cursorRight)

  assert.ok(active.primary.u_offsetX > idleT0.primary.u_offsetX)
  assert.ok(active.secondary.u_offsetX < idleT0.secondary.u_offsetX)
  assert.ok(active.primary.u_swirl > idleT0.primary.u_swirl)
  assert.ok(active.primary.u_offsetX >= -0.42 && active.primary.u_offsetX <= 0.42)
  assert.ok(active.primary.u_distortion >= 0.72 && active.primary.u_distortion <= 1.0)
})
