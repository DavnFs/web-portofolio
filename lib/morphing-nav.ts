import { CASE_STUDIES } from "@/content/case-studies/types"

export interface MorphingDrawerState {
  open: boolean
  activeSubmenu: "work" | null
}

export type MorphingDrawerAction =
  | { type: "OPEN" }
  | { type: "OPEN_WORK" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SET_SUBMENU"; submenu: "work" | null }
  | { type: "TOGGLE_WORK_SUBMENU" }
  | { type: "ROUTE_CHANGE" }

export const INITIAL_DRAWER_STATE: MorphingDrawerState = {
  open: false,
  activeSubmenu: null,
}

export function morphingDrawerReducer(
  state: MorphingDrawerState,
  action: MorphingDrawerAction
): MorphingDrawerState {
  switch (action.type) {
    case "OPEN":
      return { open: true, activeSubmenu: state.activeSubmenu }
    case "OPEN_WORK":
      return { open: true, activeSubmenu: "work" }
    case "CLOSE":
    case "ROUTE_CHANGE":
      return INITIAL_DRAWER_STATE
    case "TOGGLE":
      return state.open
        ? INITIAL_DRAWER_STATE
        : { open: true, activeSubmenu: null }
    case "SET_SUBMENU":
      return { ...state, activeSubmenu: action.submenu }
    case "TOGGLE_WORK_SUBMENU":
      return {
        ...state,
        activeSubmenu: state.activeSubmenu === "work" ? null : "work",
      }
    default:
      return state
  }
}

export interface MorphingDockState {
  expanded: boolean
  showStudies: boolean
}

export type MorphingDockAction =
  | { type: "TOGGLE" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE_STUDIES" }
  | { type: "ROUTE_CHANGE" }

export const INITIAL_DOCK_STATE: MorphingDockState = {
  expanded: false,
  showStudies: false,
}

export function morphingDockReducer(
  state: MorphingDockState,
  action: MorphingDockAction
): MorphingDockState {
  switch (action.type) {
    case "TOGGLE":
      return state.expanded
        ? INITIAL_DOCK_STATE
        : { expanded: true, showStudies: false }
    case "OPEN":
      return { ...state, expanded: true }
    case "CLOSE":
    case "ROUTE_CHANGE":
      return INITIAL_DOCK_STATE
    case "TOGGLE_STUDIES":
      return { ...state, showStudies: !state.showStudies }
    default:
      return state
  }
}

export function getActiveRouteLabel(pathname: string): string {
  if (!pathname || pathname === "/") return "Home"
  if (pathname === "/about") return "About"
  if (pathname === "/contact") return "Contact"
  if (pathname === "/work") return "Work"

  if (pathname.startsWith("/work/")) {
    const slug = pathname.replace("/work/", "").split("/")[0]
    const match = CASE_STUDIES.find((cs) => cs.slug === slug)
    if (match) {
      return match.title.length > 22 ? `${match.title.slice(0, 20).trim()}…` : match.title
    }
    return "Case Study"
  }

  return "Index"
}
