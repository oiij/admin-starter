import type { RouteMeta } from 'vue-router'

export function getRouteMetaHidden(type: 'menu' | 'tab' | 'shortcut' | 'index' | ('menu' | 'tab' | 'shortcut' | 'index')[], meta?: RouteMeta) {
  return typeof meta?.hidden === 'boolean'
    ? meta?.hidden
    : typeof type === 'string'
      ? meta?.hidden?.includes(type)
      : type.every(e => Array.isArray(meta?.hidden) && meta.hidden.includes(e))
}
