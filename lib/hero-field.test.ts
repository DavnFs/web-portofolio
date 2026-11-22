import test from "node:test"
import assert from "node:assert/strict"
import {
  INITIAL_CURSOR_FIELD,
  computeCloudPosition,
  createHeroClouds,
  stepCursorSpring,
} from "./hero-field"

function makeSeededRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (1664525 * s + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

test("createHeroClouds generates bounded organic clouds that vary by seed", () => {
  const setA = createHeroClouds(makeSeededRng(42))
  const setB = createHeroClouds(makeSeededRng(999))

  assert.equal(setA.length, 5)
  for (const cloud of setA) {
    assert.ok(cloud.baseX >= 0.08 && cloud.baseX <= 0.92)
    assert.ok(cloud.baseY >= 0.08 && cloud.baseY <= 0.92)
    assert.ok(cloud.radiusRatio > 0.25 && cloud.radiusRatio < 0.7)
    assert.ok(cloud.ampX > 0 && cloud.ampY > 0)
  }

  assert.notEqual(setA[0].phaseX, setB[0].phaseX)
  assert.notEqual(setA[1].freqX1, setB[1].freqX1)
})

test("stepCursorSpring converges smoothly toward active cursor and relaxes when inactive", () => {
  let state = {
    ...INITIAL_CURSOR_FIELD,
    targetX: 0.85,
    targetY: 0.2,
    active: true,
  }

  for (let i = 0; i < 40; i++) {
    state = stepCursorSpring(state, 1 / 60)
  }

  assert.ok(state.x > 0.75 && state.x <= 0.85)
  assert.ok(state.y < 0.3 && state.y >= 0.2)
  assert.ok(state.strength > 0.85)

  // Deactivate pointer and confirm strength decays cleanly
  state = { ...state, active: false }
  for (let i = 0; i < 120; i++) {
    state = stepCursorSpring(state, 1 / 60)
  }
  assert.ok(state.strength < 0.05)
})

test("computeCloudPosition drifts organically over time and responds to cursor pull", () => {
  const [cloud] = createHeroClouds(makeSeededRng(7))

  const idleT0 = computeCloudPosition(cloud, 0, INITIAL_CURSOR_FIELD)
  const idleT4 = computeCloudPosition(cloud, 4, INITIAL_CURSOR_FIELD)
  assert.notEqual(idleT0.x, idleT4.x)
  assert.notEqual(idleT0.y, idleT4.y)

  const cursorRight = {
    ...INITIAL_CURSOR_FIELD,
    x: 0.95,
    y: 0.85,
    targetX: 0.95,
    targetY: 0.85,
    strength: 1,
    active: true,
  }
  const pulled = computeCloudPosition(cloud, 0, cursorRight)
  assert.ok(pulled.x > idleT0.x)
  assert.ok(pulled.y > idleT0.y)
})
