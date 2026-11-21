import test from "node:test"
import assert from "node:assert/strict"
import {
  INITIAL_DOCK_STATE,
  INITIAL_DRAWER_STATE,
  getActiveRouteLabel,
  morphingDockReducer,
  morphingDrawerReducer,
} from "./morphing-nav"

test("morphingDrawerReducer handles open, split work pane, toggle, and route reset", () => {
  const opened = morphingDrawerReducer(INITIAL_DRAWER_STATE, { type: "OPEN" })
  assert.deepEqual(opened, { open: true, activeSubmenu: null })

  const withWork = morphingDrawerReducer(opened, { type: "TOGGLE_WORK_SUBMENU" })
  assert.deepEqual(withWork, { open: true, activeSubmenu: "work" })

  const toggledOff = morphingDrawerReducer(withWork, { type: "TOGGLE_WORK_SUBMENU" })
  assert.deepEqual(toggledOff, { open: true, activeSubmenu: null })

  const directWork = morphingDrawerReducer(INITIAL_DRAWER_STATE, { type: "OPEN_WORK" })
  assert.deepEqual(directWork, { open: true, activeSubmenu: "work" })

  const reset = morphingDrawerReducer(directWork, { type: "ROUTE_CHANGE" })
  assert.deepEqual(reset, INITIAL_DRAWER_STATE)
})

test("morphingDockReducer handles expand, studies disclosure, and collapse", () => {
  const expanded = morphingDockReducer(INITIAL_DOCK_STATE, { type: "TOGGLE" })
  assert.deepEqual(expanded, { expanded: true, showStudies: false })

  const withStudies = morphingDockReducer(expanded, { type: "TOGGLE_STUDIES" })
  assert.deepEqual(withStudies, { expanded: true, showStudies: true })

  const collapsed = morphingDockReducer(withStudies, { type: "TOGGLE" })
  assert.deepEqual(collapsed, INITIAL_DOCK_STATE)
})

test("getActiveRouteLabel resolves top-level routes and case study slugs", () => {
  assert.equal(getActiveRouteLabel("/"), "Home")
  assert.equal(getActiveRouteLabel("/about"), "About")
  assert.equal(getActiveRouteLabel("/work"), "Work")
  assert.equal(getActiveRouteLabel("/contact"), "Contact")
  assert.equal(getActiveRouteLabel("/work/runa"), "Runa Cycle Tracker")
  assert.equal(getActiveRouteLabel("/work/simpul"), "Simpul Marketplace")
  assert.equal(getActiveRouteLabel("/work/unknown"), "Case Study")
})
