import test from "node:test"
import assert from "node:assert/strict"
import {
  computeScrollProgress,
  getPageTransitionMotion,
  resolveRouteScrollTarget,
} from "./scroll-transition"

test("computeScrollProgress clamps values and guards zero-scroll viewports", () => {
  assert.equal(computeScrollProgress(0, 2000, 900), 0)
  assert.equal(computeScrollProgress(550, 2000, 900), 0.5)
  assert.equal(computeScrollProgress(1100, 2000, 900), 1)
  assert.equal(computeScrollProgress(1500, 2000, 900), 1)
  assert.equal(computeScrollProgress(-50, 2000, 900), 0)
  assert.equal(computeScrollProgress(200, 800, 900), 0)
})

test("resolveRouteScrollTarget resets standard routes to top and preserves hash anchors", () => {
  assert.deepEqual(resolveRouteScrollTarget("/about", ""), { type: "top" })
  assert.deepEqual(resolveRouteScrollTarget("/work", "#"), { type: "top" })
  assert.deepEqual(resolveRouteScrollTarget("/", "#selected-work"), {
    type: "anchor",
    id: "selected-work",
  })
})

test("getPageTransitionMotion renders first paint immediately and glides on client navigation", () => {
  const firstPaint = getPageTransitionMotion(false, false)
  assert.equal(firstPaint.initial.opacity, 1)
  assert.equal(firstPaint.initial.y, 0)

  const clientNav = getPageTransitionMotion(false, true)
  assert.equal(clientNav.initial.opacity, 0)
  assert.equal(clientNav.initial.y, 12)
  assert.equal(clientNav.animate.opacity, 1)
  assert.equal(clientNav.animate.y, 0)

  const reduced = getPageTransitionMotion(true, true)
  assert.equal(reduced.initial.opacity, 1)
  assert.equal(reduced.initial.y, 0)
  assert.equal(reduced.transition.duration, 0.01)
})
